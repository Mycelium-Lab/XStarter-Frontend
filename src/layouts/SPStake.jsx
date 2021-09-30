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
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chainName, setChainName] = useState('');
  const methods = useSelector(state => state.wallet.methods);
  const wallet = useSelector(state => state.wallet.address);
  const currentChainId = useSelector(state => state.wallet.chainId);
  const rightChainId = useSelector(state => state.wallet.correntChainId);
  const provider = useSelector(state => state.wallet.provider)
  const isInitialized = useSelector(state => state.wallet.isLoaded)

  const dispatch = useDispatch();
  const { handleChange } = props;

  useEffect(() => {
    rightChainId === '1' ? setChainName('Mainnet') : setChainName('Rinkeby');
    setUserInfo()
  }, [wallet, currentChainId])
  const setUserInfo = async () =>{
    setIsLoaded(false);
    if(!!wallet && !!methods && currentChainId === rightChainId)
    {
      methods.setWallet(wallet);
      const balance = await methods.getUserBalance();
      const stakedAmount = await methods.getUserStakedAmount();
      const tier = await methods.getUserTier();
      const currentStakes = await methods.getCurrentStakes();
      const isInsufficientBalance = parseFloat(balance) >= parseFloat(amount) ? false : true;
  
      setIsInsufficientBalance(isInsufficientBalance);
      setCurrentStakes(currentStakes)
      setUserBalance(balance);
      setUserStakedAmount(stakedAmount);
      setUserTier(tier);
      setIsLoaded(true);  
    }
  }
  async function setMaxAmount() {
    setIsInsufficientBalance(false);
    setAmount(userBalance);
    let isApproved = await methods.isEnoughAllowance(userBalance.toString());
    setIsApproved(isApproved);
  }
  const switchNetwork = async() =>
  {
    try{
      const res = await window.ethereum.request({ 
          method: 'wallet_switchEthereumChain',
          params: [
              {chainId: '0x' + rightChainId}
            ]
      });
      // setIsNetworkConnectionError(false);
    }catch(err){
      // setIsNetworkConnectionError(true);
    }
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
      const receipt = await methods.waitTransaction(tx);
      if(!!receipt)
      {
        setUserInfo();
      }
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
      setIsModal(false);
      const receipt = await methods.waitTransaction(tx)
      if(!!receipt)
      {
        let newStakes = currentStakes.filter(function(element){
          return element.idx !== evt.target.value.toString()
        });
        setCurrentStakes(newStakes);
        setUserInfo();
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
      const rx = await methods.approveStake(amount.toString())
        dispatch(setTransactionInfo(
        {
          hash: rx,
          type: 'approve'
        }));
        const receipt = await methods.waitTransaction(rx)
        if(!!receipt)
        {
          setIsApproved(true);
        }
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
      if(parseFloat(price.target.value) > parseFloat(userBalance))
      {
        setIsInsufficientBalance(true);
      }
      else{
        setIsInsufficientBalance(false);
      }
    }
    else{
      setAmount(price.target.value);
    }
  };
  function StakesTable({ data }) {
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
  function StakeButton(props) {
    let button
    if((!wallet || !provider) && isInitialized)
    {
      button = <button className="btn xs-stake-btn-loading">Connect wallet</button>
    }
    else if(currentChainId !== rightChainId && !!wallet && isInitialized)
    {
      button = <button className="btn xs-stake-btn-loading" onClick={switchNetwork}>Switch to {chainName}</button>
    }
    else if(!isLoaded)
    {
      button = <button className="btn xs-stake-btn-loading">Loading....</button>
    }
    else if (amount == 0)
    {
      button = <button className="btn xs-stake-btn">Enter an amount</button>
    }
    else if(isInsufficientBalance)
    {
      button = <button className="btn xs-stake-btn-insufficient-balance">Insufficient balance</button>
    }
    else if(isApproved)
    {
      button = <button onClick = {stakeXST} className="btn xs-stake-btn">Stake</button>
    }
    else
    {
      button = <button onClick = {approve} className="btn xs-stake-btn">Approve</button>
    }
    return (
      button
    );
  }
  function UnstakeButton(props)
  {
    let stakeButton
    
    if(userStakedAmount == 0 || !isLoaded ||currentChainId !== rightChainId && !!wallet && isInitialized)
    {
      stakeButton = <div></div>
    }
    else
    {
      stakeButton = <button onClick={openModal} className="btn btn-wo-bg">Unstake</button>
    }
    return stakeButton
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
          <button className="btn btn-max" onClick={setMaxAmount}>MAX</button>
        </div>
        <div className="staking-tier-stats-btns">
          <StakeButton></StakeButton>
          <UnstakeButton></UnstakeButton>
        </div>
      </div>
    </div>
  );
    
    
}
    
export default SPStake;