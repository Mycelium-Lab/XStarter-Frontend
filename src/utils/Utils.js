import {abiProxy, abiStake, abiRank} from './constants';

export { findGetParameter,commissionToStaked };


//адреса контрактов токенов
const xsToken = '0x7c6862a49fBc90b195F91F7147BB4726dCa4E028';
const stakeCase = '0xEBC3f93FCE7b4b4DC8882a92b4aa0Fe606dE17c4';


export class contractMethods {

    //конструктор класса
    constructor(web, walletAddress) {
        this.web3 = web;
        this.CASE_PRECISION = 10 ** 8;
        this.ZERO_ADDR = "0x0000000000000000000000000000000000000000";
        this.tokenContract = new this.web3.eth.Contract(abiProxy, xsToken);
        this.contractStake = new this.web3.eth.Contract(abiStake, stakeCase);
        this.walletAddress = walletAddress;
    }
    setWallet(wallet)
    {
        this.walletAddress = wallet;
    }
    toXS(val){
        var str = val.split('.')
        let result = str[0] + (str[1]!==undefined ? str[1]: "") + "0".repeat(8-(str[1]!==undefined ? str[1].length : 0))
        return result;
    }
    async sleep (milliseconds)
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    } 
    async waitTransaction (txnHash)
    {
        const expectedBlockTime = 1000; 
        let transactionReceipt = null
        while (transactionReceipt == null)
        {
            transactionReceipt = await this.web3.eth.getTransactionReceipt(txnHash);
            await this.sleep(expectedBlockTime)
        }
        return transactionReceipt
    }
    getUserBalance()
    {
        return new Promise((resolve, reject) =>{
            this.tokenContract.methods.balanceOf(this.walletAddress).call({from: this.walletAddress.toLowerCase()}, function(error, result) {
                const balance = parseInt(result) / 10**8;
                resolve(balance);
            })
        })
    }
    getUserStakedAmount()
    {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.userStakeAmount(this.walletAddress).call({from: this.walletAddress.toLowerCase()}, function(error, result){
                const amount = parseInt(result) / 10**8;
                resolve(amount);
            })

        })
    }
    getUserTier()
    {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.userTiers(this.walletAddress).call({from:this.walletAddress}, function(error, result) {
                resolve(result);
            })
        })
    }
    //метод стейкинга
    stakeXS(amount) {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.stake((this.toXS(amount)).toString()).send({from: this.walletAddress})
            .on('transactionHash', function(hash) {
                resolve(hash);
            })
            .on('error', function(error){console.log('error',error)});
        });   
    }
    //метод аппрува стейкинга
    approveStake(amount)
    {
        return new Promise((resolve, reject) => {
            this.tokenContract.methods.approve(stakeCase,(this.toXS(amount)).toString()).send({from: this.walletAddress})
            .on('transactionHash', function(hash) {
                resolve(hash);
            })
            .on('error', function(error){console.log('error',error)});
        });
    }
    async isEnoughAllowance(amount)
    {
        const newAmount = this.toXS(amount)
        const allowance = await this.tokenContract.methods.allowance(this.walletAddress, stakeCase).call();
        const num1 = this.web3.utils.toBN(allowance);
        const num2 = this.web3.utils.toBN(newAmount);
        return num1.gte(num2);
      }
    // метод для вывода вознаграждений
    withdrawXS(idx) {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.withdraw(idx).send({from: this.walletAddress})
            .on('transactionHash', function(hash) {
                resolve(hash);
            })
            .on('error', function(error){console.log('error',error)});
        });
    }
    //метод для поднятия ранга
    updateTierValues(tierValues) {
        if(this.walletAddress !== process.env.REACT_APP_ADMIN_ADDRESS)
        {
            return false;
        }
        else
        {
            return new Promise((resolve, reject) =>{
                return this.contractStake.methods.updateTierValues(tierValues).send({from: this.walletAddress})
                .on('transactionHash', function(hash) {
                    resolve(hash);
                })
                .on('error', function(error){console.log('error',error)});
    
            })
        }  
    }

    updateSpecificTierValue(tierValue, tierIndex)
    {
        if(this.walletAddress !== process.env.REACT_APP_ADMIN_ADDRESS)
        {
            return false;
        }
        else
        {
            return new Promise((resolve, reject) =>{
                return this.contractStake.methods.updateSpecificTierValue(tierValue, tierIndex).send({from: this.walletAddress})
                .on('transactionHash', function(hash) {
                    resolve(hash);
                })
                .on('error', function(error){console.log('error',error)});
            })
        }  
    }

    calculateInterestAmount(stakeIdx)
    {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.calculateInterestAmount(stakeIdx).call({from: this.walletAddress.toLowerCase()}, function(error, result) {
                resolve(result);
            });
        });
    }
    getStakeList(idx)
    {
        return new Promise((resolve, reject) => {
            this.contractStake.methods.stakeList(idx).call({from: this.walletAddress.toLowerCase()}, function(error, result) {
                resolve(result);
            });
        });
    }
    async getCurrentStakes()
    {      
        const allStakes = await this.contractStake.getPastEvents('CreateStake', {
            filter: {user: this.walletAddress},
            fromBlock: 0,
            toBlock: 'latest'
        })
        const withdrawals = await this.contractStake.getPastEvents('WithdrawReward', {
            filter: {user: this.walletAddress},
            fromBlock: 0,
            toBlock: 'latest'
        })
        let currentStakes = [];
        for(let i = 0; i < allStakes.length; ++i)
        {
            let isStaked = true;
            for(let j = 0; j < withdrawals.length; ++j)
            {
                if(allStakes[i].returnValues.idx === withdrawals[j].returnValues.idx)
                {
                    isStaked = false;
                }
            }
            if(isStaked && allStakes[i].returnValues.user.toLowerCase() === this.walletAddress.toLowerCase())
            {
                let reward = await this.calculateInterestAmount(allStakes[i].returnValues.idx);
                let info = {
                    idx: allStakes[i].returnValues.idx,
                    stakeAmount: parseInt(allStakes[i].returnValues.stakeAmount) / 10**8 ,
                    reward: reward / 10**8
                }
                currentStakes.push(info);
            }
        }
        return currentStakes;
    }
}

//функция для поиска get-параметра
function findGetParameter(parameterName) {
  var result = null,
  tmp = [];
  window.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}


//высчитывает комиссию, полученную с реферала определенного уровня
function commissionToStaked(commission, level) {
    const percents = [8, 5, 2.5, 1.5, 1.0, 1.0, 0.5, 0.5 ];
    return parseFloat(commission * (100/percents[level-1])).toFixed(2);
}