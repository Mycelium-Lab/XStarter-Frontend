import { combineReducers } from 'redux'
import walletReducer from './wallets/reducer'
import infoReducer from './info/reducer'
import transactionInfoReducer from './transaction-info/reducer'

const reducers = combineReducers({
    wallet: walletReducer,
    info: infoReducer,
    transactionInfo: transactionInfoReducer
})

export default reducers