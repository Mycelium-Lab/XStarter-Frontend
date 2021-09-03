import { combineReducers } from 'redux'
import walletReducer from './wallets/reducer'
import infoReducer from './info/reducer'

const reducers = combineReducers({
    wallet: walletReducer,
    info: infoReducer
})

export default reducers