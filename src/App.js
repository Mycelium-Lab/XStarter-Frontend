import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Idos from 'components/Idos';
import Staking from 'components/Staking';
import TradingXS from 'components/TradingXS';
import { Navbar } from 'components/Navbar';
import './App.css';
import './fonts.css';
import { StyleSheet, css } from 'aphrodite/no-important';
class App extends Component {
  render() {
    return (
      <Router hashType="noslash" basename={process.env.BASE_PATH}>
        <div style={{ '--src': `url(${require('assets/9c43454c934aa0bc5c11d2277912b307.png')})` }}
                className={css(styles.background)}>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Idos} />
            {/* <div>
              pxCode Screen List: <br />
              <Link to="/Idos">Idos</Link>
              <br />
              <Link to="/Staking">Staking</Link>
              <br />
              <Link to="/TradingXS">TradingXS</Link>
            </div> */}

          <Route exact path="/Idos" component={Idos} />
          <Route exact path="/Staking" component={Staking} />
          <Route exact path="/TradingXS" component={TradingXS} />
        </Switch>
        </div>
      </Router>
    );
  }
}
const styles = StyleSheet.create({
background: {
  background: 'var(--src) rgb(38, 41, 52)',
  minHeight: '100vh',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
},
background_layout: {

}
})
export default App;
