import Web3 from 'web3'
import { Pool, FeeAmount, TickMath, TICK_SPACINGS, nearestUsableTick } from "@uniswap/v3-sdk";
import { Token, WETH9 } from "@uniswap/sdk-core";
import { abi as poolAbi } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
import { abi as swapRouterAbi } from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'
import {abi as factoryAbi} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
const slippageRate = 0.001
const poolAddress = "0x2a62EcF1BfC0F0Bf9fC2A182A4c44F50A42724E9"

const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const feeAmount = FeeAmount.HIGH

export class SwapProvider {
  async initialize() {
    if (window.ethereum && ((window).ethereum.isMetaMask === true)) {
      this.web3 = new Web3(window.ethereum)
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.web3.eth.defaultAccount = accounts[0]
      this.account = accounts[0]
      await this.getPoolImmutables();
    }
  }
  static async create() {
    const obj = new SwapProvider()
    await obj.initialize()
    return obj
  }
  async getPoolImmutables() {
    if (this.web3) {
      let poolContract = new this.web3.eth.Contract(poolAbi, poolAddress);
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
      const [liquidity, slot] = await Promise.all([
        poolContract.methods.liquidity.call().call(),
        poolContract.methods.slot0.call().call(),
      ]);

      // const state = {
      //   liquidity,
      //   sqrtPriceX96: slot[0],
      //   tick: slot[1],
      //   observationIndex: slot[2],
      //   observationCardinality: slot[3],
      //   observationCardinalityNext: slot[4],
      //   feeProtocol: slot[5],
      //   unlocked: slot[6],
      // };
      this.immutables = immutables;
      this.liquidity = liquidity;
      this.slot = slot;
      return [immutables, liquidity, slot];
    }
  }
  async getWETHtoXSPrice(amount) {
    return new Promise((resolve) => {
      console.log('token0',this.immutables.token0.toLowerCase())
      const myToken = new Token(4, this.immutables.token0.toLowerCase(), 8, "XS", "XStarter");
      console.log('token1',this.immutables.token1)
      console.log(WETH9[4])
      const bigIntLiquidity = JSBI.BigInt(this.liquidity);
      const pool = new Pool(
        myToken,
        WETH9[4],
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
      const outputAmount = CurrencyAmount.fromRawAmount(WETH9[4], Web3.utils.toWei(amount).toString());
      pool.getInputAmount(outputAmount).then(([inputAmount]) => {
        pool.getOutputAmount(outputAmount).then(([newOutputAmount]) => {
          // Slippage parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate))
          resolve([parseFloat(inputAmount.toSignificant(18) * (1 + slippageRate)), parseFloat(newOutputAmount.toSignificant(18) * (1 - slippageRate))])
        })
      })
    });
  }
  async sendSellTransaction(inTokens, outTokens) {
    //const [ buyPrice, sellPrice ] = await this.getWETHtoXSPrice(inTokens)
    
    //const amountOutMin = new Web3.utils.BN(parseFloat(outTokens) * Math.pow(10, 8))

    const params = {
      tokenIn: WETH9[4].address,
      tokenOut: this.immutables.token0.toLowerCase(),
      fee: feeAmount,
      recipient: this.account,
      deadline: Math.floor(Date.now() / 1000) + 600 * 30,
      amountIn: Web3.utils.toWei('0.001').toString(),
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    }
    //const transaction = await SwapRouterContract.connect(provider.getSigner()).exactInputSingle(params)
    const swapRouterContract =  new this.web3.eth.Contract(swapRouterAbi, swapRouterAddress.toLowerCase());
    console.log(swapRouterContract);
    
    const transactionResult = await swapRouterContract.methods.exactInputSingle(params).send({from: this.account});
    return transactionResult;
  }
  async sendBuyTransaction(){
    const buyAmount = "900" //колво токенов которое купит юзер
    const [buyPrice, sellPrice]= await this.getTokenPrice (buyAmount)
    console.log('Buy price:',buyPrice,' ',Web3.utils.toWei(buyPrice.toString()))
    console.log('token 0 buy',this.immutables.token0.toLowerCase())
    console.log('deadline',)
    const params = {
          tokenIn:  WETH9[4].address.toLowerCase(), 
          tokenOut: this.immutables.token0.toLowerCase(), 
          fee: feeAmount ,
          recipient: this.account,
          deadline: Math.floor(Date.now() / 1000) + 60 * 30,
          amountOut: buyAmount.toString(),
          amountInMaximum:Web3.utils.toWei(buyPrice.toString()).toString(),
          sqrtPriceLimitX96: 0
        }
    const swapRouterContract =  new this.web3.eth.Contract(swapRouterAbi, swapRouterAddress.toLowerCase());
    console.log(swapRouterContract);
    const transactionResult = await swapRouterContract.methods.exactOutputSingle(params).send({from: this.account});
    return transactionResult
  }
  async getTokenPrice(amount) {
    return new Promise((resolve) => {
      const myToken = new Token(4, this.immutables.token0.toLowerCase(), 8, "XS", "XStarter");
      console.log('token 1', this.immutables.token1)
      console.log(WETH9[4])
      const bigIntLiquidity = JSBI.BigInt(this.liquidity);
      const pool = new Pool(
        myToken,
        WETH9[4],
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
      const tokenAmount = new Web3.utils.BN(parseFloat(amount) * Math.pow(10, 8))
      const outputAmount = CurrencyAmount.fromRawAmount(myToken, tokenAmount.toString());
      pool.getInputAmount(outputAmount).then(([inputAmount]) => {
        pool.getOutputAmount(outputAmount).then(([newOutputAmount]) => {
          // Slippage parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate))
          resolve([parseFloat(inputAmount.toSignificant(8) * (1 + slippageRate)), parseFloat(newOutputAmount.toSignificant(8) * (1 - slippageRate))])
        })
      })
    });
  }
}
