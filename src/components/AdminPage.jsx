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
    const [description, setDescription] = useState('');
    const [saleFactory, setSaleFactory] = useState('');
    const [price, setPrice] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const [stateUpdated, setStateUpdated] = useState(false)
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
    }, [stateUpdated])
    const createNewSale = async () => {
        setButtonActive(false)
        try {
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
        if(tokenName!=='' && tokenAddress !=='' && tokenCreatorAddress !== '' && softcap !== '' && saleStartDate !== '' && saleEndDate !== '' && price !== '' && description !== ''){
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

        if((!/^[0-9.]*$/.test(onChangeEvent.target.value.toString()))) {
        }else if(parseFloat(onChangeEvent.target.value)) {
            const id = onChangeEvent.target.id.match(/(\d+)/)
            if(id!=null){
                let newMaxTierValues = [...maxTierValues]
                newMaxTierValues[parseInt(id[1])] = onChangeEvent.target.value
                setMaxTierValues(newMaxTierValues)
            }
        }else {
            const id = onChangeEvent.target.id.match(/(\d+)/)
            if(id!=null){
                let newMaxTierValues = [...maxTierValues]
                newMaxTierValues[parseInt(id[1])] = ''
                setMaxTierValues(newMaxTierValues)
            }
        }
    }
    return (
        <div className="xs-body-admin">
            <div className="xs-admin">
                <div className="xs-admin-row-blocks">
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Название токена</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenName(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Сумма, которую необходимо собрать</div>
                            <input type="tel" placeholder={0.0} value={softcap} onChange={(onChangeEvent)=> {
                                if((!/^[0-9.]*$/.test(onChangeEvent.target.value.toString()))) {
                                }else if(parseFloat(onChangeEvent.target.value)) {
                                    setSoftcap(onChangeEvent.target.value)
                                }else{
                                    setSoftcap('');
                                }
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Цена за 1 токен</div>
                            <input type="tel" placeholder={0.0} value={price} onChange={(onChangeEvent)=> {
                                if((!/^[0-9.]*$/.test(onChangeEvent.target.value.toString()))) {
                                }else if(parseFloat(onChangeEvent.target.value)) {
                                    setPrice(onChangeEvent.target.value)
                                }else{
                                    setPrice('');
                                }
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Максимальная сумма в токенах</div>
                            <div className="xs-admin-min-sum-inputs ">
                                {(()=>{
                                    let inputs = []
                                    for(let i = 0; i < amountOfTiers; i ++){
                                        inputs.push(<input type="tel" key={"max-sum-"+i} id={"max-sum-"+i} placeholder={0.0} value={maxTierValues[i]} onChange={(onChangeEvent) => changeMaxTierValues(onChangeEvent)}/>)
                                    }
                                    return inputs
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Адрес токена</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenAddress(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Адрес кошелька создателя токена</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setTokenCreatorAddress(onChangeEvent.target.value)
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>

                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Даты начала и конца сейла</div>
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

                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Ссылка на информацию</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                setDescription(onChangeEvent.target.value )
                                setStateUpdated(!stateUpdated)
                            }}/>
                        </div>
                    </div>
                </div>
                <button onClick={async () => {await createNewSale()}} className="btn xs-admin-button" disabled={!buttonActive}>Сохранить</button>
            </div>

        </div>
    );
}

export default AdminPage;