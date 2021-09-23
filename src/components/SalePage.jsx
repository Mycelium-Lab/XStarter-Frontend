import React from 'react';
import topblockimg from '../img/top-block-img.png';
import SPStake from '../layouts/SPStake';
import SPTableCoins from '../layouts/SPTableCoins';
import SPTableProfits from '../layouts/SPTableProfits';
import { useState, useEffect } from 'react';
function SalePage(props) {
    const { handleChange } = props;
    const [sale, setSale] = useState(null);
    const [saleMutables, setSaleMutables] = useState(null);
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

    }, [])
    const timeConverter = (UNIX_timestamp) => {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
        const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
      // Добавить токены до начала сейла. Кнопка показывается, если сейл еще не начался, адрес соответствует адресу держателя токенов (продавцу).
    const addTokensButton = () => {
        if(sale && saleMutables && saleMutables.status === "Upcoming" && sale.immutables.tokenCreator.toLowerCase() === sale.account.toLowerCase()){
            return <button onClick={async () => { await sale.addTokensForSale("125000") }}>Add tokens for sale</button>
        }
    }
    // Забрать результат продажи (лишние токены + эфир). Кнопка показывается, если сейл закончился, адрес соответствует адресу держателя токенов (продавцу).
    const withdrawSaleResultButton = () => {
        if(sale && saleMutables && saleMutables.status === "Finished" && sale.immutables.tokenCreator.toLowerCase() === sale.account.toLowerCase()){
            return <button onClick={async () => { await sale.withdrawSaleResult() }}>Withdraw sale result</button>
        }
    }
    // Забрать эфир, если не был достигнут софткап и время кончилось. 
    const withdrawFundsButton = () => {
        if(sale && saleMutables && saleMutables.status === "Finished" && parseInt(saleMutables.totalTokensSold) < parseInt(sale.immutables.softcap)){
            return <button onClick={async () => { await sale.withdrawFunds() }}>Withdraw funds</button>
        }
    }
    // Забрать купленные токены, если был достигнут софткап и время кончилось.
    const withdrawBoughtTokensButton = () => {
        if(sale && saleMutables && saleMutables.status === "Finished" && parseInt(saleMutables.totalTokensSold) >= parseInt(sale.immutables.softcap)){
            return <button onClick={async () => { await sale.withdrawBoughtTokens() }}>Withdraw tokens</button>
        }
    }
    // Купить токены во время сейла.
    const buyTokensButton = () => {
        if(sale && saleMutables && saleMutables.status === "Current" && parseInt(saleMutables.totalTokensSold) < parseInt(saleMutables.hardcap)){
            return <button onClick={async () => { await sale.buyTokens("125000") }}>Buy tokens</button>
        }
    }
    if(saleMutables && sale){
    return (
    <div className="xs-block">
        <div className="xs-block-top">
            <div className="xs-block-top-img">
                <img src={topblockimg} alt="" />
            </div>
            <div className="xs-block-top-content">
                <span className="xs-top-block-name">{sale.immutables.tokenName}</span>
                <span className="xs-top-block-name-links">
                    <a href="#">Website</a>
                    <a href="#">Medium</a>
                    <a href="#">Twitter</a>
                    <a href="#">Telegram</a>
                </span>
            </div>
        </div>
        <div className="xs-block-content">
            <div className="xs-block-ido-status">
                <div className="ido-status-top mb30">
                    <div>IDO Status: <span>{saleMutables.status}</span></div>
                    <div>Pair: <span>ETC</span></div>
                </div>
                <div className="ido-status-desc mb30">
                    {sale.immutables.description}
                </div>
                <div className="ido-status-progress mb30">
                    <div>IDO Progress: <span>{saleMutables.hardcapCompletionPercent}%</span></div>
                    <div className="progress-wrap progress">
                        <div className="progress-bar progress"
                            style={{ width: saleMutables.hardcapCompletionPercent + '%' }}>
                        </div>
                    </div>
                </div>
                <div className="ido-status-stats">
                    <div>Swap Rate - 1 {sale.immutables.tokenSymbol} : {saleMutables.price} ETH</div>
                    <div>Pool Cap - {saleMutables.hardcap} {sale.immutables.tokenSymbol}</div>
                    <div>Participants - {saleMutables.numberOfParticipants}</div>
                    <div>Softcap - {sale.immutables.softcap} {sale.immutables.tokenSymbol}</div>
                    <div>Sale starts at {timeConverter(sale.immutables.startTimestamp)}</div>
                    <div>Sale ends at {timeConverter(sale.immutables.endTimestamp)}</div>
                    {addTokensButton()}
                    {withdrawSaleResultButton()}
                    {withdrawFundsButton()}
                    {withdrawBoughtTokensButton()}
                    {buyTokensButton()}
                </div>
            </div>
        </div>
    </div>
    )
    }else{
        return(<div>Loading

        </div>)
    }
}
export default SalePage;