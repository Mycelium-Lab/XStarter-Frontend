import React from 'react';
import Web3 from 'web3';
import settingsImg from '../img/settings.svg';
import { useSelector } from 'react-redux';
import { SwapProvider } from '../swap/swap';
import { useState, useEffect } from 'react';


function TradePage(props) {
  const XSTOKEN = '0x7c6862a49fBc90b195F91F7147BB4726dCa4E028';
  const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
  const MAXUINT = '1157920892373161954235709850086879078532699846656405640394575840079131296';
  const [outTokenAmount, setOutTokenAmount] = useState(0);
  const [inTokenAmount, setInTokenAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [token0, setToken0] = useState('');
  const [token0Symbol, setToken0Symbol] = useState('WETH');
  const [token1, setToken1] = useState('');
  const [token1Symbol, setToken1Symbol] = useState('XS');
  const [swapProvider, setSwapProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    if (!swapProvider) {
      setParams()
    }

  }, [])
  const setParams = async () => {
    const swapProvider = await SwapProvider.create();
    setSwapProvider(swapProvider);
    const web3 = new Web3(window.ethereum)
    setWeb3(web3);
  }
  const changeOutputPrice = async (price) => {
    if (parseFloat(price.target.value) && swapProvider) {
      const sellPrice = token0 === WETH ? await swapProvider.getWETHToXSPrice(price.target.value) : await swapProvider.getXSToWETHPrice(price.target.value);
      setInTokenAmount(price.target.value);
      setOutTokenAmount(sellPrice);
    }
  }
  const onKeyDown = (evt) =>{
    if(evt.keyCode === 8 && inTokenAmount.toString().length === 1){
      setOutTokenAmount('0');
    }
  }
  const swapTokens = async ()=>{
    let amountToApprove = web3.utils.toWei(inTokenAmount)
    // let tx = token0 === WETH ? await swapProvider.approve(MAXUINT, WETH) : await swapProvider.approve(MAXUINT, XSTOKEN)
    let tx = token0 === WETH ? await swapProvider.buyXSForWETH(inTokenAmount.toString()) : await swapProvider.buyWETHForXS(inTokenAmount.toString())

  }
  const changeUpperDropdown = (token) =>{
    if(token.target.value === WETH){
      setToken0(WETH);
      setToken1(XSTOKEN)
      setToken0Symbol('WETH')
      setToken1Symbol('XS')
    }
    else if(token.target.value == XSTOKEN){
      setToken0(XSTOKEN)
      setToken1(WETH)
      setToken0Symbol('XS')
      setToken1Symbol('WETH')
    }
  }
  const changeLowerDropdown = (token) =>{
    if(token.target.value === WETH){
      setToken1(WETH);
      setToken0(XSTOKEN)
      setToken1Symbol('WETH')
      setToken0Symbol('XS')
    }
    else{
      setToken1(XSTOKEN)
      setToken0(WETH)
      setToken1Symbol('XS')
      setToken0Symbol('WETH')
    }
  }
  const { handleChange } = props;
  return (
    <div className="xs-body-trade">
      <div className="xs-block">
        <div className="xs-trade-change">
          <div className="xs-trade-change-top">
            <span>Обменять</span>
            <button><img src={settingsImg} alt="" /></button>
          </div>
          <div className="xs-trade-change-input">
            <select value={token0} onChange={changeUpperDropdown}>
              <option defaultValue value={0}>Выберите токен</option>
              <option value={WETH}>WETH</option>
              <option value={XSTOKEN}>XS</option>
            </select>
            <input onChange={async (e) => { await changeOutputPrice(e); }} type="tel" placeholder={0.0} onKeyDown={onKeyDown}/>
          </div>
          <div className="xs-trade-change-input xs-trade-change-input-xs">
            <select value={token1} onChange={changeLowerDropdown}>
              <option defaultValue value={XSTOKEN}>XS</option>
              <option value={WETH}>WETH</option>
            </select>
            <input type="tel" placeholder={0.0} value={outTokenAmount}/>
          </div>
          <button onClick = {swapTokens} className="btn xs-trade-change-btn">BUY</button>
        </div>
      </div>
    </div>
  );
}

export default TradePage;