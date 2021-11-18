import React from 'react';
import topblockimg from '../img/top-block-img.png';
import { useState, useEffect } from 'react';

function ProjectPageIDOs(props) {
    const { handleChange } = props;
    const [sales, setSales] = useState(null);
    const [loadedSalesAmount, setloadedSalesAmount] = useState(0);
    const [saleMutables, setSaleMutables] = useState([]);
    const setParams = async () => {
        if (props.sales) {
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
        if (sales && loadedSalesAmount < sales.length) {
            //const lastIndex = sales.length - howManySalesToLoad >= loadedSalesAmount ? sales.length - howManySalesToLoad : sales.length
            const lastIndex = loadedSalesAmount + howManySalesToLoad > sales.length ? sales.length : loadedSalesAmount + howManySalesToLoad
            let mutables = []
            for (let i = loadedSalesAmount; i < lastIndex; i++) {
                mutables.push(sales[i].getMutables())
            }
            const getMutablesResult = await Promise.all(mutables)
            setloadedSalesAmount(lastIndex)
            setSaleMutables(saleMutables.concat(getMutablesResult))
        }
    }
    const loadMoreButton = () => {
        if (sales && sales.length > 3 && loadedSalesAmount < sales.length) {
            return <button className="btn xs-sale-load-more-btn" onClick={async () => { await loadNextSales(3, sales) }}>Show more...</button>
        }
    }
    const saleDescription = (sale) => {
        if (sale && sale.immutables.description.text) {
            return <div className="ido-status-desc mb30">{sale.immutables.description.text}</div>
        }
    }
    const topImage = (sale) => {
        if(sale && sale.immutables.description.logo) {
            return <img src={sale.immutables.description.logo} alt="" />
        }else{
            return <img src={topblockimg} alt="" />
        }
    }
    const socialLinks = (sale) => {
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
    if (sales && saleMutables && sales.length > 0 && saleMutables.length == loadedSalesAmount) {
        let children = []
        for (let i = 0; i < loadedSalesAmount; i++) {
            children.push(
                <div key={"sale" + props.title + i} className="xs-block">
                    <div className="xs-block-top">
                        <div className="xs-block-top-img">
                        {topImage(sales[i])}
                        </div>
                        <div className="xs-block-top-content">
                            <span onClick={() => handleChange('sale', sales[i])} className="xs-top-block-name">{sales[i].immutables.tokenName}</span>
                            {socialLinks(sales[i])}
                        </div>
                    </div>
                    <div className="xs-block-content">
                        <div className="xs-block-ido-status">
                            <div className="ido-status-top mb30">
                                <div>IDO Status: <span>{saleMutables[i].status}</span></div>
                            </div>
                            {saleDescription(sales[i])}
                            <div className="ido-status-progress mb30">
                                <div>IDO Progress: <span>{saleMutables[i].hardcapCompletionPercent}%</span></div>
                                <div className="progress-wrap progress">
                                    <div className="progress-bar progress"
                                        style={{ width: saleMutables[i].hardcapCompletionPercent + '%' }}>
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