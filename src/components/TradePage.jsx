import React from 'react';
import Web3 from 'web3';
import settingsImg from '../img/settings.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SwapProvider } from '../swap/swap';
import { useState, useEffect } from 'react';
import {setTransactionInfo} from '../redux/transaction-info/actions';

function TradePage(props) {
  const XSTOKEN = '0x7c6862a49fBc90b195F91F7147BB4726dCa4E028';
  const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
  const [outTokenAmount, setOutTokenAmount] = useState('');
  const [inTokenAmount, setInTokenAmount] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [token0, setToken0] = useState(WETH);
  const [token0Balance, setToken0Balance] = useState(0);
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(true);
  const [token0Symbol, setToken0Symbol] = useState('WETH');
  const [token1, setToken1] = useState(XSTOKEN);
  const [token1Balance, setToken1Balance] = useState(0);
  const [token1Symbol, setToken1Symbol] = useState('XS');
  const [baseToken, setBaseToken] = useState('WETH');
  const [swapProvider, setSwapProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isExactInput, setIsExactInput] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!swapProvider) {
      setParams()
    }
  }, [])
  const setParams = async () => {
    const swapProvider = await SwapProvider.create();
    setSwapProvider(swapProvider);
    const web3 = new Web3(window.ethereum);
    const token0Balance = await swapProvider.getTokenBalance(token0, token0Symbol);
    const token1Balance = await swapProvider.getTokenBalance(token1, token1Symbol);
    setToken0Balance(token0Balance);
    setToken1Balance(token1Balance);
    setWeb3(web3);
  }
  const setUserBalance = async (token0, token0Symbol, token1, token1Symbol) =>{ 
    const token0Balance = await swapProvider.getTokenBalance(token0, token0Symbol);
    const token1Balance = await swapProvider.getTokenBalance(token1, token1Symbol);
    setToken0Balance(token0Balance);
    setToken1Balance(token1Balance);
  }
  const setMaxAmountUpper = () =>{
    setInTokenAmount(token0Balance);
    const price = {target: {
      value: token0Balance
    }}
    changeOutputPrice(price);
    token0 === WETH ? setBaseToken('WETH') : setBaseToken('XST');
  }

  const setMaxAmountLower = () =>{
    setOutTokenAmount(token1Balance);
    const price = {target:{
      value: token1Balance
    }}
    changeInputPrice(price);
    token1 === WETH ? setBaseToken('WETH') : setBaseToken('XST');
  }

  const changeOutputPrice = async (price) => {
    if((!/^[0-9.]*$/.test(price.target.value.toString())))
    {
      // Do nothing
    }
    else if (parseFloat(price.target.value) && swapProvider) {
      setIsExactInput(true);
      token0 === WETH ? setBaseToken('WETH') : setBaseToken('XST')
      setInTokenAmount(price.target.value)  
      const sellPrice = token0 === WETH ? await swapProvider.getWETHToXSPrice(price.target.value.toString()) : await swapProvider.getXSToWETHPrice(price.target.value.toString());
      setOutTokenAmount(sellPrice);
      const isInsufficientBalance = parseFloat(token0Balance) > parseFloat(price.target.value) ? false : true;
      setIsInsufficientBalance(isInsufficientBalance);
      if(token0 !== '')
      {
        const isApproved = await swapProvider.isEnoughAllowance(price.target.value.toString(), token0, token0Symbol);
        setIsApproved(isApproved);
      }
    }
    else
    {
      setInTokenAmount(price.target.value)
      setOutTokenAmount('0');
    }
  }

  const changeInputPrice = async (price) =>{
    if((!/^[0-9.]*$/.test(price.target.value.toString())))
    {
      // Do nothing
    }
    else if (parseFloat(price.target.value) && swapProvider) {
      setIsExactInput(false);
      token1 === WETH ? setBaseToken('WETH') : setBaseToken('XST')
      setOutTokenAmount(price.target.value)  
      const buyPrice = token1 === WETH ? await swapProvider.getWETHfromXSPrice(price.target.value.toString()) : await swapProvider.getXSfromWETHPrice(price.target.value.toString());
      setInTokenAmount(buyPrice);
      const isInsufficientBalance = parseFloat(token0Balance) > parseFloat(buyPrice) ? false : true;
      setIsInsufficientBalance(isInsufficientBalance);
      if(swapProvider && token0 != '')
      {
        const isApproved = await swapProvider.isEnoughAllowance(buyPrice.toString(), token0, token0Symbol);
        setIsApproved(isApproved);
      }
    }
    else{
      setInTokenAmount('0');
      setOutTokenAmount(price.target.value);
    }
  };
  
  const swapTokens = async ()=>{
    if(inTokenAmount > 0)
    {
      if(isApproved)
      {
        if(token0 === WETH)
        {
          if(isExactInput)
          {
            var tx = await swapProvider.buyXSForWETH(inTokenAmount.toString())
            dispatch(setTransactionInfo(
              {
                hash: tx,
                type: 'buyXS'
              }));
          }
          else{
            var tx = await swapProvider.buyXSforWETHoutput(outTokenAmount.toString())
              dispatch(setTransactionInfo(
              {
                hash: tx,
                type: 'buyXS'
              }));
          }
        }
        else{
          if(isExactInput)
          {
            var tx = await swapProvider.buyWETHForXS(inTokenAmount.toString());
            dispatch(setTransactionInfo(
              {
                hash: tx,
                type: 'sellXS'
              }));
          }
          else
          {
              var tx = await swapProvider.buyWETHforXSoutput(outTokenAmount.toString());
              dispatch(setTransactionInfo(
              {
                hash: tx,
                type: 'sellXS'
              }));
          }  
        } 
        const receipt = await swapProvider.waitTransaction(tx)
        if(!!receipt)
        {
          if(token0 === WETH)
          {
            await setUserBalance(WETH, 'WETH', XSTOKEN, 'XS');
            const isApproved = !!inTokenAmount ? await swapProvider.isEnoughAllowance(inTokenAmount.toString(), WETH, 'WETH') : false;
            setIsApproved(isApproved);
          }
          else
          {
            await setUserBalance(XSTOKEN, 'XS', WETH, 'WETH');
            const isApproved = !!inTokenAmount ? await swapProvider.isEnoughAllowance(inTokenAmount.toString(), WETH, 'WETH') : false;
            setIsApproved(isApproved);
          }
        }
      }
      else
      {
        let rx = token0 === WETH ? await swapProvider.approve('WETH', inTokenAmount.toString()) : await swapProvider.approve('XST', inTokenAmount.toString());
        dispatch(setTransactionInfo(
        {
          hash: rx,
          type: 'approve'
        }));
        const receipt = await swapProvider.waitTransaction(rx)
        if(!!receipt)
        {
          setIsApproved(true);
        }
      }
    }
    dispatch(setTransactionInfo(
    {
      hash: null,
      type: null
    }));    
  }
  const changeUpperDropdown = async (token) =>{
    if(token.target.value === WETH)
    {
      await setUserBalance(WETH, 'WETH', XSTOKEN, 'XS');
      setToken0(WETH);
      setToken1(XSTOKEN)
      setToken0Symbol('WETH')
      setToken1Symbol('XS')
      if(baseToken === 'WETH' && !!outTokenAmount)
      {
        setIsExactInput(true);
        var newInTokenAmount = outTokenAmount;
        var newOutTokenAmount = await swapProvider.getWETHToXSPrice(newInTokenAmount.toString());
      }
      else if(baseToken === 'XST' && !!inTokenAmount)
      {
        setIsExactInput(false);
        var newOutTokenAmount = inTokenAmount;
        var newInTokenAmount = await swapProvider.getXSfromWETHPrice(newOutTokenAmount.toString());
      }
      const isApproved = !!newInTokenAmount ? await swapProvider.isEnoughAllowance(newInTokenAmount.toString(), WETH, 'WETH') : false;
      setIsApproved(isApproved);
      setInTokenAmount(newInTokenAmount);
      setOutTokenAmount(newOutTokenAmount);
    }
    else if(token.target.value == XSTOKEN){
      await setUserBalance(XSTOKEN, 'XS', WETH, 'WETH');
      setToken0(XSTOKEN)
      setToken1(WETH)
      setToken0Symbol('XS')
      setToken1Symbol('WETH')
      if(baseToken === 'WETH' && !!inTokenAmount)
      {
        setIsExactInput(false);
        var newOutTokenAmount = inTokenAmount;
        var newInTokenAmount = await swapProvider.getWETHfromXSPrice(newOutTokenAmount.toString());
      }
      else if(baseToken === 'XST' && !!outTokenAmount)
      {
        setIsExactInput(true);
        var newInTokenAmount = outTokenAmount;
        var newOutTokenAmount = await swapProvider.getXSToWETHPrice(newInTokenAmount.toString())
      }
      const isApproved = !!newInTokenAmount ? await swapProvider.isEnoughAllowance(newInTokenAmount.toString(), XSTOKEN, 'XS') : false;
      setIsApproved(isApproved);
      setInTokenAmount(newInTokenAmount);
      setOutTokenAmount(newOutTokenAmount);
    }
  }
  const changeLowerDropdown = async (token) =>{
    if(token.target.value === WETH)
    {
      await setUserBalance(XSTOKEN, 'XS', WETH, 'WETH');
      setToken1(WETH);
      setToken0(XSTOKEN)
      setToken1Symbol('WETH')
      setToken0Symbol('XS')
      if(baseToken === 'WETH' && !!inTokenAmount)
      {
        setIsExactInput(false);
        var newOutTokenAmount = inTokenAmount;
        var newInTokenAmount = await swapProvider.getWETHfromXSPrice(newOutTokenAmount.toString());
      }
      else if(baseToken === 'XST' && !!outTokenAmount)
      {
        setIsExactInput(true);
        var newInTokenAmount = outTokenAmount;
        var newOutTokenAmount = await swapProvider.getXSToWETHPrice(newInTokenAmount.toString());
      }
      const isApproved = !!newInTokenAmount ? await swapProvider.isEnoughAllowance(newInTokenAmount.toString(), XSTOKEN, 'XS') : false;
      setIsApproved(isApproved);
      setInTokenAmount(newInTokenAmount);
      setOutTokenAmount(newOutTokenAmount);
    }
    else if(token.target.value == XSTOKEN){
      await setUserBalance(WETH, 'WETH', XSTOKEN, 'XS');
      setToken1(XSTOKEN)
      setToken0(WETH)
      setToken1Symbol('XS')
      setToken0Symbol('WETH')
      if(baseToken === 'WETH' && !!outTokenAmount)
      {
        setIsExactInput(true);
        var newInTokenAmount = outTokenAmount;
        var newOutTokenAmount = await swapProvider.getWETHToXSPrice(newInTokenAmount.toString());
      }
      else if(baseToken === 'XST' && !!inTokenAmount)
      {
        setIsExactInput(false);
        var newOutTokenAmount = inTokenAmount;
        var newInTokenAmount = await swapProvider.getXSfromWETHPrice(newOutTokenAmount.toString())
      }
      const isApproved = !!newInTokenAmount ? await swapProvider.isEnoughAllowance(newInTokenAmount.toString(), WETH, 'WETH') : false;
      setIsApproved(isApproved);
      setInTokenAmount(newInTokenAmount);
      setOutTokenAmount(newOutTokenAmount);
    }
  }

  const { handleChange } = props;
  function BuyButton(props) {
    let button
    if (!inTokenAmount)
    {
      button = <button className="btn xs-trade-change-btn">Enter an amount</button>
    }
    else if(isInsufficientBalance)
    {
      button = <button className="btn xs-trade-change-btn">Insufficient balance</button>
    }
    else if(isApproved)
    {
      button = <button onClick = {swapTokens} className="btn xs-trade-change-btn">Buy</button>
    }
    else
    {
      button = <button onClick = {swapTokens} className="btn xs-trade-change-btn">Approve</button>
    }
    return (
      button
    );
  }
  
  return (
    <div className="xs-body-trade">
      <div className="xs-block">
        <div className="xs-trade-change">
          <div className="xs-trade-change-top">
            <span>Обменять</span>
            <button><img src={settingsImg} alt="" /></button>
          </div>
          <p>Balance: {parseFloat(token0Balance).toFixed(5)} {token0Symbol}</p>
          <div className="xs-trade-change-input xs-trade-change-input-xs">
            <select value={token0} onChange={changeUpperDropdown}>
              <option defaultValue value={WETH}>WETH</option>
              <option value={XSTOKEN}>XS</option>
            </select>
            <input onChange={async (e) => { await changeOutputPrice(e); }} type="tel" placeholder={0.0} value={inTokenAmount}/>
            <p className="btn-max btn-max-trade" onClick={setMaxAmountUpper}>MAX</p>
          </div>
          <p>Balance: {parseFloat(token1Balance).toFixed(5)} {token1Symbol}</p>
          <div className="xs-trade-change-input xs-trade-change-input-xs">
            <select value={token1} onChange={changeLowerDropdown}>
              <option defaultValue value={XSTOKEN}>XS</option>
              <option value={WETH}>WETH</option>
            </select>
            <input onChange={async(e) => {await changeInputPrice(e); }} type="tel" placeholder={0.0} value={outTokenAmount}/>
            <p className="btn-max btn-max-trade" onClick={setMaxAmountLower}>MAX</p>
          </div>
          <BuyButton></BuyButton>
        </div>
      </div>
    </div>
  );
}

export default TradePage;