import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { checkConnection, selectWallet } from '../wallets/actions';
const ConnectWalletModal = (props) => {
    const isLoaded = useSelector(state => state.wallet.isLoaded)
    const provider =  useSelector(state => state.wallet.provider)
    const address =  useSelector(state => state.wallet.address)
    const [connected, setConnected] = useState(false)
    const dispatch = useDispatch()
    const [pageLoaded, setPageLoaded] = useState(false)
    useEffect(()=> {
        if(!isLoaded || !provider || !address){
            setConnected(false)
        }
    },[address, isLoaded, provider])
    const setupConnection = async () => {
        const isConnected = await checkConnection(dispatch);
        if(isConnected){
            setConnected(true)
        }else{
            setConnected(false)
        }
        setPageLoaded(true)
    }
    useEffect(()=> {
        setupConnection()
    },[])
    const connectToWallet = async () => {
        if(!isLoaded || !provider || !address){
            await selectWallet('metaMask', dispatch)
        }
    }
    if((!isLoaded || !provider || !address) && !connected && pageLoaded){
        return (<div className="modal"><div className="xs-block xs-modal-block">
        <div className='xs-modal-header-text'>Connect your wallet!</div>
        <div className='xs-modal-text'>Before you continue, please, connect with MetaMask.</div>
        <button onClick={async ()=>{await connectToWallet()}} className='btn xs-modal-button'>Connect wallet</button>
    </div></div>)
    }else {
        return(<></>)
    }
}
export default ConnectWalletModal;