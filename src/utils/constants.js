//Наименования уровней
const rankList = {
	"0":"NO RANK",
	"1":"Partner",
	"2":"Senior Partner",
	"3":"Top partner",
	"4":"VIP partner",
	"5":"Ambassador",
	"6":"Senior Ambassador",
	"7":"Regional Ambassador",
	"8":"International Ambassador"
};
//сколько надо застейкать чтобы открыть уровень рефералки
const levelCost = [0, 0, 5000, 10000, 15000, 17500, 20000, 22500, 25000];

//сколько csp нужно получить чтобы перейти на следующий уровень
const cspToLevel = [ 100, 200, 500, 1500, 5000, 10000, 50000];

/*150000 CSP*2 Regional Ambassador
50000 CSP*2 Senior Ambassador
10000 CSP +2*Ambassador
5000 CSP +2*VIP partner
1500 CSP + 2*Top partner
500 CSP + 2*Senior Partner
200 CSP + 2*Partner
100 CSP

*/

//преобразует значеня из контракта в более удобный вид (с пробелами)
const typeWithSpaces = (word) => {
  switch (word) {
            case "CreateStake":
                return "Staked";
            case "WithdrawReward":
                return "Withdrew Reward";
            default:
                return "Withdrew Stake";
        }
}

// abi контрактов
const abiProxy = [
    // balanceOf
    {
        "constant": true,
        "inputs": [{
            "name": "_owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "name": "balance",
            "type": "uint256"
        }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
];

const abiStake = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "stakeAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stakeTimeInDays",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "stake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "stakeIdx",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "stakeIdx",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const abiRank = [
	{
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "rankUp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "canRankUp",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
];

export { rankList, levelCost, cspToLevel, abiProxy, abiStake, abiRank, typeWithSpaces };





 

