import Web3 from 'web3'
import saleFactoryAbi from "./Abi/SaleFactory.json"
import {Sale} from './sale'

export class SaleProvider {
    async initialize() {
        if (window.ethereum && ((window).ethereum.isMetaMask === true)) {
            this.web3 = new Web3(window.ethereum)
            let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            this.web3.eth.defaultAccount = accounts[0]
            this.account = accounts[0]
            this.saleFactory = new this.web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
        }
    }

    static async create() {
        const obj = new SaleProvider()
        await obj.initialize()
        return obj
    }

    async getSales() {
        const salesCreatedEvents = await this.saleFactory.getPastEvents('saleCreated', {
            fromBlock: 0,
            toBlock: 'latest'
        })
        const saleAddresses = salesCreatedEvents.map(event => event.returnValues.saleAddress)
        const saleCreationPromises = saleAddresses.map(saleAddress => Sale.create(saleAddress))
        return Promise.all(saleCreationPromises)
    }

    static splitByStatus(sales) {
        const current = sales.filter(sale => sale.status === "Current")
        const upcoming = sales.filter(sale => sale.status === "Upcoming")
        const finished = sales.filter(sale => sale.status === "Finished")
        return [current, upcoming, finished]
    }
}