import React from 'react';
import topblockimg from '../img/top-block-img.png';
import {useState, useEffect} from 'react';

function ProjectPageIDOs(props) {
    const {handleChange} = props;
    const [sales, setSales] = useState(null);
    const [loadedSalesAmount, setloadedSalesAmount] = useState(0);
    const [saleMutables, setSaleMutables] = useState([]);
    const setParams = async () => {
        if(props.sales) {
            setSales(props.sales)
            await loadNextSales(3, props.sales)
        }
    }
    useEffect(() => {
        if (!sales) {
            setParams()
        }

    }, [])
    const loadNextSales = async (howManySalesToLoad, sales) => {
        if(sales && loadedSalesAmount < sales.length) {
            //const lastIndex = sales.length - howManySalesToLoad >= loadedSalesAmount ? sales.length - howManySalesToLoad : sales.length
            const lastIndex = loadedSalesAmount + howManySalesToLoad > sales.length ? sales.length : loadedSalesAmount + howManySalesToLoad
            let mutables = []
            console.log(loadedSalesAmount, lastIndex)
            for (let i = loadedSalesAmount; i < lastIndex; i++) {
                mutables.push(sales[i].getMutables())
            }
            const getMutablesResult = await Promise.all(mutables)
            setloadedSalesAmount(lastIndex)
            setSaleMutables(saleMutables.concat(getMutablesResult))
        }
    }
    const loadMoreButton = () => {
        if(sales && sales.length > 3 && loadedSalesAmount < sales.length){
            return <button className="btn xs-sale-load-more-btn" onClick={async () => {await loadNextSales(3, sales)}}>Show more...</button>
        }
    }
    if (sales && saleMutables && sales.length > 0 && saleMutables.length == loadedSalesAmount) {
        let children = []
        for (let i = 0; i < loadedSalesAmount; i++) {
            children.push(
                <div key={"sale" + props.title + i} className="xs-block">
                    <div className="xs-block-top">
                        <div className="xs-block-top-img">
                            <img src={topblockimg} alt=""/>
                        </div>
                        <div className="xs-block-top-content">
                            <span onClick={()=>handleChange('sale', sales[i])} className="xs-top-block-name">{sales[i].immutables.tokenName}</span>
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
                                <div>IDO Status: <span>{saleMutables[i].status}</span></div>
                                <div>Pair: <span>ETC</span></div>
                            </div>
                            <div className="ido-status-desc mb30">
                                {sales[i].immutables.description}
                            </div>
                            <div className="ido-status-progress mb30">
                                <div>IDO Progress: <span>{saleMutables[i].hardcapCompletionPercent}%</span></div>
                                <div className="progress-wrap progress">
                                    <div className="progress-bar progress"
                                         style={{width: saleMutables[i].hardcapCompletionPercent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="ido-status-stats">
                                <div>Swap Rate - 1 {sales[i].immutables.tokenSymbol} : {saleMutables[i].price} ETH</div>
                                <div>Pool Cap - {saleMutables[i].hardcap} {sales[i].immutables.tokenSymbol}</div>
                                <div>Participants - {saleMutables[i].numberOfParticipants}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        let blocksClassName = sales.length > 1 ? "xs-blocks xs-moreblocks" : "xs-blocks"
        return (
            <div className="xs-current-ido mb100">
                <div className="xs-ido">
                    {props.title} IDOs
                </div>
                <div className={blocksClassName}>
                    {children}
                </div>
                {loadMoreButton()}
            </div>
        );
    } else
        return (
            <div className="xs-current-ido mb100">
                <div className="xs-ido">
                    {props.title} IDOs
                </div>
                <div className="xs-ido-noupcoming">
                    There is no {props.title.toLowerCase()} IDOs yet. Stay tuned
                </div>
            </div>
        )
}


export default ProjectPageIDOs;