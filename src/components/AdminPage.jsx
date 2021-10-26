import React, {useEffect, useState} from 'react';
import {SaleFactory} from "../sale/salefactory";

function AdminPage(props) {
    const { handleChange } = props;
    const [amountOfTiers, setAmountOfTiers] = useState(0);
    const [tokenName, setTokenName] = useState('');
    const [softcap, setSoftcap] = useState('');
    const [maxTierValues, setMaxTierValues] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenCreatorAddress, setTokenCreatorAddress] = useState('');
    const [saleStartDate, setSaleStartDate] = useState('');
    const [saleEndDate, setSaleEndDate] = useState('');
    const [saleFactory, setSaleFactory] = useState('');
    const [socials, setSocials] = useState({});
    const [price, setPrice] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const [stateUpdated, setStateUpdated] = useState(false)
    const [numberOfTiersInputs, setNumberOfTiersInputs] = useState(1)
    const setParams = async () => {
        const saleFactory = await SaleFactory.create()
        let amountOfTiers = await saleFactory.getAmountOfTiers()
        let newMaxTierValues = []
        for(let i = 0; i < parseInt(amountOfTiers); i++){
            newMaxTierValues.push('');
        }
        setMaxTierValues(newMaxTierValues)
        setSaleFactory(saleFactory)
        setAmountOfTiers(parseInt(amountOfTiers))

    }
    useEffect(() => {
        if(!saleFactory){
            setParams()
        }
        changeButtonState()
        setInvisibleTiersToLast()
    }, [stateUpdated])
    const createNewSale = async () => {
        setButtonActive(false)
        try {
            const description = JSON.stringify(socials)
            await saleFactory.createNewSale(
                tokenName,
                tokenAddress,
                tokenCreatorAddress,
                softcap,
                maxTierValues,
                dateToTimestamp(saleStartDate),
                dateToTimestamp(saleEndDate),
                price,
                description
            )
        } catch (err) {
            console.error(err)
            setButtonActive(true)
        }

    }
    const changeButtonState = () => {
        //console.log(tokenName, tokenAddress, tokenCreatorAddress, softcap, saleStartDate, saleEndDate, price, description
        if(tokenName!=='' && tokenAddress !=='' && tokenCreatorAddress !== '' && softcap !== '' && saleStartDate !== '' && saleEndDate !== '' && price !== ''){
            setButtonActive(true)
        }else{
            setButtonActive(false)
        }
    }
    const dateToTimestamp = (dateString) => {
        let date = new Date(dateString)
        return date.getTime()/1000;
    }
    const changeMaxTierValues = (onChangeEvent) => {
        
        const id = onChangeEvent.target.id.match(/(\d+)/)[1]
        if(id == null) return
        if (onChangeEvent.target.value === '') {
            let newMaxTierValues = [...maxTierValues]
            newMaxTierValues[parseInt(id)] = ''
            setMaxTierValues(newMaxTierValues)
            setStateUpdated(!stateUpdated)
        } else if ((/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value))) {
            let newMaxTierValues = [...maxTierValues]
            newMaxTierValues[parseInt(id)] = onChangeEvent.target.value
            setMaxTierValues(newMaxTierValues)
            setStateUpdated(!stateUpdated)
        }
    }
    const setInvisibleTiersToLast = () =>{
        if(numberOfTiersInputs < amountOfTiers){
            let newMaxTierValues = [...maxTierValues]
            for(let i = numberOfTiersInputs; i < amountOfTiers; i ++ ){
                newMaxTierValues[i] = newMaxTierValues[numberOfTiersInputs - 1]
            }
            setMaxTierValues(newMaxTierValues)
        }
    }
    const setSocialsKey = (value, key) => {
        let newSocials = socials;
        if (!socials.socials) {
            newSocials.socials = {}
        }
        if (value === '') {
            delete newSocials.socials[key]
            if(Object.keys(newSocials.socials).length === 0){
                delete newSocials.socials
            }
        } else{
            newSocials.socials[key] = value
        }
        setSocials(newSocials)
        setStateUpdated(!stateUpdated)
    }
    const handleNumberInput = (onChangeEvent, setVarFunction) => {
        if (onChangeEvent.target.value === '') {
            setVarFunction('')
            setStateUpdated(!stateUpdated)
        } else if ((/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(onChangeEvent.target.value))) {
            setVarFunction(onChangeEvent.target.value)
            setStateUpdated(!stateUpdated)
        }
    }
    const addTier = () => {
        if(numberOfTiersInputs < amountOfTiers){
            setNumberOfTiersInputs(numberOfTiersInputs + 1)
            setStateUpdated(!stateUpdated)
        }
       
    }
    const deleteTier = () => {
        if(numberOfTiersInputs > 1){
            setNumberOfTiersInputs(numberOfTiersInputs - 1)
            setStateUpdated(!stateUpdated)
        }
        
    }

    const showTierInputs = () => {
        const inputs = [];        
        for(let i = 0 ; i < numberOfTiersInputs; i ++ ){
            const deleteTierButton = i === numberOfTiersInputs - 1 && numberOfTiersInputs !== 1 ? <button className="xs-admin-delete-tier-button" onClick={()=>{deleteTier()}}>X</button> : null
            inputs.push(<div key={"max-sum-"+ (i)} className={i===0 && numberOfTiersInputs === 1 ? "xs-admin-input-block-solo" : "xs-admin-input-block"}>
            <div className="xs-admin-text">Tier {i+1}</div>
            <div className="xs-admin-tier-input">
            <input 
                type="tel" 
                id={"max-sum-"+ (i)} 
                placeholder={0.0} 
                value = {maxTierValues[i]}
                onChange={(onChangeEvent) => changeMaxTierValues(onChangeEvent)} 
            />
            {deleteTierButton}
            </div>
            </div>)
        }
        const addTierButton = amountOfTiers > 1 ? <button className="btn xs-admin-add-tier-button" disabled={numberOfTiersInputs===amountOfTiers} onClick={()=>{addTier()}}>Add tier</button> : null
        //const deleteTierButton = tierInputs && tierInputs.length > 1 ?  <button className="btn xs-admin-add-tier-button"onClick={()=>{deleteTier()}}>-</button> : null
        return <div className="xs-admin-input">
                <div className="xs-admin-text">Maximum amount of tokens per tier</div>
                <div className="xs-admin-min-sum-inputs ">
                    {inputs}
                </div>
                <div className="xs-admin-tier-action-buttons">
                {addTierButton}
                </div>
            </div>
    }
    return (
        <div className="xs-body-admin">
            <div className="xs-admin">
                <div className="xs-admin-row-blocks">
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Token name</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenName(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Token softcap</div>
                            <input type="tel" placeholder={0.0} value={softcap} onChange={(onChangeEvent)=> {
                                handleNumberInput(onChangeEvent, setSoftcap)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Price per 1 token in ETH</div>
                            <input type="tel" placeholder={'0'} value={price} onChange={(onChangeEvent)=> {
                                handleNumberInput(onChangeEvent, setPrice)
                            }}/>
                        </div>
                            
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Sale start and sale end dates</div>
                            <div className="xs-admin-sale-dates">
                                <input type="datetime-local" onChange={(onChangeEvent)=> {
                                    setSaleStartDate(onChangeEvent.target.value)
                                    setStateUpdated(!stateUpdated)
                                }}/>
                                <input type="datetime-local" onChange={(onChangeEvent)=> {
                                    setSaleEndDate(onChangeEvent.target.value)
                                    setStateUpdated(!stateUpdated)
                                }}/>
                            </div>
                        </div>
                                {showTierInputs()}
                    </div>
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Token address</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenAddress(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Token creator address</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenCreatorAddress(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>


                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Text description</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                let newSocials = socials;
                                if (onChangeEvent.target.value === '') {
                                    delete newSocials.text
                                } else{
                                    newSocials.text = onChangeEvent.target.value
                                }
                                setSocials(newSocials)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Website</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'website')
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Medium</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'medium')
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Twitter</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'twitter')
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Telegram</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'telegram')
                            }}/>
                        </div>
                    </div>
                </div>
                <button onClick={async () => {await createNewSale()}} className="btn xs-admin-button" disabled={!buttonActive}>Save</button>
            </div>

        </div>
    );
}

export default AdminPage;