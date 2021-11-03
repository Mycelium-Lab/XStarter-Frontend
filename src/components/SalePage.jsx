import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import saleFactoryAbi from '../sale/Abi/SaleFactory.json'
import Web3 from 'web3';
function SalePage(props) {
    const { handleChange } = props;
    const [sale, setSale] = useState(null);
    const [inTokenAmount, setInTokenAmount] = useState(null)
    const [outTokenAmount, setOutTokenAmount] = useState(null)
    const [addTokenAmount, setAddTokenAmount] = useState('')
    const [saleMutables, setSaleMutables] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const address = useSelector(state => state.wallet.address);
    const currentChainId = useSelector(state => state.wallet.chainId);
    const isLoaded = useSelector(state => state.wallet.isLoaded)
    const setParams = async () => {
        if (props.sale) {
            const mutables = await props.sale.getMutables();
            setSaleMutables(mutables);
            setSale(props.sale);
        }
    }
    useEffect(() => {
        if (!sale) {
            setParams()
        }
        isAddressAdmin()

    }, [address, currentChainId, isLoaded])
    const timeConverter = (UNIX_timestamp) => {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
        const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    const approveSaleButton = () => {
        if(!saleMutables.approved && isAddressAdmin){
            return <button className="btn xs-trade-action-btn" onClick={async () => { await sale.approveSale() }}>Approve sale</button>
        }
    }
    const isAddressAdmin = async () => {
        if (window.ethereum && address) {
          const web3 = new Web3(window.ethereum)
          const saleFactoryContract = new web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
          const admin = await saleFactoryContract.methods.admin().call()
          if(admin.toLowerCase() === address.toLowerCase()){
            setIsAdmin(true)
            return true
          }
        }
        setIsAdmin(false)
        return false
      }
    const saleAction = () => {
        if(saleMutables.status === "Current"){
            return <div className="xs-trade-change xs-sale-trade">
                        <div className="xs-trade-change-top">
                            <span>Buy tokens</span>
                        </div>
                        <div className="xs-trade-change-input  xs-trade-change-input-xs">
                            <select defaultValue="ETH" >
                                <option defaultValue value={"ETH"}>ETH</option>
                            </select>
                            <input onChange={async (e) => { await changeOutputPrice(e); }} type="tel" placeholder={0.0} value={inTokenAmount} />
                        </div>
                        <div className="xs-trade-change-input xs-trade-change-input-xs">
                            <select defaultValue={sale.immutables.tokenSymbol}>
                                <option defaultValue value={sale.immutables.tokenSymbol}>{sale.immutables.tokenSymbol}</option>
                            </select>
                            <input onChange={async (e) => { await changeInputPrice(e); }} type="tel" placeholder={0.0} value={outTokenAmount} />
                        </div>
                        <button className="btn xs-trade-change-btn" onClick={async () => { if(parseFloat(inTokenAmount) > 0) await sale.buyTokens(inTokenAmount) }}>Buy</button>
                    </div>
        }else if(saleMutables.status === "Finished"){
            if(parseInt(saleMutables.totalTokensSold) >= parseInt(sale.immutables.softcap)){
                return <div className="xs-trade-change xs-sale-trade">
                            <div>Sale ended!</div>
                            <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawBoughtTokens() }}>Withdraw tokens</button>
                            {(() => {
                                if(sale.immutables.tokenCreator.toLowerCase() === sale.account.toLowerCase()) {
                                    return <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawSaleResult() }}>Withdraw sale result</button>
                                }
                            })()}
                        </div>
            }else{
                return <div className="xs-trade-change xs-sale-trade">
                            <div>Sale failed!</div>
                            <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawFunds() }}>Withdraw funds</button>
                            {(() => {
                                if(sale.immutables.tokenCreator.toLowerCase() === sale.account.toLowerCase()) {
                                    return <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawSaleResult() }}>Withdraw sale result</button>
                                }
                            })()}
                        </div>
            }
        }else if(saleMutables.status === "Upcoming"){
            if(sale.immutables.tokenCreator.toLowerCase() === sale.account.toLowerCase()){
                return <div className="xs-trade-change xs-sale-trade">
                            <div className="xs-sale-start-text">Sale will start soon...</div>
                            
                             <input onChange={async (e) => { await changeAddTokenAmount(e); }} type="tel" placeholder={0.0} value={addTokenAmount} />
                        
                            <button className="btn xs-trade-action-btn" onClick={async () => { await sale.addTokensForSale(addTokenAmount) }}>Add tokens for sale</button>
                            {approveSaleButton()}
                        </div>
            }else {
                return <div className="xs-trade-change xs-sale-trade">
                <div className="xs-sale-start-text">Sale will start soon...</div>
                {approveSaleButton()}
            </div>
            }
        }
    }
    const changeOutputPrice = (onChangeEvent) => {
        if (onChangeEvent.target.value === '') {
            setInTokenAmount('')
            setOutTokenAmount('')
        } else if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value)){
            const token = sale.calculatePriceETHToToken(onChangeEvent.target.value, saleMutables.price);
            setOutTokenAmount(token.tokenAmount)
            setInTokenAmount(onChangeEvent.target.value)
        }
    }
    const changeInputPrice = (onChangeEvent) => {
        if (onChangeEvent.target.value === '') {
            setInTokenAmount('')
            setOutTokenAmount('')
        } else if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value)){
            const eth = sale.calculatePriceTokenToETH(onChangeEvent.target.value, saleMutables.price);
            setOutTokenAmount(onChangeEvent.target.value)
            setInTokenAmount(eth)
        }
        
    }
    const changeAddTokenAmount = (onChangeEvent) => {
        if (onChangeEvent.target.value === '') {
            setAddTokenAmount('')
        } else if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value)){
            setAddTokenAmount(onChangeEvent.target.value)
        }
    }
    if (saleMutables && sale) {
        return (
            <div className="xs-body-sale">
                
                <div className="xs-sale">
                <div className="xs-sale-info">
                    <div className="ido-status-stats">
                                <div>Token name - {sale.immutables.tokenName}</div>
                                <div>Swap Rate - 1 {sale.immutables.tokenSymbol} : {saleMutables.price} ETH</div>
                                <div>Pool Cap - {saleMutables.hardcap} {sale.immutables.tokenSymbol}</div>
                                <div>Participants - {saleMutables.numberOfParticipants}</div>
                                <div>Softcap - {sale.immutables.softcap} {sale.immutables.tokenSymbol}</div>
                                <div>Start date - {timeConverter(sale.immutables.startTimestamp)}</div>
                                <div>End date - {timeConverter(sale.immutables.endTimestamp)}</div>
                    </div>
                </div>
                <div className="xs-sale-separator"></div>
                    {saleAction()}
                </div>
            </div>
        )
    } else {
        return (<div className="xs-loading-text">Loading...</div>)
    }
}

export default SalePage;