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
  console.log('xs result',result)
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
  async isEnoughAllowance(amount, tokenAddress){
    const tokenContract = new this.web3.eth.Contract(erco20Abi, tokenAddress);
    const allowance = await tokenContract.methods.allowance(this.account, process.env.REACT_APP_SWAPROUTER_ADDRESS).call();
    return allowance >= amount;
  }
  async approve(type,amount){
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
    console.log(tokenAmount, tokenAddress);
    if (!(await this.isEnoughAllowance(tokenAmount, tokenAddress))) {
      return tokenContract.methods.approve(process.env.REACT_APP_SWAPROUTER_ADDRESS, tokenAmount).send({from:this.account});
    }
  }
  // Купить XS за WETH
  async buyXSForWETH(inTokens) {
    const weiInTokensAmount = Web3.utils.toWei(inTokens).toString();
    if (await this.isEnoughAllowance(weiInTokensAmount, WETH9[process.env.REACT_APP_CHAIN_ID].address)) {
      const sellPrice = await this.getWETHToXSPrice(inTokens);
      const amountOutMin = new Web3.utils.BN(parseFloat(sellPrice) * Math.pow(10, 8))
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
      const transactionResult = await swapRouterContract.methods.exactInputSingle(params).send({ from: this.account, value: weiInTokensAmount });
      return transactionResult;
    } 
  }
  // Купить WETH за XS
  async buyWETHForXS(inTokens) {
    const inTokenAmount = new Web3.utils.BN(parseFloat(inTokens.toString()) * Math.pow(10, 8));
    if (await this.isEnoughAllowance(inTokenAmount, this.immutables.token0)) {
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
      const transactionResult = await swapRouterContract.methods.exactInputSingle(params).send({ from: this.account });
      return transactionResult;
    }
  }
  // Цена WETH -> XS
  async getWETHToXSPrice(amount){
    const outputAmount = CurrencyAmount.fromRawAmount(WETH9[process.env.REACT_APP_CHAIN_ID], Web3.utils.toWei(amount).toString());
    const [newOutputAmount]= await this.pool.getOutputAmount(outputAmount);
    return parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate));
  }
  // Цена XS -> WETH
  async getXSToWETHPrice(amount){
    const myToken = new Token(4, this.immutables.token0, 8, "XS", "XStarter");
    const tokenAmount = new Web3.utils.BN(parseFloat(amount) * Math.pow(10, 8))
    const outputAmount = CurrencyAmount.fromRawAmount(myToken, tokenAmount.toString());
    const [newOutputAmount]= await this.pool.getOutputAmount(outputAmount);
    return parseFloat(newOutputAmount.toSignificant(18) * (1 - slippageRate));
  }
}