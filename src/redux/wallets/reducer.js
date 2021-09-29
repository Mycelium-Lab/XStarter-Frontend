import {
    SET_ADDRESS,
    SET_CHAINID,
    SET_PROVIDER,
    SET_METHODS,
    SET_IS_LOADED
} from '../types'

const initialState = {
    chainId: '',
    address: '',
    method: '',
    provider: null,
    isLoaded: false,
    correntChainId: process.env.NODE_ENV === 'development' ? '4' : '4'
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
        case SET_IS_LOADED:
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        default:
            return {
                ...state,
            }
    }
}
