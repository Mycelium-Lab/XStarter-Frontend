/**
 * This source code is exported from pxCode, you can get more document from https://www.pxcode.io
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default function TradingXS(props) {
  return (
    <div className={`trading-xs ${css(styles.group, styles.group_layout)}`}>
      <div className={css(styles.flex, styles.flex_layout)}>
        <div className={css(styles.flex1, styles.flex1_layout)}>
          <div className={css(styles.flex1_col)}>
            <div className={css(styles.group1, styles.group1_layout)}>
              <div
                style={{ '--src': `url(${require('assets/64eeb58d6a27d48f8c10806b12ba0a1a.png')})` }}
                className={css(styles.background, styles.background_layout)}
              />

              <div
                style={{ '--src': `url(${require('assets/957827b7d1b9c7063eac3fe4b6ab5a56.png')})` }}
                className={css(styles.cover_group, styles.cover_group_layout)}>
                <div className={css(styles.cover_group_spacer)} />
                <div className={css(styles.cover_group_spacer1)} />
                <div className={css(styles.rect, styles.rect_layout)} />
              </div>

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
          <div className={css(styles.flex1_spacer)} />
          <div className={css(styles.flex1_col1)}>
            <h3 className={css(styles.projects, styles.projects_layout)}>{'Projects'}</h3>
          </div>
          <div className={css(styles.flex1_spacer1)} />
          <div className={css(styles.flex1_col2)}>
            <h3 className={css(styles.staking, styles.staking_layout)}>{'Staking'}</h3>
          </div>
          <div className={css(styles.flex1_spacer2)} />
          <div className={css(styles.flex1_col3)}>
            <div className={css(styles.group2, styles.group2_layout)}>
              <h3 className={css(styles.trade_xs, styles.trade_xs_layout)}>{'Trade XS'}</h3>
              <hr className={css(styles.line, styles.line_layout)} />
            </div>
          </div>
          <div className={css(styles.flex1_spacer3)} />
          <div className={css(styles.flex1_col4)}>
            <div className={css(styles.group3, styles.group3_layout)}>
              <div className={css(styles.rect1, styles.rect1_layout)} />
              <h5 className={css(styles.highlights, styles.highlights_layout)}>{'0xC26e...47da'}</h5>
            </div>
          </div>
        </div>

        <div className={css(styles.content_box, styles.content_box_layout)}>
          <div className={css(styles.group4, styles.group4_layout)}>
            <div className={css(styles.group5, styles.group5_layout)}>
              <div
                style={{ '--src': `url(${require('assets/d7c64b3a8cb981b75a031b21fe6a9b3a.png')})` }}
                className={css(styles.icon, styles.icon_layout2)}
              />
              <div
                style={{ '--src': `url(${require('assets/8b196385b7c9736bd053b2a83ac7c450.png')})` }}
                className={css(styles.icon, styles.icon_layout3)}
              />
            </div>

            <div className={css(styles.text_body, styles.text_body_layout)}>{'Обменять'}</div>
          </div>

          <div className={css(styles.group6, styles.group6_layout)}>
            <div className={css(styles.group7, styles.group7_layout)}>
              <div className={css(styles.rect2, styles.rect2_layout)} />
              <div
                style={{ '--src': `url(${require('assets/ee148d5775961da7c3d2b35f4f38f077.png')})` }}
                className={css(styles.decorator, styles.decorator_layout)}
              />
            </div>

            <div className={css(styles.rect3, styles.rect3_layout)} />
            <div className={css(styles.text_body1, styles.text_body1_layout)}>{'Выберите токен'}</div>
            <div className={css(styles.text_body2, styles.text_body2_layout)}>{'0.0'}</div>
          </div>

          <div className={css(styles.group8, styles.group8_layout)}>
            <div className={css(styles.group9, styles.group9_layout)}>
              <div className={css(styles.rect4, styles.rect4_layout)} />
              <div
                style={{ '--src': `url(${require('assets/ee148d5775961da7c3d2b35f4f38f077.png')})` }}
                className={css(styles.decorator, styles.decorator_layout1)}
              />
            </div>

            <div className={css(styles.rect5, styles.rect5_layout)} />
            <div className={css(styles.xs, styles.xs_layout)}>{'XS'}</div>
            <div className={css(styles.text_body3, styles.text_body3_layout)}>{'0.0'}</div>
          </div>

          <div className={css(styles.group10, styles.group10_layout)}>
            <div className={css(styles.buy, styles.buy_layout)}>{'BUY'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

TradingXS.inStorybook = true;

const styles = StyleSheet.create({
  group: {
    display: 'flex',
    backgroundColor: 'rgb(38,41,52)'
  },
  group_layout: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 740,
    flexGrow: 1,
    margin: 0
  },
  flex: {
    display: 'flex',
    flexDirection: 'column'
  },
  flex_layout: {
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
    margin: '0px 0px 2px'
  },
  background: {
    background: 'var(--src) center center / contain no-repeat'
  },
  background_layout: {
    position: 'absolute',
    height: 1407,
    bottom: -1259,
    left: -730,
    right: -1928
  },
  cover_group: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--src) center center / contain no-repeat'
  },
  cover_group_layout: {
    position: 'absolute',
    overflow: 'visible',
    top: 10.7,
    bottom: 11.3,
    left: 46.12,
    flexGrow: 1,
    right: 0
  },
  cover_group_spacer: {
    display: 'flex',
    flex: '0 0 auto',
    minHeight: 3.09
  },
  cover_group_spacer1: {
    display: 'flex',
    flex: '0 0 auto',
    minHeight: 8.16
  },
  rect: {
    backgroundColor: 'rgb(0,183,131)'
  },
  rect_layout: {
    position: 'relative',
    height: 3.19,
    width: 11.62,
    minWidth: 11.62,
    margin: '4.13px 16.25px 0.44px auto'
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
    margin: '0.76px 0px'
  },
  icon_layout1: {
    position: 'absolute',
    top: 0,
    height: 41,
    left: 3.22,
    width: 40.55,
    minWidth: 40.55,
    margin: 0
  },
  flex1_spacer: {
    display: 'flex',
    flex: '0 1 629.5px'
  },
  flex1_col1: {
    display: 'flex',
    flex: '0 1 82px'
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
    margin: '18px 0px 1px'
  },
  flex1_spacer1: {
    display: 'flex',
    flex: '0 1 31px'
  },
  flex1_col2: {
    display: 'flex',
    flex: '0 1 76px'
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
    margin: '18px 0px 1px'
  },
  flex1_spacer2: {
    display: 'flex',
    flex: '0 1 30px'
  },
  flex1_col3: {
    display: 'flex',
    flex: '0 1 91px'
  },
  group2: {
    display: 'flex'
  },
  group2_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 25,
    flexGrow: 1,
    margin: '18px 0px 0px'
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
    position: 'absolute',
    top: 0,
    bottom: 1,
    left: 0,
    flexGrow: 1,
    right: 0
  },
  line: {
    backgroundColor: 'rgb(0,183,131)'
  },
  line_layout: {
    position: 'absolute',
    top: 0,
    height: 2,
    left: 3.5,
    flexGrow: 1,
    right: 3.5,
    margin: '23px 0px 0px'
  },
  flex1_spacer3: {
    display: 'flex',
    flex: '0 1 64.5px'
  },
  flex1_col4: {
    display: 'flex',
    flex: '0 1 180px'
  },
  group3: {
    display: 'flex'
  },
  group3_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 40,
    flexGrow: 1,
    margin: '1px 0px 2px'
  },
  rect1: {
    backgroundColor: 'rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  rect1_layout: {
    position: 'absolute',
    top: 0,
    height: 40,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
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
    position: 'absolute',
    top: 10,
    bottom: 11,
    left: 33,
    flexGrow: 1,
    right: 32
  },
  content_box: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(38,41,52,0.803921568627451)',
    boxShadow: '1px -1px 4px 0px rgba(243,243,243,0.25098039215686274)',
    border: '1px solid rgba(74,74,74,0.803921568627451)',
    borderRadius: '8px 8px 8px 8px'
  },
  content_box_layout: {
    position: 'relative',
    overflow: 'visible',
    width: 364,
    minWidth: 364,
    margin: '98px auto 223px'
  },
  group4: {
    display: 'flex'
  },
  group4_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 16,
    margin: '30px 30px 0px'
  },
  group5: {
    display: 'flex'
  },
  group5_layout: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    height: 15,
    width: 15,
    minWidth: 15,
    right: 0,
    margin: '1px 0px 0px'
  },
  icon_layout2: {
    position: 'absolute',
    top: 0,
    height: 5.86,
    left: 0,
    right: 0,
    width: 5.86,
    minWidth: 5.86,
    display: 'block',
    margin: '4.57px auto'
  },
  icon_layout3: {
    position: 'absolute',
    top: 0,
    height: 15,
    left: 0,
    width: 15,
    minWidth: 15,
    margin: 0
  },
  text_body: {
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  text_body_layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexGrow: 1,
    right: 0
  },
  group6: {
    display: 'flex'
  },
  group6_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 50,
    margin: '30px 30px 0px'
  },
  group7: {
    display: 'flex'
  },
  group7_layout: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    height: 30,
    left: 20,
    width: 150,
    minWidth: 150,
    margin: '10px 0px'
  },
  rect2: {
    backgroundColor: 'rgb(197,197,197)',
    borderRadius: '8px 8px 8px 8px',
    opacity: 0.10000000149011612
  },
  rect2_layout: {
    position: 'absolute',
    top: 0,
    height: 30,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  decorator: {
    background: 'var(--src) center center / contain no-repeat'
  },
  decorator_layout: {
    position: 'absolute',
    top: 0,
    height: 5,
    width: 8,
    minWidth: 8,
    right: 11,
    margin: '15px 0px 10px'
  },
  rect3: {
    border: '1px solid rgb(0,183,131)',
    borderRadius: '8px 8px 8px 8px'
  },
  rect3_layout: {
    position: 'absolute',
    top: 0,
    height: 50,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  text_body1: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  text_body1_layout: {
    position: 'absolute',
    top: 17,
    bottom: 17,
    left: 30,
    flexGrow: 1,
    right: 30
  },
  text_body2: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'right',
    letterSpacing: '0px'
  },
  text_body2_layout: {
    position: 'absolute',
    top: 17,
    bottom: 17,
    left: 15,
    flexGrow: 1,
    right: 15
  },
  group8: {
    display: 'flex'
  },
  group8_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 50,
    margin: '20px 30px 0px'
  },
  group9: {
    display: 'flex'
  },
  group9_layout: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    height: 30,
    left: 20,
    width: 62,
    minWidth: 62,
    margin: '10px 0px'
  },
  rect4: {
    backgroundColor: 'rgb(197,197,197)',
    borderRadius: '8px 8px 8px 8px',
    opacity: 0.10000000149011612
  },
  rect4_layout: {
    position: 'absolute',
    top: 0,
    height: 30,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  decorator_layout1: {
    position: 'absolute',
    top: 0,
    height: 5,
    width: 8,
    minWidth: 8,
    right: 14,
    margin: '14px 0px 11px'
  },
  rect5: {
    border: '1px solid rgb(0,183,131)',
    borderRadius: '8px 8px 8px 8px'
  },
  rect5_layout: {
    position: 'absolute',
    top: 0,
    height: 50,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  xs: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  xs_layout: {
    position: 'absolute',
    top: 17,
    bottom: 17,
    left: 30,
    flexGrow: 1,
    right: 30
  },
  text_body3: {
    display: 'flex',
    justifyContent: 'flex-end',
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'right',
    letterSpacing: '0px'
  },
  text_body3_layout: {
    position: 'absolute',
    top: 17,
    bottom: 17,
    left: 15,
    flexGrow: 1,
    right: 15
  },
  group10: {
    display: 'flex',
    backgroundColor: 'rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  group10_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 30,
    width: 130,
    minWidth: 130,
    margin: '40px auto 30px'
  },
  buy: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  buy_layout: {
    position: 'relative',
    height: 'min-content',
    width: '25.38%',
    minWidth: 'min-content',
    margin: '6px auto 0px'
  }
});
