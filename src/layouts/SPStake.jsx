import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setTransactionInfo} from '../redux/transaction-info/actions';
import logo from '../img/xstarter-logo.png';
function SPStake(props) {

  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [userStakedAmount, setUserStakedAmount] = useState('');
  const [userTier, setUserTier] = useState('');
  const [currentStakes, setCurrentStakes] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [totalRewardAmount, setTotalRewardAmount] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chainName, setChainName] = useState('');
  const [currentAPR, setCurrentAPR] = useState('');
  const [tvl, setTVL] = useState('');
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
      const currentAPR = await methods.getCurrentAPR();
      const tvl = await methods.getTVL();
      const totalRewardAmount = calculateTotalRewardAmount(currentStakes)

      setTotalRewardAmount(totalRewardAmount);
      setTVL(tvl);
      setCurrentAPR(currentAPR);
      setIsInsufficientBalance(isInsufficientBalance);
      setCurrentStakes(currentStakes)
      setUserBalance(balance);
      setUserStakedAmount(stakedAmount);
      setUserTier(tier);
      setIsLoaded(true);  
    }
  }
  const calculateTotalRewardAmount = (currentStakes) => {
    let totalReward = 0;
    currentStakes.forEach((item)=>{
      const { reward } = item
      totalReward += reward;
    })
    return totalReward
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
      button = <button className="btn xs-stake-btn-loading xs-staking-active-button">Connect wallet</button>
    }
    else if(currentChainId !== rightChainId && !!wallet && isInitialized)
    {
      button = <button className="btn xs-stake-btn-loading xs-staking-active-button" onClick={switchNetwork}>Switch to {chainName}</button>
    }
    else if(!isLoaded)
    {
      button = <button className="btn xs-stake-btn-loading xs-staking-active-button">Loading....</button>
    }
    else if (amount == 0)
    {
      button = <button className="btn xs-stake-btn xs-staking-active-button">Enter an amount</button>
    }
    else if(isInsufficientBalance)
    {
      button = <button className="btn xs-stake-btn-insufficient-balance xs-staking-active-button">Insufficient balance</button>
    }
    else if(isApproved)
    {
      button = <button onClick = {stakeXST} className="btn xs-stake-btn xs-staking-active-button">Stake</button>
    }
    else
    {
      button = <button onClick = {approve} className="btn xs-stake-btn xs-staking-active-button">Approve</button>
    }
    return (
      button
    );
  }
  function round(value, precision) {
    if (Number.isInteger(precision)) {
      let shift = Math.pow(10, precision);
      // Limited preventing decimal issue
      return (Math.round( value * shift + 0.00000000000001 ) / shift);
    } else {
      return Math.round(value);
    }
  }
  function UnstakeButton(props)
  {
    let stakeButton
    
    if(userStakedAmount == 0 || !isLoaded ||currentChainId !== rightChainId && !!wallet && isInitialized)
    {
      stakeButton = <button className="btn xs-staking-button">UNSTAKE</button>
    }
    else
    {
      stakeButton = <button onClick={openModal} className="btn xs-staking-button">UNSTAKE</button>
    }
    return stakeButton
  }
  return (
    <>
    <StakesTable data={currentStakes}></StakesTable>
    <div className="xs-staking-info-header mb30">
      STAKE YOUR XS TO GET YOUR ALLOCATION TIER 
      <br></br>
      AND EARN COMMUNITY STAKING REWARD
    </div>
    <div className="xs-staking-info-blocks">
      <div className="xs-staking-block xs-staking-block-green xs-staking-info-block">
        <div className="xs-staking-info-block-header">
          {currentAPR||'0'} %
        </div>
        <div className="xs-staking-info-block-content">
          CURRENT APR
        </div>
      </div>
      <div className="xs-staking-block xs-staking-info-block">
        <div className="xs-staking-info-block-header">
          {tvl||'0'}XS
        </div>
        <div className="xs-staking-info-block-content">
          TVL IN STAKING POOL
        </div>
      </div>
      <div className="xs-staking-block xs-staking-info-block">
        <div className="xs-staking-info-block-header">
          {round((userStakedAmount * parseInt(currentAPR))/365, 5) || '0'}XS
        </div>
        <div className="xs-staking-info-block-content">
          YOUR AVERAGE REWARDS PER DAY
        </div>
      </div>
      <div className="xs-staking-block xs-staking-stake-block">
      <div className="xs-staking-stake-buttons mb30">
      <StakeButton></StakeButton>
      <UnstakeButton></UnstakeButton>
      </div>
      <div>
      <div className="xs-staking-input-label">STAKE LIGHT</div>
      <div className="staking-tier-stats-input">
          <input onChange={async (e) => {changeInput(e)}} type="tel" placeholder={0.0} value={amount}/>
          <button className="btn btn-max" onClick={setMaxAmount}>MAX</button>
        </div>
    </div>
    
    </div>
    <div className="xs-staking-block xs-staking-reward-block">
      <div className="xs-staking-input-label">YOUR REWARDS</div>
      <div className="xs-staking-reward mb10">
        <img src={logo}></img>
        <div className="xs-staking-reward-text-block">
          <div className="xs-staking-reward-value">{totalRewardAmount}</div>
          <div className="xs-staking-reward-tokenname">XS</div>
        </div>
      </div>
      <button onClick={openModal}className="btn btn-wo-bg xs-staking-claim-rewards-button">CLAIM REWARDS</button>
      <div className="xs-staking-input-label">STAKED</div>
      <div className="xs-staking-reward mb30">
        <img src={logo}></img>
        <div className="xs-staking-reward-text-block">
          <div className="xs-staking-reward-value">{userStakedAmount}</div>
          <div className="xs-staking-reward-tokenname">XS</div>
        </div>
      </div>
      <div className="xs-staking-input-label">UNSTAKED</div>
      <div className="xs-staking-reward">
        <img src={logo}></img>
        <div className="xs-staking-reward-text-block">
          <div className="xs-staking-reward-value">{userBalance - userStakedAmount}</div>
          <div className="xs-staking-reward-tokenname">XS</div>
        </div>
      </div>
    </div>
    </div>

   
    </>
  );
    
    
}
    
export default SPStake;