import React from 'react';
import { useState, useEffect } from 'react';
import { SaleFactory } from '../sale/salefactory';
import { useSelector, useDispatch } from 'react-redux';
import { checkCanCreateSales } from '../wallets/actions';

import Web3 from "web3";
function AdminPage(props) {
    const { handleChange } = props;
    const dispatch = useDispatch();
    const [saleFactory, setSaleFactory] = useState(null)
    const [inputAddress, setInputAddress] = useState('')
    const [status, setStatus] =  useState(null)
    const [addButtonActive, setAddButtonActive] = useState(false)
    const [removeButtonActive, setRemoveButtonActive] = useState(false)
    const [transactionCompleted, setTransactionCompleted] = useState(true)
    const provider = useSelector(state => state.wallet.provider)
    const isLoaded = useSelector(state => state.wallet.isLoaded)
    const address = useSelector(state => state.wallet.address)
    const isAdmin = useSelector(state => state.wallet.isAdmin)
    useEffect(() => {
        if (!saleFactory && isLoaded && provider && address) {
            setParams()
        }
    }, [isLoaded])
    useEffect(() => {
        if(!isAdmin){
            handleChange('projects')
        }
    }, [isAdmin])
    useEffect(() => {
        if (saleFactory && isAdmin) {
            saleFactory.setAccountAddress(address)
        }
    }, [address])
    useEffect(() => {
        onInputAddressChange()
    }, [inputAddress, transactionCompleted])
    const setParams = async () => {
        const sf = await SaleFactory.create(provider, address)
        setSaleFactory(sf)
    }
    const setSaleCreator = async (value) => {
        if(inputAddress!=='' && Web3.utils.isAddress(inputAddress.toLowerCase()) && saleFactory != null){
            await saleFactory.setSaleCreator(inputAddress, value)
            if(address && provider && address.toLowerCase() === inputAddress.toLowerCase()){
                await checkCanCreateSales(new Web3(provider), address, dispatch)
            }
            setTransactionCompleted(!transactionCompleted)
        }
    }
    const onInputAddressChange = async () => {
        if(inputAddress!=='' && Web3.utils.isAddress(inputAddress.toLowerCase()) && saleFactory != null){
            setStatus(<div className="xs-admin-text">Status: loading...</div>)
            let canCreateSale = false;
            try{
                canCreateSale = await saleFactory.checkCanCreateSale(inputAddress)
            } catch(err){
                console.error(err)
                setStatus(<div className="xs-admin-text">Status: an error while getting address' status</div>)
                return
            }
            if(canCreateSale){
                setStatus(<div className="xs-admin-text">Status: <span className="xs-admin-text-green">address can create sales</span></div>)
                setAddButtonActive(false)
                setRemoveButtonActive(true)
            }else{
                setStatus(<div className="xs-admin-text">Status: <span className="xs-admin-text-red">address can't create sales</span></div>)
                setAddButtonActive(true)
                setRemoveButtonActive(false)
            } 
        }else if (inputAddress===''){
            setAddButtonActive(false)
            setRemoveButtonActive(false)
            setStatus(null)
        }else{
            const status = <div className="xs-admin-text">Status: invalid address</div>
            setAddButtonActive(false)
            setRemoveButtonActive(false)
            setStatus(status)
        }
    }
    const onChangeInput = async (onChangeEvent) => {
        setInputAddress(onChangeEvent.target.value)
    }
    return <div className="xs-body-admin">
        <div className="xs-block">
        <div className="xs-admin-text">Team address</div>
            <input className="xs-admin-input" value={inputAddress} onChange={async (onChangeEvent) => {await onChangeInput(onChangeEvent)}}></input>
            { status }
            <div className="xs-admin-block">
                <button className="btn xs-admin-btn" disabled={!addButtonActive} onClick={async ()=>{ await setSaleCreator(true)}}>Grant permission to create sales</button>
                <button className="btn xs-admin-btn" disabled={!removeButtonActive} onClick={async ()=>{ await setSaleCreator(false)}}>Revoke permission to create sales</button>
            </div>
        
        </div>
        </div>
}
export default AdminPage;