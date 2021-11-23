import Web3 from 'web3'
import erc20Abi from './Abi/Erc20.json'
import saleAbi from "../sale/Abi/Sale.json"
import { toBaseUnit } from '../utils/toBaseUnit'
export class Sale {
    static async create(saleAddress, provider, address) {
        const obj = new Sale()
        await obj.initialize(saleAddress, provider, address)
        return obj
    }

    async initialize(saleAddress, provider, address) {
        if (provider && address) {
            this.web3 = new Web3(provider)
            this.web3.eth.defaultAccount = address
            this.account = address
            this.saleContract = new this.web3.eth.Contract(saleAbi, saleAddress)
            this.immutables = await this.initializeImmutables()
            this.status = await this.getStatus()
        }
    }

    async initializeImmutables() {
        const [
            tokenCreator,
            tokenName,
            tokenAddress,
            softcap,
            startTimestamp,
            endTimestamp,
            jsonDescription
        ] = await Promise.all([
            this.saleContract.methods.tokenCreator().call(),
            this.saleContract.methods.tokenName().call(),
            this.saleContract.methods.tokenAddress().call(),
            this.saleContract.methods.softcap().call(),
            this.saleContract.methods.startTimestamp().call(),
            this.saleContract.methods.endTimestamp().call(),
            this.saleContract.methods.description().call(),
        ])
        const erc20Contract = new this.web3.eth.Contract(erc20Abi, tokenAddress)
        const tokenSymbol = await erc20Contract.methods.symbol().call()
        const decimals = await erc20Contract.methods.decimals().call()
        let description = {}
        try{
            description = JSON.parse(jsonDescription)
        } catch(err){
            description = {text:jsonDescription}
        }
    
        return {
            tokenCreator,
            tokenName,
            tokenSymbol,
            tokenAddress,
            softcap: this.noDecimals(softcap, decimals),
            startTimestamp,
            endTimestamp,
            description,
            decimals
        }
    }
    setAccountAddress (accountAddress) {
        this.account = accountAddress
    }
    getSaleImmutables() {
        return this.immutables
    }

    async getHardcap() {
        const hardcap = await this.saleContract.methods.hardcap().call()
        const hardcapBN = new Web3.utils.BN(hardcap.toString())
        const ten = new Web3.utils.BN('10')
        const decimals = new Web3.utils.BN(this.immutables.decimals.toString())
        const tenPowDecimals = ten.pow(decimals)
        return hardcapBN.div(tenPowDecimals).toString()
    }
    noDecimals(value, decimals){
        const ten = new Web3.utils.BN('10')
        const decimalsBN = new Web3.utils.BN(decimals)
        const tenPowDecimals = ten.pow(decimalsBN)
        const valueBN = new Web3.utils.BN(value)
        const result = valueBN.div(tenPowDecimals)
        return result.toString()
    }

    async isApproved(){
        return this.saleContract.methods.approved().call()
    }
    async isDeclined(){
        return this.saleContract.methods.declined().call()
    }

    async getTotalTokensSold() {
        const totalTokensSold = await this.saleContract.methods.totalTokensSold().call()
        return this.noDecimals(totalTokensSold, this.immutables.decimals)
    }

    async getPriceWithDecimals() {
        return this.saleContract.methods.price().call()
    }

    async getPriceWithoutDecimals() {
        const priceWithDecimals = await this.getPriceWithDecimals()
        return Web3.utils.fromWei(priceWithDecimals).toString()
    }

    async buyTokens(eth) {
        //const ethValue = await this.calculatePriceTokenToETH(tokenAmount)
        return this.saleContract.methods.buyTokens().send({value: Web3.utils.toWei(eth.toString()), from: this.account})
    }

    async getNumberOfParticipants() {
        return this.saleContract.methods.numberOfParticipants().call()
    }

