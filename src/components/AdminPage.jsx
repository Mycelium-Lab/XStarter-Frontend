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

    }, [])
    const createNewSale = async () => {
        const saleFactory = await SaleFactory.create()
        //saleFactory.createNewSale(tokenName, tokenAddress, tokenCreatorAddress, softcap, maxTierValues, )
    }
    const changeMaxTierValues = (onChangeEvent) => {

        if((!/^[0-9.]*$/.test(onChangeEvent.target.value.toString()))) {
        }else if(parseFloat(onChangeEvent.target.value)) {
            console.log(onChangeEvent)
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
        console.log(maxTierValues)
    }
    return (
        <div className="xs-body-admin">
            <div className="xs-admin">
                <div className="xs-admin-row-blocks">
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Название токена</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                console.log(onChangeEvent.target.value)
                                setTokenName(onChangeEvent.target.value)
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
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Максимальная сумма (eth)</div>
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
                                console.log(onChangeEvent.target.value)
                                setTokenAddress(onChangeEvent.target.value)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Адрес кошелька создателя токена</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                console.log(onChangeEvent.target.value)
                                setTokenCreatorAddress(onChangeEvent.target.value)
                            }}/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Даты начала и конца сейла</div>
                            <div className="xs-admin-sale-dates">
                                <input type="datetime-local" onChange={(onChangeEvent)=> {
                                    console.log(onChangeEvent.target.value)
                                    setSaleStartDate(onChangeEvent.target.value)
                                }}/>
                                <input type="datetime-local" onChange={(onChangeEvent)=> {
                                    console.log(onChangeEvent.target.value)
                                    setSaleEndDate(onChangeEvent.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Ссылка на информацию</div>
                            <input type="text" onChange={(onChangeEvent)=> {
                                console.log(onChangeEvent.target.value)
                                setDescription(onChangeEvent.target.value)
                            }}/>
                        </div>
                    </div>
                </div>
                <button onClick={createNewSale} className="btn xs-admin-button">Сохранить</button>
            </div>

        </div>
    );
}

export default AdminPage;