import Web3 from 'web3'
import saleFactoryAbi from "./Abi/SaleFactory.json"
import {Sale} from './sale'

export class SaleProvider {
    async initialize(provider, address) {
        if (provider && address) {
            this.web3 = new Web3(provider)
            this.provider = provider
            this.web3.eth.defaultAccount = address
            this.account = address
            this.saleFactory = new this.web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
        }
    }

    static async create(provider, address) {
        const obj = new SaleProvider()
        await obj.initialize(provider, address)
        return obj
    }
    setAccountAddress (accountAddress) {
        this.account = accountAddress
    }
    async getSales() {
        const salesCreatedEvents = await this.saleFactory.getPastEvents('saleCreated', {
            fromBlock: 0,
            toBlock: 'latest'
        })
        const saleCreationPromises = salesCreatedEvents.map(saleCreatedEvent => Sale.createWithEvent(this.provider, this.account, saleCreatedEvent))
        return Promise.all(saleCreationPromises)
    }

    async splitByStatus(sales) {
        let current = []
        let upcoming = []
        let unapproved = []
        let finished = []
        const latestBlock = await this.web3.eth.getBlock('latest')
        let currentTimestamp = latestBlock.timestamp
        await Promise.all(sales.map(async (sale) => {
            const isApproved = await sale.isApproved()
            const isDeclined = await sale.isDeclined()
            if(!isDeclined){
                if(!isApproved){
                    if(currentTimestamp < sale.immutables.startTimestamp){
                        unapproved.push(sale)
                    }
                }else if(sale.status === "Current"){
                    current.push(sale)
                }else if (sale.status === "Upcoming"){
                    upcoming.push(sale)
                }else if (sale.status === "Finished"){
                    finished.push(sale)
                }
            }
        }))
        return [unapproved, current, upcoming, finished]
    }
}