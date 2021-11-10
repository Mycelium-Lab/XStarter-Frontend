import {
    SET_CHAINID,
    SET_ADDRESS,
    SET_PROVIDER,
    SET_METHODS,
    SET_IS_LOADED,
    SET_IS_ADMIN,
    SET_CAN_CREATE_SALES
} from '../types'

export const setChainId = (chainId) => ({
    type: SET_CHAINID,
    payload: { chainId }
})

export const setAddress = (address) => ({
    type: SET_ADDRESS,
    payload: { address }
})

export const setProvider = (provider) => ({
    type: SET_PROVIDER,
    payload: { provider }
})

export const setMethods = (methods) => ({
    type: SET_METHODS,
    payload: { methods }
})

export const setIsLoaded = (isLoaded) => ({
    type: SET_IS_LOADED,
    payload: { isLoaded }
})

export const setIsAdmin = (isAdmin) => ({
    type: SET_IS_ADMIN,
    payload: { isAdmin }
})

export const setCanCreateSales = (canCreateSales) => ({
    type: SET_CAN_CREATE_SALES,
    payload: { canCreateSales }
})