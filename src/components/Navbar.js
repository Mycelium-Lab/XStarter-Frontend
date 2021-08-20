import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ConnectToWallet } from './ConnectToWallet';
export const Navbar = () => {
    return (
      <div className={css(styles.bgnavbar)}>
        <div className={css(styles.flex1, styles.flex1_layout)}>
          <div className={css(styles.flex1_col)}>

          <div className={css(styles.group1, styles.group1_layout)}>
              {/* <div
                style={{ '--src': `url(${require('assets/9c43454c934aa0bc5c11d2277912b307.png')})` }}
                className={css(styles.background, styles.background_layout)}
              /> */}
              <Link to="/" className={css(styles.flex2, styles.flex2_layout)}>
                <div className={css(styles.flex2_col)}>
                  <div className={css(styles.group2, styles.group2_layout)}>
                    <div
                      style={{ '--src': `url(${require('assets/a3736d806df1599c78a1a26c8d97b9ae.png')})` }}
                      className={css(styles.icon, styles.icon_layout)}
                    />
                    <div
                      style={{ '--src': `url(${require('assets/8e41a73b8b8413543bded8cd8f50a194.png')})` }}
                      className={css(styles.icon, styles.icon_layout1)}
                    />
                  </div>
                </div>
                <div className={css(styles.flex2_spacer)} />
                <div
                  style={{ '--src': `url(${require('assets/957827b7d1b9c7063eac3fe4b6ab5a56.png')})` }}
                  className={css(styles.img, styles.img_layout)}
                />
              </Link>

              <div className={css(styles.flex3, styles.flex3_layout)}>
                <div className={css(styles.rect, styles.rect_layout)} />
                <div className={css(styles.rect, styles.rect_layout1)} />
                <div className={css(styles.rect, styles.rect_layout2)} />
              </div>
            </div>
          </div>
          <div className={css(styles.flex1_spacer)} />
          <div className={css(styles.flex1_col1)}>
            {/* <h3 className={css(styles.projects, styles.projects_layout)}>{'Projects'}</h3> */}
            <Link className={css(styles.staking, styles.staking_layout)} to="/Idos">Projects</Link>
          </div>
          <div className={css(styles.flex1_spacer1)} />
          <div className={css(styles.flex1_col2)}>
            <Link className={css(styles.staking, styles.staking_layout)} to="/Staking">Staking</Link>
          </div>
          <div className={css(styles.flex1_spacer2)} />
          <div className={css(styles.flex1_col3)}>
            <Link className={css(styles.trade_xs, styles.trade_xs_layout)} to="/TradingXS">Trade XS</Link>
            {/* <h3 className={css(styles.trade_xs, styles.trade_xs_layout)}>{'Trade XS'}</h3> */}
          </div>
          <div className={css(styles.flex1_spacer3)} />
          <ConnectToWallet />
          {/* <div className={css(styles.flex1_col4)}>
            <div className={css(styles.cover_group, styles.cover_group_layout)}>
              <h5 className={css(styles.highlights, styles.highlights_layout)}>{'Connect'}</h5>
            </div>
          </div> */}
        </div>
        </div>
    )
}
const styles = StyleSheet.create({
    bgnavbar: {
      backgroundColor: 'rgb(38,41,52)',
      width: '100%',
      zIndex: -1
    },
    group: {
      display: 'flex',
      backgroundColor: 'rgb(38,41,52)'
    },
    group_layout: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: 1687,
      flexGrow: 1,
      margin: 0
    },
    flex: {
      display: 'flex',
      flexDirection: 'column'
    },
    flex_layout4: {
      position: 'relative',
      overflow: 'visible',
      flexGrow: 1,
      margin: '40px 0px'
    },
    flex1: {
      display: 'flex'
    },
    flex1_layout: {
      position: 'relative',
      overflow: 'visible',
      width: 1340,
      minWidth: 1340,
      margin: '0px auto'
    },
    flex1_col: {
      display: 'flex',
      flex: '0 1 156px'
    },
    group1: {
      display: 'flex'
    },
    group1_layout: {
      position: 'relative',
      overflow: 'visible',
      height: 41,
      flexGrow: 1,
      margin: '0px 0px 1px'
    },
    background: {
      background: 'var(--src) center center / contain no-repeat'
    },
    background_layout: {
      position: 'absolute',
      height: 2048,
      bottom: -1696,
      left: -1378,
      right: -2562
    },
    flex2: {
      display: 'flex'
    },
    flex2_layout: {
      position: 'absolute',
      overflow: 'visible',
      top: 0,
      bottom: 0,
      left: 0,
      flexGrow: 1,
      right: 0
    },
    flex2_col: {
      display: 'flex',
      flex: '0 1 43.77px'
    },
    group2: {
      display: 'flex'
    },
    group2_layout: {
      position: 'relative',
      overflow: 'visible',
      height: 41,
      flexGrow: 1,
      margin: 0
    },
    icon: {
      background: 'var(--src) center center / contain no-repeat'
    },
    icon_layout: {
      position: 'absolute',
      top: 0,
      height: 39.49,
      left: 0,
      width: 39.05,
      minWidth: 39.05,
      margin: '0.76px 4.72px 0.76px 0px'
    },
    icon_layout1: {
      position: 'absolute',
      top: 0,
      height: 41,
      left: 0,
      width: 40.55,
      minWidth: 40.55,
      margin: '0px 0px 0px 3.22px'
    },
    flex2_spacer: {
      display: 'flex',
      flex: '0 1 2.36px'
    },
    img: {
      background: 'var(--src) center center / contain no-repeat'
    },
    img_layout: {
      position: 'relative',
      height: 19.01,
      width: 109.88,
      minWidth: 109.88,
      margin: '10.7px 0px 11.3px'
    },
    flex3: {
      display: 'flex',
      flexDirection: 'column'
    },
    flex3_layout: {
      position: 'absolute',
      overflow: 'visible',
      top: 10.98,
      bottom: 11.74,
      width: 11.62,
      minWidth: 11.62,
      right: 16.25
    },
    rect: {
      backgroundColor: 'rgb(0,183,131)'
    },
    rect_layout: {
      position: 'relative',
      height: 3.09,
      margin: 0
    },
    rect_layout1: {
      position: 'relative',
      height: 3.19,
      margin: '4.98px 2.76px 0px 0px'
    },
    rect_layout2: {
      position: 'relative',
      height: 3.19,
      margin: '3.84px 0px 0px'
    },
    flex1_spacer: {
      display: 'flex',
      flex: '0 1 632px'
    },
    flex1_col1: {
      display: 'flex',
      flex: '0 1 77px'
    },
    projects: {
      display: 'flex',
      justifyContent: 'center',
      font: '20px/1.2 "Inter", Helvetica, Arial, serif',
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      letterSpacing: '0px'
    },
    projects_layout: {
      position: 'relative',
      flexGrow: 1,
      margin: '18px 0px 0px'
    },
    flex1_spacer1: {
      display: 'flex',
      flex: '0 1 36px'
    },
    flex1_col2: {
      display: 'flex',
      flex: '0 1 71px'
    },
    staking: {
      display: 'flex',
      justifyContent: 'center',
      font: '20px/1.2 "Inter", Helvetica, Arial, serif',
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      letterSpacing: '0px'
    },
    staking_layout: {
      position: 'relative',
      flexGrow: 1,
      margin: '18px 0px 0px'
    },
    flex1_spacer2: {
      display: 'flex',
      flex: '0 1 35px'
    },
    flex1_col3: {
      display: 'flex',
      flex: '0 1 86px'
    },
    trade_xs: {
      display: 'flex',
      justifyContent: 'center',
      font: '20px/1.2 "Inter", Helvetica, Arial, serif',
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      letterSpacing: '0px'
    },
    trade_xs_layout: {
      position: 'relative',
      flexGrow: 1,
      margin: '18px 0px 0px'
    },
    flex1_spacer3: {
      display: 'flex',
      flex: '0 1 67px'
    },
    flex1_col4: {
      display: 'flex',
      flex: '0 1 180px'
    },
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