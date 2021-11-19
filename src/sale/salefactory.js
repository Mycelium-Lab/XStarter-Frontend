import Web3 from "web3";
import saleFactoryAbi from "./Abi/SaleFactory.json";
import xStarterStakingAbi from "./Abi/XStarterStaking.json"
import erc20Abi from './Abi/Erc20.json'
import {toBaseUnit} from "../utils/toBaseUnit";
export class SaleFactory {
    static async create(provider, address) {
        const obj = new SaleFactory()
        await obj.initialize(provider, address)
        return obj
    }

    async initialize(provider, address) {
        if (provider && address) {
            this.web3 = new Web3(provider)
            this.web3.eth.defaultAccount = address
            this.account = address
            this.saleFactoryContract = new this.web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
        }
    }
    async setAccountAddress(accountAddress) {
        this.account = accountAddress
    }
    async createNewSale(tokenName, tokenAddress, tokenCreator, softcap, tiersMaxAmountValues, startTimestamp, endTimestamp, price, description){
        const erc20Contract = new this.web3.eth.Contract(erc20Abi, tokenAddress)
        const tokenDecimals = await erc20Contract.methods.decimals.call().call()
        const tiersMaxAmountValuesWithDecimals = tiersMaxAmountValues.map((value) => {
            if(value === ''){
                return '0'
            }else {
                return toBaseUnit(value, tokenDecimals, Web3.utils.BN).toString()
            }
        })
        return this.saleFactoryContract.methods.createNewSale(
            tokenName,
            tokenAddress,
            tokenCreator,
            toBaseUnit(softcap, parseInt(tokenDecimals), Web3.utils.BN).toString(),
            tiersMaxAmountValuesWithDecimals,
            startTimestamp,
            endTimestamp,
            this.web3.utils.toWei(price),
            description
        ).send({from:this.account});
    }
    async ckeckIfAddressERC20(address) {
        try{
            const erc20Contract = new this.web3.eth.Contract(erc20Abi, address)
            await erc20Contract.methods.symbol.call().call()
            return true
        }catch(err){
            return false
        }
    }
    async getAmountOfTiers() {
        const stakingContract = new this.web3.eth.Contract(xStarterStakingAbi,process.env.REACT_APP_STAKING_ADDRESS)
        return stakingContract.methods.amountOfTiers().call()
    }
    async checkCanCreateSale(address) {
        return this.saleFactoryContract.methods.saleCreators(address).call()
    }
    async setSaleCreator(address, value) {
        return this.saleFactoryContract.methods.setSaleCreator(address, value).send({from: this.account})
    }
}