import React from 'react';

function SPTableCoins(props) {
  const { handleChange } = props;
    return (            
            <div className="staking-table staking-table-coins">
              <div className="xs-block">
                <table>
                  <thead>
                    <tr>
                      <th>Number of coins</th>
                      <th>Allocation</th>
                      <th>Reposts / subscriptions to project pages</th>
                      <th>Pool size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>500</td>
                      <td>Lottery</td>
                      <td>+</td>
                      <td>0.5x min pool</td>
                    </tr>
                    <tr>
                      <td>1500</td>
                      <td>Lottery</td>
                      <td>-</td>
                      <td>Min pool</td>
                    </tr>
                    <tr>
                      <td>5000</td>
                      <td>Guaranteed</td>
                      <td>-</td>
                      <td>Min pool</td>
                    </tr>
                    <tr>
                      <td>15.000</td>
                      <td>Guaranteed</td>
                      <td>-</td>
                      <td>2x min pool</td>
                    </tr>
                    <tr>
                      <td>50.000</td>
                      <td>Guaranteed</td>
                      <td>-</td>
                      <td>4x min pool</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="staking-table-text">
                As a reward for the early community, 20% of XStarter's profit will be distributed among those
                who have staked our assets for a long-term period of 3 tiers or higher.
              </div>
            </div>
    );
}
    
export default SPTableCoins;