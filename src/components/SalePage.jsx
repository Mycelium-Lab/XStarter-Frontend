import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function SalePage(props) {
    const { handleChange } = props;
    const [sale, setSale] = useState(null);
    const [inTokenAmount, setInTokenAmount] = useState(null)
    const [outTokenAmount, setOutTokenAmount] = useState(null)
    const [saleMutables, setSaleMutables] = useState(null);
    const address = useSelector(state => state.wallet.address);
    const isAdmin = useSelector(state => state.wallet.isAdmin);
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
    }, [address, currentChainId, isLoaded])
    useEffect(() => {
        if(address && address !== '' && sale){
            sale.setAccountAddress(address)
        }
    }, [address])
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
    const saleChangeStatusButtons = () => {
        if(!saleMutables.approved && !saleMutables.declined && isAdmin){
            return <div className="xs-create-sale-sale-status-buttons">
                <button className="btn xs-trade-action-btn" onClick={async () => { await sale.approveSale(); setSaleMutables({...saleMutables, approved: true})}}>Approve sale</button>
                <button className="btn xs-trade-action-btn" onClick={async () => { await sale.declineSale(); setSaleMutables({...saleMutables, declined: true})}}>Decline sale</button>
            </div>
        }
    }
    const AddTokens = (props) => {
        const [isEnoughAllowance,setIsEnoughAllowance] = useState(false)
        const [updateButtonState, setUpdateButtonState] = useState(false)
        const [addTokenAmount, setAddTokenAmount] = useState('')
        const [isEnoughAllowanceLoading, setIsEnoughAllowanceLoading] = useState(false)
        useEffect(() => {
            checkIsEnoughAllowance()
        }, [addTokenAmount, updateButtonState])
        const checkIsEnoughAllowance = async () => {
            if(!(addTokenAmount === '' || /^[0]+$/.test(addTokenAmount))){
                setIsEnoughAllowanceLoading(true)
                const isEnoughAllowance = await sale.isEnoughAllowance(addTokenAmount)
                if(!isEnoughAllowance) {
                    setIsEnoughAllowance(false)
                }else{
                    setIsEnoughAllowance(true)
                }
                setIsEnoughAllowanceLoading(false)
            }
        }
        const addTokens = async () => {
            if(isEnoughAllowance){
                await sale.addTokensForSale(addTokenAmount)
                const newHardcap = await sale.getHardcap()
                setSaleMutables({...saleMutables, hardcap: newHardcap})
                setAddTokenAmount('')
            }
        }
        const approveTokens = async () => {
            await sale.approveTokens(addTokenAmount)
            setUpdateButtonState(!updateButtonState)
        }
        const changeAddTokenAmount = async (onChangeEvent) => {
            if (onChangeEvent.target.value === '') {
                setAddTokenAmount('')
            } else if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value)){
                setAddTokenAmount(onChangeEvent.target.value)
            }
        }
        const addTokensButton = () => {
            if(addTokenAmount === '' || /^[0]+$/.test(addTokenAmount)){
                return <button className="btn xs-trade-action-btn">Enter an amount</button>
            } else if (isEnoughAllowanceLoading){
                return <button className="btn xs-trade-action-btn">Loading...</button>
            }
            else if(isEnoughAllowance){
                return <button className="btn xs-trade-action-btn" onClick={async () => { await addTokens() }}>Add tokens for sale</button>
            } else{
                return <button className="btn xs-trade-action-btn" onClick={async () => { await approveTokens() }}>Approve</button>
            }
        }
        return (<>
            <div className="xs-sale-add-tokens-text">Add tokens for sale:</div>
            <input onChange={async (e) => { await changeAddTokenAmount(e); }} type="tel" placeholder={0.0} value={addTokenAmount} />
            {addTokensButton()}
            </>)
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
                                if(sale.immutables.tokenCreator.toLowerCase() === address.toLowerCase()) {
                                    return <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawSaleResult() }}>Withdraw raised funds</button>
                                }
                            })()}
                        </div>
            }else{
                return <div className="xs-trade-change xs-sale-trade">
                            <div>Sale failed!</div>
                            <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawFunds() }}>Withdraw funds</button>
                            {(() => {
                                if(sale.immutables.tokenCreator.toLowerCase() === address.toLowerCase()) {
                                    return <button className="btn xs-trade-action-btn" onClick={async () => { await sale.withdrawSaleResult() }}>Withdraw unsold tokens</button>
                                }
                            })()}
                        </div>
            }
        }else if(saleMutables.status === "Upcoming"){
            if(sale.immutables.tokenCreator.toLowerCase() === address.toLowerCase()){
                return <div className="xs-trade-change xs-sale-trade">
                            <div className="xs-sale-start-text">Sale will start soon...</div>
                            
                            <AddTokens></AddTokens>
                            {saleChangeStatusButtons()}
                        </div>
            }else {
                return <div className="xs-trade-change xs-sale-trade">
                <div className="xs-sale-start-text">Sale will start soon...</div>
                {saleChangeStatusButtons()}
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
    const socialLinks = () => {
        if (sale) {
            let socialLinks = [];
            if(sale.immutables.description.socials){
                socialLinks = Object.keys(sale.immutables.description.socials).map((key) => {
                    if(key === 'website'){
                        if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(sale.immutables.description.socials[key])){
                            return <a key={key} href={sale.immutables.description.socials[key]}>Website</a>    
                        }else{
                            return <a key={key} href={'https://' + sale.immutables.description.socials[key]}>Website</a>
                        }
                    } else if (key === 'medium'){
                        return <a key={key} href={'https://medium.com/@' + sale.immutables.description.socials[key]}>Medium</a>
                    } else if (key === 'twitter'){
                        return <a key={key} href={'https://twitter.com/' + sale.immutables.description.socials[key]}>Twitter</a>
                    } else if (key === 'telegram'){
                        return <a key={key} href={'https://t.me/' + sale.immutables.description.socials[key]}>Telegram</a>
                    }
                })
            }
            return <span className="xs-top-block-name-links">
                {socialLinks}
            </span>
        }
    }
    const saleStatus = () => {
        if(saleMutables){
            if(saleMutables.approved){
                return 'APPROVED'
            } else if (saleMutables.declined){
                return 'DECLINED'
            } else {
                return 'PENDING'
            }
        }
    }
    const saleDescription = () => {
        if (sale && sale.immutables.description.text) {
            return <div>{sale.immutables.description.text}</div>
        }
    }
    if (saleMutables && sale) {
        return (
            <div className="xs-body-sale">
                
                <div className="xs-sale">
                <div className="xs-sale-go-back" onClick={()=> {handleChange("projects")}}>GO BACK TO IDOs LIST</div>
                <div className="xs-sale-block xs-sale-block-top">
                        <div className="xs-block-top-img"> 
                            <img src={sale.immutables.description.logo} alt="" />
                        </div>
                        <div className="xs-block-top-content">
                            <span onClick={() => {}} className="xs-top-block-name">{sale.immutables.tokenName}</span>
                            {socialLinks()}
                        </div>
                        <div className="xs-sale-status-block">
                            <div className="xs-sale-network-name">SOLANA</div>
                            <div className="xs-sale-status">{saleStatus()}</div>
                        </div>
                </div>
                <div className="xs-sale-block">
                    <div className="xs-sale-xblo">
                        <div className="xs-sale-block-header">ATTENTION: POOL USES BSC (BINANCE SMART CHAIN) FOR CONVENIENCE</div>
                        <div className="xs-sale-block-content">
                        This project will launch and list on the SOLANA network, but purchases will be made on BSC (Binance Smart Chain) using BNB. This is done to make things easier for our holders. 
                        <br></br>
                        After the TGE (token generation event), your tokens will be automatically dropped to the address where you hold your LIGHT or your configured alternate address.
                        </div>
                    </div>
                </div>
                <div className="xs-sale-info-blocks">
                    <div className="xs-sale-block xs-sale-info-block">
                        <div className="xs-sale-xblo">
                        <div className="xs-sale-block-header">PROJECT DESCRIPTION</div>
                        <div className="xs-sale-block-content">{sale.immutables.description.text || '-'}</div>
                        </div>
                        <div className="xs-sale-proj-descr-site-address ">
                        <div className="xs-sale-xblo">
                            <div className="xs-sale-block-header">WEBSITE</div>
                            <a className="xs-sale-block-content-orange" href="">GO TO WEBSITE</a>
                            </div>
                            <div className="xs-sale-xblo">
                            <div className="xs-sale-block-header">TOKEN ADDRESS</div>
                            <div className="xs-sale-block-content-orange">{`${sale.immutables.tokenAddress.slice(0,6)}...${sale.immutables.tokenAddress.slice(-4)}`}</div>
                            </div>
                        </div>
                    </div>
                    <div className="xs-sale-block xs-sale-info-block">
                        <div className="xs-sale-info-row">
                            <div className="xs-sale-xblo">
                                <div className="xs-sale-block-header">TOTAL RAISE / HARD CAP</div>
                                <div className="xs-sale-block-content-orange">{saleMutables.hardcap} {sale.immutables.tokenSymbol}</div>
                            </div>
                            <div className="xs-sale-xblo">
                                <div className="xs-sale-block-header">SWAP RATE</div>
                                <div className="xs-sale-block-content-orange">TBA</div>
                            </div>
                        </div>
                        <div className="xs-sale-xblo">
                            <div className="xs-sale-block-header">ROUND 1 OPENS</div>
                            <div className="xs-sale-block-content-orange">{timeConverter(sale.immutables.startTimestamp)}</div>
                        </div>
                        <div className="xs-sale-info-row">
                            <div className="xs-sale-xblo">
                                <div className="xs-sale-block-header">PARTICIPANTS</div>
                                <div className="xs-sale-block-content-orange">{saleMutables.numberOfParticipants}</div>
                            </div>
                            <div className="xs-sale-xblo">
                                <div className="xs-sale-block-header">YOU PARTICIPATED WITH</div>
                                <div className="xs-sale-block-content-orange">TODO</div>
                            </div>
                        </div>
                        <div className="xs-sale-xblo">
                            <div className="xs-sale-block-header">IDO PROGRESS: <span>{saleMutables.hardcapCompletionPercent}%</span></div>
                            <div className="progress-wrap progress">
                                    <div className="progress-bar progress"
                                        style={{ width: saleMutables.hardcapCompletionPercent + '%' }}>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="xs-sale-block xs-sale-info-block">
                        <div className="xs-sale-table-header">PROJECT INFORMATION</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>NAME</td>
                                    <td>{sale.immutables.tokenName}</td>
                                </tr>
                                <tr>
                                    <td>CHAIN</td>
                                    <td>SOLANA</td>
                                </tr>
                                <tr>
                                    <td>WEBSITE</td>
                                    <td>{"-"}</td>
                                </tr>
                                <tr>
                                    <td>SOCIALS</td>
                                    <td>{socialLinks()}</td>
                                </tr>
                                <tr>
                                    <td>WHITE PAPER</td>
                                    <td>White Paper</td>
                                </tr>
                                <tr>
                                    <td>SECURITY AUDIT REPORT</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="xs-sale-block xs-sale-info-block">
                        <div className="xs-sale-table-header">TOKEN INFORMATION</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>NAME</td>
                                    <td>{sale.immutables.tokenName}</td>
                                </tr>
                                <tr>
                                    <td>SYMBOL</td>
                                    <td>{sale.immutables.tokenSymbol}</td>
                                </tr>
                                <tr>
                                    <td>DECIMALS</td>
                                    <td>{sale.immutables.decimals}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL SUPPLY</td>
                                    <td>TODO</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                {/* <div className="xs-sale">
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
                </div> */}
            </div>
        )
    } else {
        return (<div className="xs-loading-text">Loading...</div>)
    }
}

export default SalePage;