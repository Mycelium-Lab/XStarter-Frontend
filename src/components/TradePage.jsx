import React from 'react';
import Web3 from 'web3';
import settingsImg from '../img/settings.svg';
import { useSelector } from 'react-redux';
import { SwapProvider } from '../swap/swap';
import { useState, useEffect } from 'react';


function TradePage(props) {
  const [outTokenAmount, setOutTokenAmount] = useState(0);
  const [inTokenAmount, setInTokenAmount] = useState(0);
  const [swapProvider, setSwapProvider] = useState(null);
  useEffect(() => {
    if (!swapProvider) {
      setParams()
    }

  }, [])
  const setParams = async () => {
    const swapProvider = await SwapProvider.create();
    setSwapProvider(swapProvider);
  }
  const changeOutputPrice = async (price) => {
    if (parseFloat(price.target.value) && swapProvider) {
      const [buyPrice, sellPrice] = await swapProvider.getWETHtoXSPrice(price.target.value);
      const [buyPricex, sellPricex] = await swapProvider.getTokenPrice(price.target.value);
      console.log(buyPricex)
      console.log(sellPricex)
      setInTokenAmount(price.target.value)
      setOutTokenAmount(sellPrice);
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
            <select>
              <option defaultValue value={0}>Выберите токен</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <input onChange={async (e) => { await changeOutputPrice(e); }} type="tel" placeholder={0.0} />
          </div>
          <div className="xs-trade-change-input xs-trade-change-input-xs">
            <select>
              <option defaultValue value={0}>XS</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <input type="tel" placeholder={0.0} value={outTokenAmount} />
          </div>
          <button onClick = {async () => {await swapProvider.sendSellTransaction(inTokenAmount, outTokenAmount)}} className="btn xs-trade-change-btn">BUY</button>
        </div>
      </div>
    </div>
  );
}

export default TradePage;