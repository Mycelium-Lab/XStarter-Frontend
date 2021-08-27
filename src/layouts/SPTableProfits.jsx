import React from 'react';

function SPTableProfits(props) {
    const { handleChange } = props;
      return (
      <div className="staking-table staking-table-profit">
            <div className="xs-block">
            <table>
                <thead>
                <tr>
                    <th>Holding period</th>
                    <th>Profit sharing</th>
                    <th>Total %</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1 month</td>
                    <td>First 10%</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>3 months</td>
                    <td>First 10% and subsequent 5%</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>6 months and more</td>
                    <td>First 10%, subsequent 5% and 5%</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className="staking-table-text">
            XStarter does everything possible to ensure that your assets are protected from inflation and bring impressive capital gains.
            </div>
        </div>
    );
}
    
export default SPTableProfits;