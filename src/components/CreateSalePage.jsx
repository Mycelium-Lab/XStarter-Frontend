import React, {useEffect, useState} from 'react';
import {SaleFactory} from "../sale/salefactory";
import { useSelector } from 'react-redux';
import Web3 from "web3";
function CreateSalePage(props) {
    const { handleChange } = props;
    const [amountOfTiers, setAmountOfTiers] = useState(0);
    const [tokenName, setTokenName] = useState('');
    const [softcap, setSoftcap] = useState('');
    const [maxTierValues, setMaxTierValues] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [logo, setLogo] = useState('')
    const [tokenCreatorAddress, setTokenCreatorAddress] = useState('');
    const [tokenAddressError, setTokenAddressError] = useState('');
    const [tokenCreatorAddressError, setTokenCreatorAddressError] = useState(false);
    const [showPreviewLogo, setShowPreviewLogo] = useState(false)
    const [logoError, setLogoError] = useState('')
    const [saleStartDate, setSaleStartDate] = useState('');
    const [saleEndDate, setSaleEndDate] = useState('');
    const [saleFactory, setSaleFactory] = useState('');
    const [socials, setSocials] = useState({});
    const [price, setPrice] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const [stateUpdated, setStateUpdated] = useState(false)
    const [numberOfTiersInputs, setNumberOfTiersInputs] = useState(1)
    const [showTransactionPendingModal, setShowTransactionPendingModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const provider = useSelector(state => state.wallet.provider)
    const address = useSelector(state => state.wallet.address)
    const canCreateSales = useSelector(state => state.wallet.canCreateSales)
    const isLoaded = useSelector(state => state.wallet.isLoaded)
    const setParams = async () => {
        const saleFactory = await SaleFactory.create(provider, address)
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
        if (!saleFactory && isLoaded && provider && address) {
            setParams()
        }
    }, [isLoaded])
    useEffect(()=> {
        if(!canCreateSales){
            handleChange('projects')
        }
    }, [canCreateSales])
    useEffect(()=> {
        if(address && canCreateSales && saleFactory){
            saleFactory.setAccountAddress(address)
        }
    }, [address])
    useEffect(() => {
        changeButtonState()
        setInvisibleTiersToLast()
    }, [stateUpdated])
    const createNewSale = async () => {
        setButtonActive(false)
        try { 
            const socialsWithLogo = socials
            if(logo !== '' && logoError === '' && showPreviewLogo === true){
                socialsWithLogo.logo = logo
            }
            const description = JSON.stringify(socialsWithLogo)
            setShowTransactionPendingModal(true)

            await saleFactory.createNewSale(
                tokenName,
                tokenAddress.trim(),
                tokenCreatorAddress.trim(),
                softcap,
                maxTierValues,
                dateToTimestamp(saleStartDate),
                dateToTimestamp(saleEndDate),
                price,
                description
            )
            setShowTransactionPendingModal(false)
            setShowSuccessModal(true)
           
        } catch (err) {
            setShowTransactionPendingModal(false)
            setShowSuccessModal(false)
            console.error(err)
            setButtonActive(true)
        }
    }

    const changeButtonState = () => {
        //console.log(tokenName, tokenAddress, tokenCreatorAddress, softcap, saleStartDate, saleEndDate, price, description
        if(tokenName!=='' && 
        tokenAddress !=='' && 
        tokenCreatorAddress !== '' && 
        softcap !== '' && 
        saleStartDate !== '' && 
        saleEndDate !== '' && 
        price !== '' && 
        tokenAddressError === '' &&
        !tokenCreatorAddressError &&
        (logo === '' || (logo !== '' && logoError === '' && showPreviewLogo === true))){
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
            const deleteTierButton = i === numberOfTiersInputs - 1 && numberOfTiersInputs !== 1 ? <button className="xs-create-sale-delete-tier-button" onClick={()=>{deleteTier()}}>X</button> : null
            inputs.push(<div key={"max-sum-"+ (i)} className={i===0 && numberOfTiersInputs === 1 ? "xs-create-sale-input-block-solo" : "xs-create-sale-input-block"}>
            <div className="xs-create-sale-text">Tier {i+1}</div>
            <div className="xs-create-sale-tier-input">
            <input 
                type="tel" 
                id={"max-sum-"+ (i)} 
                placeholder={0.0} 
                value = {maxTierValues[i] || ''}
                onChange={(onChangeEvent) => changeMaxTierValues(onChangeEvent)} 
            />
            {deleteTierButton}
            </div>
            </div>)
        }
        const addTierButton = amountOfTiers > 1 ? <button className="btn xs-create-sale-add-tier-button" disabled={numberOfTiersInputs===amountOfTiers} onClick={()=>{addTier()}}>Add tier</button> : null
        //const deleteTierButton = tierInputs && tierInputs.length > 1 ?  <button className="btn xs-create-sale-add-tier-button"onClick={()=>{deleteTier()}}>-</button> : null
        return <div className="xs-create-sale-input">
                <div className="xs-create-sale-text">Maximum amount of tokens per tier</div>
                <div className="xs-create-sale-min-sum-inputs ">
                    {inputs}
                </div>
                <div className="xs-create-sale-tier-action-buttons">
                {addTierButton}
                </div>
            </div>
    }
    const ModalWindow = (props) => {
        if(showSuccessModal){
        return (<div className="modal">
          <div className="xs-block xs-modal-block">
              <div className='xs-modal-header-text mb20'>Success!</div>
              <div className='xs-modal-text'>A new sale has been created. It will appear on projects page when admin approves it.</div>
              <button onClick={()=>{handleChange('projects')}} className='btn xs-modal-button'>Go to projects page</button>
       </div>
      </div>)
        }
        else if(showTransactionPendingModal){
           return(<div className="modal">
          <div className="xs-block xs-modal-block">
              <div className='xs-modal-header-text mb20'>Transaction pending...</div>
              <div className='xs-modal-text'>A new sale will appear on projects page when transaction finishes and admin approves the sale.</div>
              <button onClick={()=>{handleChange('projects')}} className='btn xs-modal-button'>Go to projects page</button>
       </div>
      </div>)
            }
        else{
            return(<></>)
        }
    }
    const previewImageFunc = () => {
        if(showPreviewLogo && logo !== ''){
            return <img className='xs-create-sale-preview-img' src={logo} alt=''></img>
        }
    }
    const logoOnChangeEventHandler = async (onChangeEvent) => {
        setLogo(onChangeEvent.target.value)
        const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        setShowPreviewLogo(false)
        setLogoError('')
        if (onChangeEvent.target.value === '') {
            setShowPreviewLogo(false)
            setLogoError('')
            return
        }
        if (urlRegex.test(onChangeEvent.target.value)) {
            try {
                const isImage = await testImage(onChangeEvent.target.value, 1000)
                if (isImage) {
                    setShowPreviewLogo(true)
                    setLogoError('')
                } else {
                    setShowPreviewLogo(false)
                    setLogoError("Error: Can't load image from this URL")
                }
            } catch (err) {
                setShowPreviewLogo(false)
                setLogoError("Error: Can't load image from this URL")
            }
        } else {
            setShowPreviewLogo(false)
            setLogoError("Error: Invalid URL")
        }
        setStateUpdated(!stateUpdated)
    }
    const testImage = (url, timeoutT) => {
        return new Promise(function (resolve, reject) {
            var timeout = timeoutT || 5000;
            var timer, img = new Image();
            img.onerror = img.onabort = function () {
                clearTimeout(timer);
                reject("error");
            };
            img.onload = function () {
                clearTimeout(timer);
                resolve("success");
            };
            timer = setTimeout(function () {
                // reset .src to invalid URL so it stops previous
                // loading, but doesn't trigger new load
                img.src = "//!!!!/test.jpg";
                reject("timeout");
            }, timeout);
            img.src = url;
        });
    }
    return (<>
        <ModalWindow></ModalWindow>
        <div className="xs-body-create-sale">
            <div className="xs-create-sale">
                <div className="xs-create-sale-row-blocks">
                    <div className="xs-create-sale-block">
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Token name</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenName(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Token softcap</div>
                            <input type="tel" placeholder={0.0} value={softcap} onChange={(onChangeEvent)=> {
                                handleNumberInput(onChangeEvent, setSoftcap)
                            }}/>
                        </div>
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Price per 1 token in ETH</div>
                            <input type="tel" placeholder={'0'} value={price} onChange={(onChangeEvent)=> {
                                handleNumberInput(onChangeEvent, setPrice)
                            }}/>
                        </div>
                            
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Sale start and sale end dates</div>
                            <div className="xs-create-sale-dates">
                                <input type="datetime-local" min={new Date().toISOString().replace(/:\d+\.[\s\S]+$/, '')} onChange={(onChangeEvent)=> {
                                    const date = new Date(onChangeEvent.target.value)
                                    if(date > new Date(saleEndDate)){
                                        setSaleEndDate('')
                                    }
                                    setSaleStartDate(onChangeEvent.target.value)
                                    setStateUpdated(!stateUpdated)
                                }}/>
                                <input type="datetime-local" min={saleStartDate} value={saleEndDate} onChange={(onChangeEvent)=> {
                                    const date = new Date(onChangeEvent.target.value)
                                    if(date > new Date(saleStartDate)){
                                        setSaleEndDate(onChangeEvent.target.value)
                                        setStateUpdated(!stateUpdated)
                                    }
                                }}/>
                            </div>
                        </div>
                                {showTierInputs()}
                    </div>
                    <div className="xs-create-sale-block">
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Token address</div>
                            <input type="text" onChange={async (onChangeEvent)=> {
                                setTokenAddress(onChangeEvent.target.value)
                                if(onChangeEvent.target.value === ''){
                                    setTokenAddressError('')
                                }else if(Web3.utils.isAddress(onChangeEvent.target.value.trim().toLowerCase())){
                                    const isERC20 = await saleFactory.ckeckIfAddressERC20(onChangeEvent.target.value.trim())
                                    if(isERC20){
                                        setTokenAddressError('')
                                    } else {
                                        setTokenAddressError('Error: token address can be only ERC20 contract')
                                    }
                                    
                                } else{
                                    setTokenAddressError('Error: invalid address')
                                }
                                setStateUpdated(!stateUpdated)
                            }}/>
                            {tokenAddressError !== '' && <div className="xs-create-sale-error-text">{tokenAddressError}</div>}
                        </div>
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Token creator address</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenCreatorAddress(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                                if(onChangeEvent.target.value === '' || Web3.utils.isAddress(onChangeEvent.target.value.trim().toLowerCase())){
                                    setTokenCreatorAddressError(false)
                                }else{
                                    setTokenCreatorAddressError(true)
                                }
                            }}/>
                             {tokenCreatorAddressError && <div className="xs-create-sale-error-text">Error: Invalid address!</div>}
                        </div>


                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Text description</div>
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
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Website</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'website')
                            }}/>
                        </div>
                        <div className="xs-create-sale-input">
                        <div className="xs-create-sale-social">
                                <div className="xs-create-sale-social-text">medium.com/@</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setSocialsKey(onChangeEvent.target.value, 'medium')
                            }}/>
                            </div>
                        </div>
                        <div className="xs-create-sale-input">
                        
                            <div className="xs-create-sale-social">
                                <div className="xs-create-sale-social-text">twitter.com/</div>
                                <input type="text" onChange={(onChangeEvent)=> {
                                    setSocialsKey(onChangeEvent.target.value, 'twitter')
                                }}/>
                            </div>
                        </div>
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-social">
                                <div className="xs-create-sale-social-text">t.me/</div>
                                <input type="text" onChange={(onChangeEvent)=> {
                                    setSocialsKey(onChangeEvent.target.value, 'telegram')
                                }}/>
                            </div>
                        </div>
                        <div className="xs-create-sale-input">
                            <div className="xs-create-sale-text">Logo URL</div>
                            <input type="text" value={logo} onChange={logoOnChangeEventHandler}/>
                            {previewImageFunc()}
                            {logoError !== '' && <div className="xs-create-sale-error-text">{logoError}</div>}
                        </div>
                    </div>
                </div>
                <button onClick={async () => {await createNewSale()}} className="btn xs-create-sale-button" disabled={!buttonActive}>Save</button>
            </div>

        </div>
        </>
    );
}

export default CreateSalePage;