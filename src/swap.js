import { ethers } from 'ethers'
import JSBI from 'jsbi'
import { Token, CurrencyAmount, WETH9 } from '@uniswap/sdk-core'
import {
    ChainId as CI,
} from '@uniswap/sdk'
import { nearestUsableTick, TICK_SPACINGS, TickMath, FeeAmount, Pool } from '@uniswap/v3-sdk'
import {
  abi as UniswapV3FactoryABI,
} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'

import {
  abi as UniswapV3PoolABI,
} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';

import {
  abi as SwapRouterABI,
} from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const UniswapV3FactoryAddress= '0x1F98431c8aD98523631AE4a59f267346ea31F984'
const SwapRouterAddress= '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const tokenAddress = "0x7c6862a49fBc90b195F91F7147BB4726dCa4E028"

const UniswapV3PoolAddress = "0x2a62EcF1BfC0F0Bf9fC2A182A4c44F50A42724E9";

const feeAmount = FeeAmount.HIGH
const slippageRate = 0.001
const chainId = 4;
const tokenSymbol = 'XST'
//const WETH = "0xc778417e063141139fce010982780140aa0cd5ab"

const SwapRouterContract = new ethers.Contract(SwapRouterAddress, SwapRouterABI, provider)
const UniswapV3FactoryContract = new ethers.Contract(UniswapV3FactoryAddress, UniswapV3FactoryABI, provider)

var UniswapV3PoolContract;
console.log('chain id: ', CI);

var currentAccount;
async function start() {
  //UniswapV3PoolAddress =await UniswapV3FactoryContract.getPool(tokenAddress, WETH9[chainId], feeAmount)//находим адресс пула по токенам и коммиссии
  //console.log(UniswapV3PoolAddress)
  UniswapV3PoolContract = new ethers.Contract(UniswapV3PoolAddress, UniswapV3PoolABI, provider)
  console.log(UniswapV3PoolContract)
}

//Отправка транзакции
async function sendBuyTransaction(){
    start();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    currentAccount =  await signer.getAddress();

    const buyAmount = 1 //колво токенов которое купит юзер
    const [buyPrice, sellPrice]= await getTokenPrice (buyAmount)
    console.log(buyPrice)
    const params = {
          tokenIn:  WETH9[chainId], 
          tokenOut: tokenAddress, 
          fee: feeAmount ,
          recipient: currentAccount,
          deadline: Math.floor(Date.now() / 1000) + 60 * 30,
          amountOut: buyAmount.toString(),
          amountInMaximum: ethers.utils.parseUnits(buyPrice.toString()),
          sqrtPriceLimitX96: 0
        }
    const transaction = await SwapRouterContract.connect(provider.getSigner()).exactOutputSingle(params)
    return transaction;
}

//Отправка транзакции
async function sendSellTransaction(){
  const sellAmount = 1 //колво токенов которое продаст юзер
  const [buyPrice, sellPrice] = await getTokenPrice (sellAmount)
  console.log(buyPrice)
  const params = {
    tokenIn: tokenAddress,
    tokenOut: WETH9[chainId],
    fee: feeAmount,
    recipient: currentAccount,
    deadline: Math.floor(Date.now() / 1000) + 60 * 30,
    amountIn: sellAmount.toString(),
    amountOutMinimum: ethers.utils.parseUnits(sellPrice.toString()),
    sqrtPriceLimitX96: 0
  }
  const transaction = await SwapRouterContract.connect(provider.getSigner()).exactInputSingle(params)
}

async function getTokenPrice(amount) {
  const slot0 = await UniswapV3PoolContract.slot0()
  const liquidity = await UniswapV3PoolContract.liquidity()
  let [buyPrice, sellPrice] = await getPriceSDK(JSBI.BigInt(slot0.sqrtPriceX96.toString()), JSBI.BigInt(liquidity), slot0.tick, amount)
  console.log(buyPrice)
  return [buyPrice, sellPrice];
}

async function getPriceSDK (sqrtRatioX96, liquidity, currentTick, amount) {
     return new Promise((resolve) => {
       const myToken = new Token(chainId, tokenAddress, 8, tokenSymbol, 'XST')
       const pool = new Pool(
         myToken,
         WETH9[chainId],
         feeAmount,
         sqrtRatioX96,
         liquidity,
         currentTick,
         [
           {
             index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
             liquidityNet: liquidity,
             liquidityGross: liquidity
           },
           {
             index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]),
             liquidityNet: JSBI.multiply(liquidity, JSBI.BigInt(-1)),
             liquidityGross: liquidity
           }
         ]
       )

       const outputAmount = CurrencyAmount.fromRawAmount(myToken, ethers.utils.parseEther(parseFloat(amount).toString()))
       pool.getInputAmount(outputAmount).then(([inputAmount]) => {
         pool.getOutputAmount(outputAmount).then(([newOutputAmount]) => {
           resolve([parseFloat(inputAmount.toSignificant(18) * (1 + slippageRate)), parseFloat(newOutputAmount.toSignificant(18) * (1 - slippageRate))])
         })
       })
     })
   }


export {sendBuyTransaction};