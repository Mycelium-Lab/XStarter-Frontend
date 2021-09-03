import {
    SET_USER,
    SET_GLOBAL,
    SET_BALANCE,
    SET_PATH
} from '../types'

export const setUser = (user) => ({
    type: SET_USER,
    payload: { user }
})

export const setGlobal = (global) => ({
    type: SET_GLOBAL,
    payload: { global }
})

export const setBalance = (balance) => ({
    type: SET_BALANCE,
    payload: { balance }
})

export const setPath = (path) => ({
    type: SET_PATH,
    payload: { path }
})