    calculatePriceETHToToken(ethAmount, price) {   
        //const price = await this.getPriceWithDecimals()
        const priceBN = new Web3.utils.BN(Web3.utils.toWei(price.toString()))
        const ethAmountToWei = Web3.utils.toWei(ethAmount.toString())
        const ethAmountBN = new Web3.utils.BN(ethAmountToWei)
        const excessAmount = ethAmountBN.mod(priceBN)
        const withoutExcessAmount = ethAmountBN.sub(excessAmount)
        const tokenAmount = withoutExcessAmount.div(priceBN)
        return {
            tokenAmount,
            excessAmount
        }
    }
    
    precisionRound(number, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    calculatePriceTokenToETH(tokenAmount, price) {
        return this.precisionRound(parseInt(tokenAmount)*parseFloat(price), 12);
    }

    async approveTokens(amount) {
        const amountWithDecimals = toBaseUnit(amount, this.immutables.decimals, Web3.utils.BN).toString()
        const erc20Contract = new this.web3.eth.Contract(erc20Abi, this.immutables.tokenAddress)
        await erc20Contract.methods.approve(this.saleContract.options.address, amountWithDecimals).send({from: this.account})
    }
    async addTokensForSale(amount) {
        const amountWithDecimals = toBaseUnit(amount, this.immutables.decimals, Web3.utils.BN).toString()
        return this.saleContract.methods.addTokensForSale(amountWithDecimals).send({from: this.account})
    }
    async isEnoughAllowance(amount){
        const tokenContract = new this.web3.eth.Contract(erc20Abi, this.immutables.tokenAddress);
        const allowance = await tokenContract.methods.allowance(this.account, this.saleContract.options.address).call();
        const amountBN = this.web3.utils.toBN(amount)
        const allowanceBN = this.web3.utils.toBN(allowance)
        return allowanceBN.gte(amountBN)
    }
    async changePrice(newPrice) {
        return this.saleContract.methods.changePrice(newPrice).send({from: this.account})
    }

    async withdrawFunds() {
        return this.saleContract.methods.withdrawFunds().send({from: this.account})
    }

    async approveSale(){
        return this.saleContract.methods.approve().send({from: this.account})
    }
    async declineSale(){
        return this.saleContract.methods.decline().send({from: this.account})
    }
    async withdrawSaleResult() {
        return this.saleContract.methods.withdrawSaleResult().send({from:this.account})
    }

    async withdrawBoughtTokens() {
        return this.saleContract.methods.withdrawBoughtTokens().send({from: this.account})
    }

    async getCurrentTimestamp() {
        const currentBlockNumber = await this.web3.eth.getBlockNumber()
        const currentBlock = await this.web3.eth.getBlock(currentBlockNumber)
        return currentBlock.timestamp
    }

    async getMutables() {
        const [
            status,
            numberOfParticipants,
            totalTokensSold,
            hardcap,
            price,
            hardcapCompletionPercent,
            approved,
            declined
        ] = await Promise.all([
            this.getStatus(),
            this.getNumberOfParticipants(),
            this.getTotalTokensSold(),
            this.getHardcap(),
            this.getPriceWithoutDecimals(),
            this.getHardcapCompletionPercent(),
            this.isApproved(),
            this.isDeclined()
        ])
        return {
            status,
            numberOfParticipants,
            totalTokensSold,
            hardcap,
            price,
            hardcapCompletionPercent,
            approved,
            declined
        }
    }

    async getStatus() {
        const currentTimestamp = await this.getCurrentTimestamp()
        if (currentTimestamp < this.immutables.startTimestamp) {
            return "Upcoming"
        } else if (currentTimestamp >= this.immutables.startTimestamp && currentTimestamp <= this.immutables.endTimestamp) {
            return "Current"
        } else {
            return "Finished"
        }
    }

    async getHardcapCompletionPercent() {
        const hardcap = await this.saleContract.methods.hardcap().call()
        const totalTokensSold = await this.saleContract.methods.totalTokensSold().call()
        const hardcapBN = new Web3.utils.BN(hardcap)
        const totalTokensSoldBN = new Web3.utils.BN(totalTokensSold)
        if (hardcap == "0" || totalTokensSold == "0") {
            return "0"
        }
        const hundred = new Web3.utils.BN(100)
        const percent = totalTokensSoldBN.mul(hundred).div(hardcapBN)
        return Math.floor(percent.toNumber()).toString()
    }
}