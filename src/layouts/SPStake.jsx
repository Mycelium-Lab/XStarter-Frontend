import React from 'react';

function SPStake(props) {
  const { handleChange } = props;
    return (
        <div className="staking-tier mb80">
          <span className="staking-tier-text mb40">
            We are proud to see you as part of XStarter community. Your current tier is:
          </span>
          <div className="xs-block">
            <div className="staking-tier-stats">
              <div><span>Balance:</span> <span>700.000 XS</span></div>
              <div><span>Staked:</span> <span>500.000 XS</span></div>
            </div>
            <div className="staking-tier-stats-input">
              <input type="tel" placeholder="MAX" />
            </div>
            <div className="staking-tier-stats-btns">
              <button className="btn">Stake</button>
              <button className="btn btn-wo-bg">Unstake</button>
            </div>
          </div>
        </div>
    );
}
    
export default SPStake;