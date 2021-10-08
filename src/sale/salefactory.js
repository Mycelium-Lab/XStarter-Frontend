import Web3 from "web3";
import saleFactoryAbi from "./Abi/SaleFactory.json";

export class SaleFactory {
    static async create() {
        const obj = new SaleFactory()
        await obj.initialize()
        return obj
    }

    async initialize() {
        if (window.ethereum && ((window).ethereum.isMetaMask === true)) {
            this.web3 = new Web3(window.ethereum)
            let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            this.web3.eth.defaultAccount = accounts[0]
            this.account = accounts[0]
            this.saleFactoryContract = new this.web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
        }
    }
    async createNewSale(tokenName, tokenAddress, tokenCreator, softcap, tiersMaxAmountValues, startTimestamp, endTimestamp, price, description){
        return this.saleFactoryContract.methods.createNewSale(
            tokenName,
            tokenAddress,
            tokenCreator,
            softcap,
            tiersMaxAmountValues,
            startTimestamp,
            endTimestamp,
            price,
            description
        ).send({from:this.account});
    }
}