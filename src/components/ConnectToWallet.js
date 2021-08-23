import React from 'react'
import Web3 from 'web3'
import { StyleSheet, css } from 'aphrodite/no-important';
import { useState } from 'react';
export const ConnectToWallet = () => {
    const [address, setAddress] = useState()
    let formattedAddress = address ?  (address.substring(0,6) + '..'+ address.substring(address.length - 4)) : null
    const connectToMetamask = async () => {
        if (window.ethereum && ((window ).ethereum.isMetaMask == true) && !address) {
            let web3 = new Web3(window.ethereum)
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            /*let networkType = await this.web3.eth.net.getNetworkType();
            if(networkType != 'main'){
              throw new Error('Please, switch to main network');
            }*/
            web3.eth.defaultAccount = accounts[0]
            let accountAddress = accounts[0]
            setAddress(accountAddress)
            return accountAddress
          }
    }
    return (
    <div className={css(styles.flex1_col4)}>
        <div style= {{cursor:'pointer'}} className={css(styles.cover_group, styles.cover_group_layout)} onClick = {connectToMetamask}>
          <h5 className={css(styles.highlights, styles.highlights_layout)}>{formattedAddress || 'Connect'}</h5>
        </div>
     </div>
    )
}
const styles = StyleSheet.create({
    cover_group: {
      display: 'flex',
      backgroundColor: 'rgb(255,131,76)',
      borderRadius: '8px 8px 8px 8px'
    },
    cover_group_layout: {
      position: 'relative',
      overflow: 'visible',
      minHeight: 40,
      flexGrow: 1,
      margin: '1px 0px'
    },
    highlights: {
      display: 'flex',
      justifyContent: 'center',
      font: '16px/1.2 "Inter", Helvetica, Arial, serif',
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      letterSpacing: '0px'
    },
    highlights_layout: {
      position: 'relative',
      flexGrow: 1,
      margin: '10px 34px 11px 35px'
    }
  });