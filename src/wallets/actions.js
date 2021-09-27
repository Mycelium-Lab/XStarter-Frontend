import { setChainId, setProvider, setAddress, setMethods, setIsLoaded } from '../redux/wallets/actions'
//import { closeModal } from '../redux/modal/actions'
import Web3 from 'web3'
import { contractMethods} from '../utils/Utils.js';
//import WalletConnectProvider from '@walletconnect/web3-provider'

const addProvider = (provider, provider_name, dispatch, address) => {
    window.web3 = new Web3(provider);
    dispatch(setProvider(provider));
    //window.web3.enable();
    let methods = new contractMethods(window.web3, address);
    dispatch(setMethods(methods));
    localStorage.setItem('caseCurrentProvider', provider_name)
}


const addProviderListeners = (provider, dispatch) => {
    provider.on("accountsChanged", (accounts) => {
        dispatch(setIsLoaded(true));
        dispatch(setAddress(accounts[0]))
    })

    provider.on("chainChanged", (chainId) => {
        let convertedChainId
        if (provider.isWalletConnect) {
            convertedChainId = parseInt(chainId).toString()
        }
        else {
            convertedChainId = parseInt(chainId, 16).toString()
        }
        dispatch(setIsLoaded(true));
        dispatch(setChainId(convertedChainId))
    })
    provider.on("disconnect", (code, reason) => {})
}

export const selectWallet = async (wallet, dispatch) => {
    switch (wallet) {
        case 'binanceWallet':
            break
        case 'metaMask':
            try {
                await window.ethereum
                  .request({ method: "net_version" })
                  .then((netId) => {
                    dispatch(setChainId(netId.toString()))
                  })

                await window.ethereum
                  .request({ method: "eth_requestAccounts" })
                  .then((response) => {
                    dispatch(setAddress(response[0]))
                    addProvider(window.ethereum, 'metaMask', dispatch, response[0])
                  })
                addProviderListeners(window.ethereum, dispatch)
                dispatch(setIsLoaded(true));
              } catch (err) {
                dispatch(setIsLoaded(true));
                dispatch(setProvider(null))
              }
              break
        /*case 'walletConnect':
            try {
                const infuraId = process.env.REACT_APP_INFURA_PROJECT_ID
                const provider = new WalletConnectProvider({
                    rpc: {
                        1: `https://mainnet.infura.io/v3/${infuraId}`,
                        3: `https://ropsten.infura.io/v3/${infuraId}`,
                        4: `https://rinkeby.infura.io/v3/${infuraId}`,
                        5: `https://goerli.infura.io/v3/${infuraId}`,
                        42: `https://kovan.infura.io/v3/${infuraId}`,
                        137: 'https://rpc-mainnet.maticvigil.com/',
                        // what we do need
                        56: 'https://bsc-dataseed.binance.org/',
                        97: 'https://data-seed-prebsc-2-s2.binance.org:8545/'
                    }
                })

                delete provider.__proto__.request;
                provider.hasOwnProperty("request") && delete provider.request;
                
                await provider.enable()

                const accounts = await window.web3.eth.getAccounts()

                addProvider(provider, 'walletConnect', dispatch, accounts[0])

                
                if (accounts) {
                    dispatch(setAddress(accounts[0]))
                }
                const chainId = await window.web3.eth.getChainId()
                if (chainId) {
                    dispatch(setChainId(chainId.toString()))
                }

                addProviderListeners(provider, dispatch)
            } catch (err) {
                dispatch(setProvider(null))
            }
            break*/
        default:
            break
    }

    //dispatch(closeModal())
}

export const logout = async (provider, dispatch) => {
    dispatch(setAddress(''))
    dispatch(setChainId(''))
    if (provider) {
      if (provider.close) {
        await provider.close()
      }
      dispatch(setProvider(null))
    }
    localStorage.removeItem('caseCurrentProvider')
}