import React from 'react';
import logo from '../img/logo.png';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function Header(props) {
  const { handleChange } = props;
  const address = useSelector(state => state.wallet.address);
  const transactionHash = useSelector(state => state.transactionInfo.transactionInfo.hash);
  const transactionType = useSelector(state => state.transactionInfo.transactionInfo.type);

  const goToTransaction = () =>{
    const url = "https://rinkeby.etherscan.io/tx/" + transactionHash
    window.open(url)
  }
  function UserStatus(props) {
    if(!!transactionHash && !!transactionType)
    {
      if(transactionType === 'approve')
      {
        var button = <span className="xs-username" onClick={goToTransaction}>Approving...</span>
      }
      else if(transactionType === 'buyXS')
      {
        var button = <span className="xs-username" onClick={goToTransaction}>Buying XST...</span>
      }
      else if(transactionType === 'sellXS')
      {
        var button = <span className="xs-username" onClick={goToTransaction}>Selling XST...</span>
      }
      else if(transactionType === 'stakeXS')
      {
        var button = <span className="xs-username" onClick={goToTransaction}>Staking XST...</span>
      }
      else if(transactionType === 'withdrawXS')
      {
        var button = <span className="xs-username" onClick={goToTransaction}>Withdrawing XST...</span>
      }
    }
    else
    {
      var button = <span className="xs-username">{`${address.slice(0,6)}...${address.slice(-4)}`}</span>
    }
    return (
      button
    );
  }
  return (
    <div className="xs-head-wrapper">
        <div className="xs-head">
          <div className="xs-head-left">
            <img src={logo} alt="" />
          </div>
          <div className="xs-head-right">
            <nav>
              <input type="checkbox" id="nav" className="hidden" />
              <label htmlFor="nav" className="nav-open"><i /><i /><i /></label>
              <div className="nav-container">
                <ul>
                  <li><button className="nav-link" onClick={()=>handleChange('projects')}>Projects</button></li>
                  <li><button className="nav-link" onClick={()=>handleChange('staking')}>Staking</button></li>
                  <li><button className="nav-link" onClick={()=>handleChange('trade')}>Trade XS</button></li>
                </ul>
              </div>
            </nav>
            <div className="xs-user">
              <UserStatus></UserStatus>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;