import Web3 from 'web3'
import { Pool, FeeAmount, TickMath, TICK_SPACINGS, nearestUsableTick , Trade, Route} from "@uniswap/v3-sdk";
import { Token, WETH9 } from "@uniswap/sdk-core";
import { abi as poolAbi } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
import { abi as swapRouterAbi } from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'
import { abi as erco20Abi} from '@uniswap/v3-core/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json'
import { CurrencyAmount, TradeType, Percent} from '@uniswap/sdk-core';
import { Interface } from '@ethersproject/abi'

import JSBI from 'jsbi';
import { toBaseUnit } from '../utils/toBaseUnit';
const slippageRate = 0.001
const slippageTolerance = new Percent(JSBI.BigInt(1), JSBI.BigInt(1000))

const feeAmount = FeeAmount.MEDIUM

export class SwapProvider {
  
  async initialize(provider, address) {
    if (provider && address) {
      this.web3 = new Web3(provider)
      this.web3.eth.defaultAccount = address
      this.account = address
      this.immutables = await this.getPoolImmutables();
      [this.liquidity, this.slot] = await this.getPoolState();
      this.pool = await this.setupPool();
      this.INTERFACE = new Interface(swapRouterAbi)
    }
  }
  static async create(provider, address) {
    const obj = new SwapProvider()
    await obj.initialize(provider, address)
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
  setWallet(wallet)
  {
    this.account = wallet;
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
    const weiInTokensAmount = type === 'WETH' ? Web3.utils.toWei(amount).toString() : toBaseUnit(amount, 8, Web3.utils.BN).toString();
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
        tokenAmount = toBaseUnit(amount, 8, Web3.utils.BN).toString()
        tokenAddress = this.immutables.token0;
        tokenContract = new this.web3.eth.Contract(erco20Abi, tokenAddress);
      }
      if (!(await this.isEnoughAllowance(amount, tokenAddress, type))) 
      {
        return new Promise((resolve, reject) => {
          tokenContract.methods.approve(process.env.REACT_APP_SWAPROUTER_ADDRESS, tokenAmount).send({from:this.account})
          .on('transactionHash', function(hash) {
          resolve(hash);
          });
        })
      } 
  }
  async getTokenBalance(token, type)
  {
    if(type === 'WETH')
    {
      var balance = await this.web3.eth.getBalance(this.account);
      balance = this.web3.utils.fromWei(balance);
    }
    else
    {
      const tokenContract = new this.web3.eth.Contract(erco20Abi, token);
      var balance = await tokenContract.methods.balanceOf(this.account).call({from: this.account});
      balance = parseFloat(balance) / 10**8;
    }
    return balance;
  }
  // Купить XS за WETH
  async buyXSForWETH(inTokens) {
    const weiInTokensAmount = this.web3.utils.toWei(inTokens).toString();
    if (await this.isEnoughAllowance(inTokens, WETH9[process.env.REACT_APP_CHAIN_ID].address, 'WETH')) 
    {
      const sellPrice = await this.getWETHToXSPrice(inTokens);
      const amountOutMin = toBaseUnit(sellPrice, 8, Web3.utils.BN).toString()
      const params = {
        tokenIn: WETH9[process.env.REACT_APP_CHAIN_ID].address,
        tokenOut: this.immutables.token0,
        fee: feeAmount,
        recipient: this.account,
        deadline: Math.floor(Date.now() / 1000) + 60 * 30,
        amountIn: weiInTokensAmount,
        amountOutMinimum: amountOutMin,
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
    const xsTokenAmount = toBaseUnit(outTokens, 8, Web3.utils.BN).toString()//toXS(outTokens);
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
      const amountInMax = toBaseUnit(inTokensAmount, 8, Web3.utils.BN)//toXS(inTokensAmount);
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
    const inTokenAmount = toBaseUnit(inTokens, 8, Web3.utils.BN)//new Web3.utils.BN(toXS(inTokens));
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
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const route = new Route([this.pool], WETH9[process.env.REACT_APP_CHAIN_ID], myToken);
    const trade = await Trade.fromRoute(
      route,
      CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(amount)),
      TradeType.EXACT_INPUT
    )
    return (trade.minimumAmountOut(slippageTolerance).toSignificant(8));
    // const inputAmount = CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(amount).toString());
    // const [newOutputAmount]= await this.pool.getOutputAmount(inputAmount);
    // return parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate)).toFixed(8);
  }
  // Цена WETH <- XS
  async getWETHfromXSPrice(desiredWethAmount)
  {
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const route = new Route([this.pool], myToken, WETH9[process.env.REACT_APP_CHAIN_ID]);
    const trade = await Trade.fromRoute(
      route,
      CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(desiredWethAmount)),
      TradeType.EXACT_OUTPUT
    )
    return (trade.maximumAmountIn(slippageTolerance).toSignificant(8));
  }
  // Цена XS -> WETH
  async getXSToWETHPrice(amount){
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const route = new Route([this.pool], myToken, WETH9[process.env.REACT_APP_CHAIN_ID]);
    const trade = await Trade.fromRoute(
      route,
      CurrencyAmount.fromRawAmount(myToken,toBaseUnit(amount, 8, Web3.utils.BN).toString()),// toXS(amount)),
      TradeType.EXACT_INPUT
    )
    return (trade.minimumAmountOut(slippageTolerance).toSignificant(18));
  }
  // Цена XS <- WETH
  async getXSfromWETHPrice(desiredXsAmount)
  {
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const route = new Route([this.pool], WETH9[process.env.REACT_APP_CHAIN_ID], myToken);
    const trade = await Trade.fromRoute(
      route,
      CurrencyAmount.fromRawAmount(myToken, toBaseUnit(desiredXsAmount, 8, Web3.utils.BN).toString()),//toXS(desiredXsAmount)),
      TradeType.EXACT_OUTPUT
    )
    return (trade.maximumAmountIn(slippageTolerance).toSignificant(18));
  }
}