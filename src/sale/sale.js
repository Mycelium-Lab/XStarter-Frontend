import Web3 from 'web3'
import erc20Abi from './Abi/Erc20.json'
import saleAbi from "../sale/Abi/Sale.json"

export class Sale {
    static async create(saleAddress) {
        const obj = new Sale()
        await obj.initialize(saleAddress)
        return obj
    }

    async initialize(saleAddress) {
        if (window.ethereum && ((window).ethereum.isMetaMask === true)) {
            this.web3 = new Web3(window.ethereum)
            let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            this.web3.eth.defaultAccount = accounts[0]
            this.account = accounts[0]
            this.saleContract = new this.web3.eth.Contract(saleAbi, saleAddress)
            this.immutables = await this.initializeImmutables()
            this.status = await this.getStatus()
        }
    }

    async initializeImmutables() {
        const [
            tokenName,
            tokenAddress,
            softcap,
            startTimestamp,
            endTimestamp,
            description
        ] = await Promise.all([
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
        return {
            tokenName,
            tokenSymbol,
            tokenAddress,
            softcap,
            startTimestamp,
            endTimestamp,
            description,
            decimals
        }
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
    noDecimals(value){
        const ten = new Web3.utils.BN('10')
        const decimalsBN = new Web3.utils.BN(this.immutables.decimals)
        const tenPowDecimals = ten.pow(decimalsBN)
        const valueBN = new Web3.utils.BN(value)
        const result = valueBN.div(tenPowDecimals)
        return result.toString()
    }
    addDecimals(value) {
        const ten = new Web3.utils.BN('10')
        const decimals = new Web3.utils.BN(this.immutables.decimals.toString())
        const tenPowDecimals = ten.pow(decimals)
        const valueBN = new Web3.utils.BN(value)
        const result = valueBN.mul(tenPowDecimals)
        return result.toString()
    }

    async getTotalTokensSold() {
        return this.saleContract.methods.totalTokensSold().call()
    }

    async getPriceWithDecimals() {
        return this.saleContract.methods.price().call()
    }

    async getPriceWithoutDecimals() {
        const priceWithDecimals = await this.getPriceWithDecimals()
        return Web3.utils.fromWei(priceWithDecimals).toString()
    }

    async buyTokens(tokenAmount) {
        const ethValue = await this.calculatePriceTokenToETH(tokenAmount)
        return this.saleContract.methods.buyTokens().send({value: ethValue, from: this.account})
    }

    async getNumberOfParticipants() {
        return this.saleContract.methods.numberOfParticipants().call()
    }

    async calculatePriceETHToToken(ethAmount) {
        const price = await this.getPriceWithDecimals()
        const priceBN = new Web3.utils.BN(price)
        const ethAmountToWei = Web3.utils.toWei(ethAmount)
        const ethAmountBN = new Web3.utils.BN(ethAmountToWei)
        const excessAmount = ethAmountBN.mod(priceBN)
        const withoutExcessAmount = ethAmountBN.sub(excessAmount)
        const tokenAmount = withoutExcessAmount.div(priceBN)
        return {
            tokenAmount,
            excessAmount
        }
    }

    async calculatePriceTokenToETH(tokenAmount) {
        const price = await this.getPriceWithDecimals()
        const priceBN = new Web3.utils.BN(price)
        let ethPrice = priceBN.mul(new Web3.utils.BN(tokenAmount))
        return ethPrice.toString()
    }

    async addTokensForSale(amount) {
        const erc20Contract = new this.web3.eth.Contract(erc20Abi, this.immutables.tokenAddress)
        const amountWithDecimals = this.addDecimals(amount);
        await erc20Contract.methods.approve(this.saleContract.options.address, amountWithDecimals).send({from: this.account})
        await this.saleContract.methods.addTokensForSale(amountWithDecimals).send({from: this.account})
    }

    async changePrice(newPrice) {
        return this.saleContract.methods.changePrice(newPrice).send()
    }

    async withdrawFunds() {
        return this.saleContract.methods.withdrawFunds().send({from: this.account})
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
            hardcapCompletionPercent
        ] = await Promise.all([
            this.getStatus(),
            this.getNumberOfParticipants(),
            this.getTotalTokensSold(),
            this.getHardcap(),
            this.getPriceWithoutDecimals(),
            this.getHardcapCompletionPercent()
        ])
        return {
            status,
            numberOfParticipants,
            totalTokensSold,
            hardcap,
            price,
            hardcapCompletionPercent
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