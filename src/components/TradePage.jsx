import React from 'react';
import settingsImg from '../img/settings.svg';

function TradePage(props) {
  const { handleChange } = props;
    return (
      <div className="xs-body-trade">
        <div className="xs-block">
          <div className="xs-trade-change">
            <div className="xs-trade-change-top">
              <span>Обменять</span>
              <button><img src={settingsImg} alt="" /></button>
            </div>
            <div className="xs-trade-change-input">
              <select>
                <option defaultValue value={0}>Выберите токен</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <input type="tel" placeholder={0.0} />
            </div>
            <div className="xs-trade-change-input xs-trade-change-input-xs">
              <select>
                <option defaultValue value={0}>XS</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <input type="tel" placeholder={0.0} />
            </div>
            <button className="btn xs-trade-change-btn">BUY</button>
          </div>
        </div>
      </div>
  );
}

export default TradePage;