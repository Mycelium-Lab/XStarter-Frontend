import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setTransactionInfo} from '../redux/transaction-info/actions';


function SPStake(props) {

  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [userStakedAmount, setUserStakedAmount] = useState('');
  const [userTier, setUserTier] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const methods = useSelector(state => state.wallet.methods);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo()
  }, [])
  const setUserInfo = async () =>{
    const balance = await methods.getUserBalance();
    const stakedAmount = await methods.getUserStakedAmount();
    const tier = await methods.getUserTier();
    setUserBalance(balance);
    setUserStakedAmount(stakedAmount);
    setUserTier(tier);
  }

  const stakeXST = async () =>{
    if(parseFloat(amount) && methods)
    {
      const tx = await methods.stakeXS(amount);
      dispatch(setTransactionInfo(
        {
          hash: tx,
          type: 'stakeXS'
        }));
        const receipt = await methods.waitTransaction(tx)
    }
    dispatch(setTransactionInfo(
      {
        hash: null,
        type: null
      })); 
  }
  const withdrawXS = async () => {
    if(userStakedAmount !== 0)
    {
      ///
    }
  }
  const approve = async() =>{
    if(parseFloat(amount) && methods)
    {
      const rx = await methods.approveStake(amount)
        dispatch(setTransactionInfo(
        {
          hash: rx,
          type: 'approve'
        }));
        const receipt = await methods.waitTransaction(rx)
    }
    dispatch(setTransactionInfo(
      {
        hash: null,
        type: null
      })); 
  }

  const changeInput = async (price) =>{
    if((!/^[0-9.]*$/.test(price.target.value.toString())))
    {
      // Do nothing
    }
    else if (parseFloat(price.target.value) && methods && (/^[0-9.]*$/.test(price.target.value.toString()))) {
      setAmount(price.target.value.toString());
      const isApproved = await methods.isEnoughAllowance(price.target.value.toString());
      setIsApproved(isApproved);  
    }
    else{
      setAmount(price.target.value);
    }
  };
  function StakeButton(props) {
    let button
    if (amount == 0)
    {
      button = <button className="btn">Enter an amount</button>
    }
    else if(isApproved)
    {
      button = <button onClick = {stakeXST} className="btn">Stake</button>
    }
    else
    {
      button = <button onClick = {approve} className="btn">Approve</button>
    }
    return (
      button
    );
  }

  const { handleChange } = props;
    return (
        <div className="staking-tier mb80">
          <span className="staking-tier-text mb40">
            We are proud to see you as part of XStarter community. Your current tier is: {userTier}
          </span>
          <div className="xs-block">
            <div className="staking-tier-stats">
              <div><span>Balance:</span> <span>{userBalance} XS</span></div>
              <div><span>Staked:</span> <span>{userStakedAmount} XS</span></div>
            </div>
            <div className="staking-tier-stats-input">
              <input onChange={async (e) => {changeInput(e)}} type="tel" placeholder={0.0} value={amount}/>
            </div>
            <div className="staking-tier-stats-btns">
              <StakeButton></StakeButton>
              <button onClick= {withdrawXS} className="btn btn-wo-bg">Unstake</button>
            </div>
          </div>
        </div>
    );
}
    
export default SPStake;