import Web3 from 'web3'
import saleFactoryAbi from "./Abi/SaleFactory.json"
import {Sale} from './sale'

export class SaleProvider {
    async initialize(web3) {
        if (web3) {
            this.web3 = web3
            this.saleFactory = new this.web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
        }
    }

    static async create(web3) {
        const obj = new SaleProvider()
        await obj.initialize(web3)
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

    async splitByStatus(sales) {

        const approvedPromises = sales.map(sale => sale.isApproved())
        let current = []
        let upcoming = []
        let unapproved = []
        let finished = []
        await Promise.all(sales.map(async (sale) => {
            const isApproved = await sale.isApproved()
            const currentTimestamp = await sale.getCurrentTimestamp()
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
        }))
        // const current = sales.filter(sale => sale.status === "Current")
        // const upcoming = sales.filter(sale => sale.status === "Upcoming")
        // const finished = sales.filter(sale => sale.status === "Finished")
        return [unapproved, current, upcoming, finished]
    }
}