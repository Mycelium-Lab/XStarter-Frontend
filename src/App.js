import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Idos from 'components/Idos';
import Staking from 'components/Staking';
import TradingXS from 'components/TradingXS';

import './App.css';
import './fonts.css';

class App extends Component {
  render() {
    return (
      <Router hashType="noslash" basename={process.env.BASE_PATH}>
        <Switch>
          <Route exact path="/">
            <div>
              pxCode Screen List: <br />
              <Link to="/Idos">Idos</Link>
              <br />
              <Link to="/Staking">Staking</Link>
              <br />
              <Link to="/TradingXS">TradingXS</Link>
            </div>
          </Route>

          <Route exact path="/Idos" component={Idos} />
          <Route exact path="/Staking" component={Staking} />
          <Route exact path="/TradingXS" component={TradingXS} />
        </Switch>
      </Router>
    );
  }
}

export default App;
