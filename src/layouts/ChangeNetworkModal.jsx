import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { checkIsAdmin, checkCanCreateSales } from '../wallets/actions';
const ChangeNetworkModal = (props) => {
    const isLoaded = useSelector(state => state.wallet.isLoaded)
    const provider = useSelector(state => state.wallet.provider)
    const address = useSelector(state => state.wallet.address)
    const rightChainId = useSelector(state => state.wallet.correntChainId);
    const currentChainId = useSelector(state => state.wallet.chainId);
    const [showNetworkChangeModal, setShowNetworkChangeModal] = useState(false)
    const [chainName, setChainName] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        rightChainId === '1' ? setChainName('Mainnet') : setChainName('Rinkeby');
        if(rightChainId !== currentChainId && isLoaded){
            setShowNetworkChangeModal(true)
        } else{
            setShowNetworkChangeModal(false)
        }
      }, [currentChainId, rightChainId, isLoaded])
    const switchNetwork = async() =>
    {
    try{
      const res = await window.ethereum.request({ 
          method: 'wallet_switchEthereumChain',
          params: [
              {chainId: '0x' + rightChainId}
            ]
      });
      await checkIsAdmin(provider, address, dispatch);
      await checkCanCreateSales(provider, address, dispatch);
      // setIsNetworkConnectionError(false);
    }catch(err){
      // setIsNetworkConnectionError(true);
    }
    }
    if(showNetworkChangeModal){
        return (<div className="modal"><div className="xs-block xs-modal-block">
        <div className='xs-modal-header-text'>Change your network!</div>
        <div className='xs-modal-text'>Before you continue, please, switch your network to {chainName}.</div>
        <button onClick={async ()=>{await switchNetwork()}} className='btn xs-modal-button'>Switch to {chainName}</button>
    </div></div>)
    }else {
        return(<></>)
    }
}
export default ChangeNetworkModal;