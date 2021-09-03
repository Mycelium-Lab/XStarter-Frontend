import {
    SET_USER,
    SET_GLOBAL,
    SET_BALANCE,
    SET_PATH
} from '../types'

const initialState = {
    user: {},
    global: {},
    balance: 0.00,
    path: '/staking'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case SET_GLOBAL: {
            return {
                ...state,
                global: action.payload.global
            }
        }
        case SET_BALANCE: {
            return {
                ...state,
                balance: action.payload.balance
            }
        }
        case SET_PATH: {
            return {
                ...state,
                path: action.payload.path
            }
        }
        default:
            return {
                ...state,
            }
    }
}