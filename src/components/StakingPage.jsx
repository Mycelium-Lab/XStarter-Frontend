import React from 'react';
import SPStake from '../layouts/SPStake';
import SPTableCoins from '../layouts/SPTableCoins';
import SPTableProfits from '../layouts/SPTableProfits';

function StakingPage(props) {
  const { handleChange } = props;
    return (
        <div className="xs-body-staking">
          <SPStake />
{/*           
        <div className="staking-tables-wrapper">
          <span className="staking-tier-text mb40">
            To be eligible for any of the tiers you are required to stake the following:
          </span>
          <div className="staking-tables">

            <SPTableCoins />
            <SPTableProfits />            
            
          </div>
        </div>
        <button onClick={()=>handleChange('trade')} className="btn btn-go">GO to BUY XS tokens</button> */}
      </div>
    );
}
    
export default StakingPage;