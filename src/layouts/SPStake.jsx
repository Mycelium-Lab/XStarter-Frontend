import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setTransactionInfo} from '../redux/transaction-info/actions';

function SPStake(props) {

  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [userStakedAmount, setUserStakedAmount] = useState('');
  const [userTier, setUserTier] = useState('');
  const [currentStakes, setCurrentStakes] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const methods = useSelector(state => state.wallet.methods);
  const dispatch = useDispatch();
  const { handleChange } = props;

  useEffect(() => {
    setUserInfo()
  }, [])
  const setUserInfo = async () =>{
    const balance = await methods.getUserBalance();
    const stakedAmount = await methods.getUserStakedAmount();
    const tier = await methods.getUserTier();
    if(stakedAmount !== 0)
    {
      const currentStakes = await methods.getCurrentStakes();
      console.log(currentStakes)
      setCurrentStakes(currentStakes)
    } 
    setUserBalance(balance);
    setUserStakedAmount(stakedAmount);
    setUserTier(tier);
  }

  const openModal = () =>
  {
    setIsModal(true);
  }

  const closeModal = () =>{
    setIsModal(false);
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
  const withdrawXS = async (evt, index) => {
    if(userStakedAmount !== 0)
    {
      const tx = await methods.withdrawXS(evt.target.value.toString());
      dispatch(setTransactionInfo(
        {
          hash: tx,
          type: 'withdrawXS'
        }));
      const receipt = await methods.waitTransaction(tx)
      if(!!receipt)
      {
        let newStakes = currentStakes.filter(function(element){
          return element.idx !== evt.target.value.toString()
        });
        setCurrentStakes(newStakes);
      }
    }
    dispatch(setTransactionInfo(
      {
        hash: null,
        type: null
      })); 
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
  function StakesTable({ data }) {
    const withdraw = async (evt) =>{
      console.log(evt.target.value)
    }
    if(!!data && isModal)
    {
      return(
        <div className="modal" onClick={closeModal}>
          <div className="staking-table staking-table-coins" onClick={e => e.stopPropagation()}>
            <div className="xs-block xs-withdraw-table">
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th><th>Staked amount (XS)</th><th>Reward</th>
                  </tr>
                </thead>
               <tbody>
                  {data.map((item, index) => {
                    const { idx, stakeAmount, reward } = item
                    return(
                        <tr key={idx}>
                          <td><button onClick={(evt) => withdrawXS(evt, index)} value={idx} className="btn xs-table-btn">Withdraw</button></td>
                          <td>{stakeAmount}</td>
                          <td>{reward}</td>
                        </tr>
                    )
                  })}
               </tbody>
            </table>
          </div>
         </div>
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    } 
  }
    return (
      <div className="staking-tier mb80">
        <StakesTable data={currentStakes}></StakesTable>
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
            <button onClick= {openModal} className="btn btn-wo-bg">Unstake</button>
          </div>
        </div>
      </div>
    );
    
    
}
    
export default SPStake;