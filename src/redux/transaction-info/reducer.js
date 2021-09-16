import {
    SET_TRANSACTION_INFO
} from '../types'

const initialState = {
    transactionInfo: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TRANSACTION_INFO: {
            return {
                ...state,
                transactionInfo: action.payload.transactionInfo
            }
        }
        default:
            return {
                ...state,
            }
    }
}