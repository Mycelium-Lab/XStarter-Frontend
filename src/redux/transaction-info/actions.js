import {
    SET_TRANSACTION_INFO
} from '../types'

export const setTransactionInfo = (transactionInfo) => ({
    type: SET_TRANSACTION_INFO,
    payload: { transactionInfo }
})