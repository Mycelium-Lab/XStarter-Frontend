import React from 'react';
import logo from '../img/logo.png';

function Header(props) {
  const { handleChange } = props;
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
              <span className="xs-username">0xC26e88888888888888999999999847da</span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;