import React from 'react';
import { useState, useEffect } from 'react';
import { SaleFactory } from '../sale/salefactory';
import Web3 from "web3";
function AdminPage(props) {
    const [saleFactory, setSaleFactory] = useState(null)
    const [address, setAddress] = useState('')
    const [status, setStatus] =  useState(null)
    const [addButtonActive, setAddButtonActive] = useState(false)
    const [removeButtonActive, setRemoveButtonActive] = useState(false)
    const [transactionCompleted, setTransactionCompleted] = useState(true)
    useEffect(() => {
        if (!saleFactory) {
            setParams()
        }
        onAddressChange()
    }, [address, transactionCompleted])
    const setParams = async () => {
        const sf = await SaleFactory.create()
        setSaleFactory(sf)
    }
    const setSaleCreator = async (value) => {
        if(address!=='' && Web3.utils.isAddress(address.toLowerCase()) && saleFactory != null){
            await saleFactory.setSaleCreator(address, value)
            setTransactionCompleted(!transactionCompleted)
        }
    }
    const onAddressChange = async () => {
        if(address!=='' && Web3.utils.isAddress(address.toLowerCase()) && saleFactory != null){
            setStatus(<div className="xs-admin-text">Status: loading...</div>)
            let canCreateSale = false;
            try{
                canCreateSale = await saleFactory.checkCanCreateSale(address)
            } catch(err){
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
        }else if (address===''){
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
        setAddress(onChangeEvent.target.value)
    }
    return <div className="xs-body-admin">
        <div className="xs-block">
        <div className="xs-admin-text">Team address</div>
            <input className="xs-admin-input" value={address} onChange={async (onChangeEvent) => {await onChangeInput(onChangeEvent)}}></input>
            { status }
            <div className="xs-admin-block">
                <button className="btn xs-admin-btn" disabled={!addButtonActive} onClick={async ()=>{ await setSaleCreator(true)}}>Grant permission to create sales</button>
                <button className="btn xs-admin-btn" disabled={!removeButtonActive} onClick={async ()=>{ await setSaleCreator(false)}}>Revoke permission to create sales</button>
            </div>
        
        </div>
        </div>
}
export default AdminPage;