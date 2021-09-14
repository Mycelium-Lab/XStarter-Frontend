import Web3 from 'web3'
import { Pool, FeeAmount, TickMath, TICK_SPACINGS, nearestUsableTick } from "@uniswap/v3-sdk";
import { Token, WETH9 } from "@uniswap/sdk-core";
import { abi as poolAbi } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
import { abi as swapRouterAbi } from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'
import { abi as erco20Abi} from '@uniswap/v3-core/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json'
import { CurrencyAmount } from '@uniswap/sdk-core';
import { Interface } from '@ethersproject/abi'

import JSBI from 'jsbi';
const slippageRate = 0.001
const feeAmount = FeeAmount.MEDIUM

function toXS(val){
  var str = val.split('.')
  let result = str[0] + (str[1]!==undefined ? str[1]: "") + "0".repeat(8-(str[1]!==undefined ? str[1].length : 0))
  return result;
}

export class SwapProvider {
  
  async initialize() {
    if (window.ethereum && ((window).ethereum.isMetaMask === true)) {
      this.web3 = new Web3(window.ethereum)
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.web3.eth.defaultAccount = accounts[0]
      this.account = accounts[0]
      this.immutables = await this.getPoolImmutables();
      [this.liquidity, this.slot] = await this.getPoolState();
      this.pool = await this.setupPool();
      this.INTERFACE = new Interface(swapRouterAbi)
    }
  }
  static async create() {
    const obj = new SwapProvider()
    await obj.initialize()
    return obj
  }
  async getPoolImmutables() {
    if (this.web3) {
      let poolContract = new this.web3.eth.Contract(poolAbi, process.env.REACT_APP_POOL_ADDRESS);
      const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
        await Promise.all([
          poolContract.methods.factory.call().call(),
          poolContract.methods.token0.call().call(),
          poolContract.methods.token1.call().call(),
          poolContract.methods.fee.call().call(),
          poolContract.methods.tickSpacing.call().call(),
          poolContract.methods.maxLiquidityPerTick.call().call(),
        ]);
      const immutables = {
        factory,
        token0,
        token1,
        fee,
        tickSpacing,
        maxLiquidityPerTick,
      };
      return immutables;
    }
  }
  async getPoolState() {
    if (this.web3) {
      let poolContract = new this.web3.eth.Contract(poolAbi, process.env.REACT_APP_POOL_ADDRESS);
      const [liquidity, slot] = await Promise.all([
        poolContract.methods.liquidity.call().call(),
        poolContract.methods.slot0.call().call(),
      ]);
      return [liquidity, slot]
    }
  }
  async setupPool() {
    if(this.immutables && this.slot && this.liquidity){
      const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
      const bigIntLiquidity = JSBI.BigInt(this.liquidity);
      const pool = new Pool(
        myToken,
        WETH9[process.env.REACT_APP_CHAIN_ID],
        feeAmount,
        JSBI.BigInt(this.slot.sqrtPriceX96.toString()),
        bigIntLiquidity,
        Number(this.slot.tick),
        [
          {
            index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
            liquidityNet: bigIntLiquidity,
            liquidityGross: bigIntLiquidity
          },
          {
            index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]),
            liquidityNet: JSBI.multiply(bigIntLiquidity, JSBI.BigInt(-1)),
            liquidityGross: bigIntLiquidity
          }
        ]
      )
      return pool
    }
  }
  async isEnoughAllowance(amount, tokenAddress, type){
    const weiInTokensAmount = type === 'WETH' ? Web3.utils.toWei(amount).toString() : toXS(amount);

    const tokenContract = new this.web3.eth.Contract(erco20Abi, tokenAddress);
    const allowance = await tokenContract.methods.allowance(this.account, process.env.REACT_APP_SWAPROUTER_ADDRESS).call();
    const num1 = this.web3.utils.toBN(allowance);
    const num2 = this.web3.utils.toBN(weiInTokensAmount);
    return num1.gte(num2);
  }
  async approve(type, amount){ 
      let tokenAmount;
      let tokenContract;
      let tokenAddress;
      if(type === 'WETH'){
        tokenAmount = Web3.utils.toWei(amount).toString()
        tokenAddress = WETH9[process.env.REACT_APP_CHAIN_ID].address
        tokenContract = new this.web3.eth.Contract(erco20Abi, tokenAddress);
      }else if (type === 'XST') {
        tokenAmount = toXS(amount);
        tokenAddress = this.immutables.token0
        tokenContract = new this.web3.eth.Contract(erco20Abi, tokenAddress);
      }
      if (!(await this.isEnoughAllowance(amount, tokenAddress))) 
      {
        return new Promise((resolve, reject) => {
          tokenContract.methods.approve(process.env.REACT_APP_SWAPROUTER_ADDRESS, tokenAmount).send({from:this.account})
          .on('transactionHash', function(hash) {
          resolve(hash);
          });
        })
      } 
  }
  // Купить XS за WETH
    async buyXSForWETH(inTokens) {
    const weiInTokensAmount = this.web3.utils.toWei(inTokens).toString();
    if (await this.isEnoughAllowance(inTokens, WETH9[process.env.REACT_APP_CHAIN_ID].address, 'WETH')) 
    {
      const sellPrice = await this.getWETHToXSPrice(inTokens);
      const amountOutMin = new Web3.utils.BN(toXS(sellPrice))
      const params = {
        tokenIn: WETH9[process.env.REACT_APP_CHAIN_ID].address,
        tokenOut: this.immutables.token0,
        fee: feeAmount,
        recipient: this.account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 30,
        amountIn: weiInTokensAmount,
        amountOutMinimum: amountOutMin.toString(),
        sqrtPriceLimitX96: 0
      }
      const swapRouterContract = new this.web3.eth.Contract(swapRouterAbi, process.env.REACT_APP_SWAPROUTER_ADDRESS);
      return new Promise((resolve, reject) => {
        swapRouterContract.methods.exactInputSingle(params).send({ from: this.account, value: weiInTokensAmount })
        .on('transactionHash', function(hash){
          resolve(hash)
        });
      });
    } 
  }
  // Купить желаемое количество XST за WETH
  async buyXSforWETHoutput(outTokens)
  {
    const xsTokenAmount = toXS(outTokens);
    const inTokensAmount = await this.getXSfromWETHPrice(outTokens)
    if(await this.isEnoughAllowance(inTokensAmount, WETH9[process.env.REACT_APP_CHAIN_ID].address, 'WETH'))
    {
      const amountInMax = Web3.utils.toWei(inTokensAmount);
      const params = {
        tokenIn: WETH9[process.env.REACT_APP_CHAIN_ID].address,
        tokenOut: this.immutables.token0, 
        fee: feeAmount,
        recipient: this.account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 30,
        amountOut: xsTokenAmount,
        amountInMaximum: amountInMax,
        sqrtPriceLimitX96: 0
      }
      const swapRouterContract = new this.web3.eth.Contract(swapRouterAbi, process.env.REACT_APP_SWAPROUTER_ADDRESS);
      return new Promise((resolve, reject) => {
        swapRouterContract.methods.exactOutputSingle(params).send({ from: this.account, value: amountInMax})
        .on('transactionHash', function(hash){
          resolve(hash)
        });
      });
    }
  }

  // Купить желаемое количество WETH за XS
  async buyWETHforXSoutput(outputWeth)
  {
    const wethAmount = Web3.utils.toWei(outputWeth);
    const inTokensAmount = await this.getWETHfromXSPrice(outputWeth)
    if(await this.isEnoughAllowance(inTokensAmount, this.immutables.token0, 'XST'))
    {
      const amountInMax = toXS(inTokensAmount);
      const params = {
        tokenIn: this.immutables.token0,
        tokenOut: WETH9[process.env.REACT_APP_CHAIN_ID].address, 
        fee: feeAmount,
        recipient: this.account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 30,
        amountOut: wethAmount,
        amountInMaximum: amountInMax,
        sqrtPriceLimitX96: 0
      }
      const swapRouterContract = new this.web3.eth.Contract(swapRouterAbi, process.env.REACT_APP_SWAPROUTER_ADDRESS);
      return new Promise((resolve, reject) => {
        swapRouterContract.methods.exactOutputSingle(params).send({from: this.account})
        .on('transactionHash', function(hash){
          resolve(hash)
        });
      });
    }
  }
  // Купить WETH за XS
  async buyWETHForXS(inTokens) {
    const inTokenAmount = new Web3.utils.BN(toXS(inTokens));
    if (await this.isEnoughAllowance(inTokens, this.immutables.token0, 'XST')) {
      const sellPrice = await this.getXSToWETHPrice(inTokens);
      const amountOutMin = Web3.utils.toWei(sellPrice.toString()).toString()
      const params = {
        tokenIn: this.immutables.token0,
        tokenOut: WETH9[process.env.REACT_APP_CHAIN_ID].address,
        fee: feeAmount,
        recipient: this.account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 30,
        amountIn: inTokenAmount.toString(),
        amountOutMinimum: amountOutMin,
        sqrtPriceLimitX96: 0
      }
      const swapRouterContract = new this.web3.eth.Contract(swapRouterAbi, process.env.REACT_APP_SWAPROUTER_ADDRESS);
      return new Promise((resolve, reject) => {
        swapRouterContract.methods.exactInputSingle(params).send({ from: this.account })
        .on('transactionHash', function(hash){
          resolve(hash)
        });
      });
    }
  }
  async sleep (milliseconds)
  {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  } 
  async waitTransaction (txnHash)
  {
    const expectedBlockTime = 1000; 
    let transactionReceipt = null
      while (transactionReceipt == null)
      {
        transactionReceipt = await this.web3.eth.getTransactionReceipt(txnHash);
        await this.sleep(expectedBlockTime)
      }
      return transactionReceipt
  }
  // Цена WETH -> XS
  async getWETHToXSPrice(amount){
    const inputAmount = CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(amount).toString());
    const [newOutputAmount]= await this.pool.getOutputAmount(inputAmount);
    return parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate)).toFixed(8);
  }
  // Цена WETH <- XS
  async getWETHfromXSPrice(desiredWethAmount)
  {
    const outputAmount = CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(desiredWethAmount).toString());
    const [inputXSAmount] = await this.pool.getInputAmount(outputAmount);
    return parseFloat(inputXSAmount.toSignificant(8) * (1 + slippageRate)).toFixed(8);
  }
  // Цена XS -> WETH
  async getXSToWETHPrice(amount){
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const tokenAmount = new Web3.utils.BN(toXS(amount))
    const inTokenAmount = CurrencyAmount.fromRawAmount(myToken, tokenAmount.toString());
    const [newOutputAmount]= await this.pool.getOutputAmount(inTokenAmount);
    return parseFloat(newOutputAmount.toSignificant(18) * (1 - slippageRate)).toFixed(18);
  }

  // Цена XS <- WETH
  async getXSfromWETHPrice(desiredXsAmount)
  {
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const tokenAmount = new Web3.utils.BN(toXS(desiredXsAmount))
    const outTokenAmount = CurrencyAmount.fromRawAmount(myToken, tokenAmount.toString());
    const [InputAmount]= await this.pool.getInputAmount(outTokenAmount);
    return parseFloat(InputAmount.toSignificant(18) * (1 + slippageRate)).toFixed(18);
  }
}