import {
    SET_ADDRESS,
    SET_CHAINID,
    SET_PROVIDER,
    SET_METHODS,
} from '../types'

const initialState = {
    chainId: '',
    address: '',
    method: '',
    provider: null,
    correntChainId: process.env.NODE_ENV === 'development' ? '42' : '56'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROVIDER: {
            return {
                ...state,
                provider: action.payload.provider
            }
        }
        case SET_CHAINID:
            return {
                ...state,
                chainId: action.payload.chainId
            }
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload.address
            }
        case SET_METHODS:
            return {
                ...state,
                methods: action.payload.methods
            }
        default:
            return {
                ...state,
            }
    }
}