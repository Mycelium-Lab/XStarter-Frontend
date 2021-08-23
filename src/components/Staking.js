/**
 * This source code is exported from pxCode, you can get more document from https://www.pxcode.io
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Px, commonStyles } from './posize';
import { Footer } from './Footer';

export default function Staking(props) {
  return (
    <div className={`staking ${css(styles.group, styles.group_layout)}`}>
      <div className={css(styles.flex, styles.flex_layout4)}>
        
        <h3 className={css(styles.subtitle, styles.subtitle_layout)}>
          {'We are proud to see you as part of XStarter community. Your current tier is:'}
        </h3>

        <div className={css(styles.cover_group2, styles.cover_group2_layout)}>
          <div className={css(styles.flex, styles.flex_layout)}>
            <div className={css(styles.flex3, styles.flex3_layout)}>
              <div className={css(styles.text_body, styles.text_body_layout)}>{'Balance:'}</div>
              <div className={css(styles.text_body1, styles.text_body1_layout)}>{'700.000 XS'}</div>
            </div>

            <div className={css(styles.flex4, styles.flex4_layout)}>
              <div className={css(styles.text_body, styles.text_body_layout)}>{'Staked:'}</div>
              <div className={css(styles.text_body3, styles.text_body3_layout)}>{'500.000 XS'}</div>
            </div>

            <div className={css(styles.cover_group3, styles.cover_group3_layout)}>
              {/* <div className={css(styles.background1, styles.background1_layout)} /> */}

              <div className={css(styles.foreground, styles.foreground_layout)}>
                <div className={css(styles.max, styles.max_layout)}>{'MAX'}</div>
                <div className={css(styles.foreground_spacer)} />
                <div className={css(styles.xs, styles.xs_layout)}>{'XS'}</div>
              </div>
            </div>

            <div className={css(styles.flex5, styles.flex5_layout)}>
              <div className={css(styles.flex5_col)}>
                <div className={css(styles.cover_group4, styles.cover_group4_layout)}>
                  <div className={css(styles.stake, styles.stake_layout)}>{'Stake'}</div>
                </div>
              </div>
              <div className={css(styles.flex5_col)}>
                <div className={css(styles.cover_group5, styles.cover_group5_layout)}>
                {/* <div className={css(styles.background2, styles.background2_layout)} /> */}
                  <div className={css(styles.unstake, styles.unstake_layout)}>{'Unstake'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className={css(styles.subtitle, styles.subtitle_layout1)}>
          {'To be eligible for any of the tiers you are required to stake the following:'}
        </h3>

        <div className={css(styles.flex6, styles.flex6_layout)}>
          <div className={css(styles.flex6_col)}>
            <div className={css(styles.flex7, styles.flex7_layout)}>
              <div className={css(styles.cover_group6, styles.cover_group6_layout)}>
                <div className={css(styles.flex, styles.flex_layout1)}>
                  <div className={css(styles.flex9, styles.flex9_layout)}>
                    <div className={css(styles.flex9_col)}>
                      <div className={css(styles.group2, styles.group2_layout)}>
                        <div className={css(styles.small_paragraph_body, styles.small_paragraph_body_layout)}>
                          {'Number of coins'}
                        </div>
                        <div className={css(styles.allocation, styles.allocation_layout)}>{'Allocation'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex9_col1)}>
                      <div className={css(styles.group3, styles.group3_layout)}>
                        <div className={css(styles.small_paragraph_body, styles.small_paragraph_body_layout1)}>
                          {'Reposts / subscriptions to project pages'}
                        </div>
                      </div>
                    </div>
                    <div className={css(styles.flex9_col2)}>
                      <div className={css(styles.pool_size, styles.pool_size_layout)}>{'Pool size'}</div>
                    </div>
                  </div>

                  <div className={css(styles.group4, styles.group4_layout)}>
                    <hr className={css(styles.line, styles.line_layout)} />
                  </div>

                  <div className={css(styles.flex10, styles.flex10_layout)}>
                    <div className={css(styles.small_text_body, styles.small_text_body_layout)}>{'500'}</div>
                    <div className={css(styles.flex10_col)}>
                      <div className={css(styles.flex11, styles.flex11_layout)}>
                        <div className={css(styles.flex11_spacer)} />
                        <div className={css(styles.flex11_col)}>
                          <div className={css(styles.group5, styles.group5_layout)}>
                            <div className={css(styles.lottery, styles.lottery_layout)}>{'Lottery'}</div>
                          </div>
                        </div>
                        <div className={css(styles.flex11_spacer1)} />
                        <div className={css(styles.flex11_col1)}>
                          <div className={css(styles.group6, styles.group6_layout)}>
                            <div className={css(styles.small_text_body, styles.small_text_body_layout1)}>{'+'}</div>
                          </div>
                        </div>
                        <div className={css(styles.flex11_spacer2)} />
                      </div>
                    </div>
                    <div className={css(styles.small_text_body, styles.small_text_body_layout2)}>{'0.5x min pool'}</div>
                  </div>

                  <div className={css(styles.group7, styles.group7_layout)}>
                    <hr className={css(styles.line, styles.line_layout)} />
                  </div>

                  <div className={css(styles.flex12, styles.flex12_layout)}>
                    <div className={css(styles.small_text_body, styles.small_text_body_layout)}>{'1500'}</div>
                    <div className={css(styles.flex12_col)}>
                      <div className={css(styles.group8, styles.group8_layout)}>
                        <div className={css(styles.lottery, styles.lottery_layout1)}>{'Lottery'}</div>
                      </div>
                    </div>
                    <div className={css(styles.small_text_body, styles.small_text_body_layout4)}>{'-'}</div>
                    <div className={css(styles.flex12_spacer)} />
                    <div className={css(styles.min_pool, styles.min_pool_layout)}>{'Min pool'}</div>
                  </div>

                  <div className={css(styles.group9, styles.group9_layout)}>
                    <hr className={css(styles.line, styles.line_layout)} />
                  </div>

                  <div className={css(styles.flex13, styles.flex13_layout)}>
                    <div className={css(styles.small_text_body, styles.small_text_body_layout)}>{'5000'}</div>
                    <div className={css(styles.flex13_spacer)} />
                    <div className={css(styles.guaranteed, styles.guaranteed_layout)}>{'Guaranteed'}</div>
                    <div className={css(styles.flex13_col)}>
                      <div className={css(styles.group10, styles.group10_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout6)}>{'-'}</div>
                      </div>
                    </div>
                    <div className={css(styles.min_pool, styles.min_pool_layout1)}>{'Min pool'}</div>
                  </div>

                  <div className={css(styles.group11, styles.group11_layout)}>
                    <hr className={css(styles.line, styles.line_layout)} />
                  </div>

                  <div className={css(styles.flex14, styles.flex14_layout)}>
                    <div className={css(styles.flex14_col)}>
                      <div className={css(styles.group12, styles.group12_layout)}>
                        <div className={css(styles.guaranteed, styles.guaranteed_layout1)}>{'Guaranteed'}</div>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout7)}>{'15.000'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex14_spacer)} />
                    <div className={css(styles.small_text_body, styles.small_text_body_layout8)}>{'-'}</div>
                    <div className={css(styles.flex14_spacer1)} />
                    <div className={css(styles.small_text_body, styles.small_text_body_layout9)}>{'2x min pool'}</div>
                  </div>

                  <div className={css(styles.group13, styles.group13_layout)}>
                    <hr className={css(styles.line, styles.line_layout)} />
                  </div>

                  <div className={css(styles.flex15, styles.flex15_layout)}>
                    <div className={css(styles.flex15_col)}>
                      <div className={css(styles.group14, styles.group14_layout)}>
                        <div className={css(styles.guaranteed, styles.guaranteed_layout2)}>{'Guaranteed'}</div>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout10)}>{'50.000'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex15_spacer)} />
                    <div className={css(styles.flex15_col1)}>
                      <div className={css(styles.group15, styles.group15_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout11)}>{'-'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex15_spacer1)} />
                    <div className={css(styles.small_text_body, styles.small_text_body_layout12)}>{'4x min pool'}</div>
                  </div>

                  <hr className={css(styles.line, styles.line_layout5)} />
                </div>
              </div>

              <div className={css(styles.paragraph_body, styles.paragraph_body_layout)}>
                {
                  "As a reward for the early community, 20% of XStarter's profit will be distributed among those who have staked our assets for a long-term period of 3 tiers or higher."
                }
              </div>
            </div>
          </div>
          <div className={css(styles.flex6_col1)}>
            <div className={css(styles.flex, styles.flex_layout3)}>
              <div className={css(styles.cover_group7, styles.cover_group7_layout)}>
                <div className={css(styles.flex, styles.flex_layout2)}>
                  <div className={css(styles.group16, styles.group16_layout)}>
                    <div className={css(styles.holding_period, styles.holding_period_layout)}>{'Holding period'}</div>
                    <div className={css(styles.profit_sharing, styles.profit_sharing_layout)}>{'Profit sharing'}</div>
                    <div className={css(styles.small_text_body13, styles.small_text_body13_layout)}>{'Total %'}</div>
                  </div>

                  <div className={css(styles.flex17_spacer)} />

                  <div className={css(styles.flex18, styles.flex18_layout)}>
                    <div className={css(styles.flex18_col)}>
                      <div className={css(styles.group17, styles.group17_layout)}>
                        <hr className={css(styles.line, styles.line_layout6)} />
                      </div>
                    </div>
                    <div className={css(styles.flex18_col1)}>
                      <div className={css(styles.group18, styles.group18_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout13)}>{'1 month'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex18_spacer)} />
                    <div className={css(styles.flex18_col2)}>
                      <div className={css(styles.group19, styles.group19_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout14)}>
                          {'First 10%'}
                        </div>
                      </div>
                    </div>
                    <div className={css(styles.flex18_spacer1)} />
                    <div className={css(styles.flex18_col3)}>
                      <div className={css(styles.group20, styles.group20_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout15)}>{'10'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex18_spacer2)} />
                  </div>

                  <div className={css(styles.flex17_spacer1)} />

                  <div className={css(styles.flex19, styles.flex19_layout)}>
                    <div className={css(styles.flex19_col)}>
                      <div className={css(styles.group21, styles.group21_layout)}>
                        <hr className={css(styles.line, styles.line_layout7)} />
                      </div>
                    </div>
                    <div className={css(styles.flex19_col1)}>
                      <div className={css(styles.group22, styles.group22_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout16)}>{'3 months'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex19_spacer)} />
                    <div className={css(styles.flex19_col2)}>
                      <div className={css(styles.group23, styles.group23_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout17)}>
                          {'First 10% and subsequent 5%'}
                        </div>
                      </div>
                    </div>
                    <div className={css(styles.flex19_spacer1)} />
                    <div className={css(styles.flex19_col3)}>
                      <div className={css(styles.group24, styles.group24_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout18)}>{'15'}</div>
                      </div>
                    </div>
                    <div className={css(styles.flex19_spacer2)} />
                  </div>

                  <div className={css(styles.flex17_spacer2)} />

                  <div className={css(styles.flex20, styles.flex20_layout)}>
                    <div className={css(styles.flex20_spacer)} />
                    <div className={css(styles.flex20_col)}>
                      <div className={css(styles.group25, styles.group25_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout19)}>
                          {'6 months and more'}
                        </div>
                      </div>
                    </div>
                    <div className={css(styles.flex20_spacer1)} />
                    <div className={css(styles.flex20_col1)}>
                      <div className={css(styles.group26, styles.group26_layout)}>
                        <div className={css(styles.small_text_body, styles.small_text_body_layout20)}>
                          {'First 10%, subsequent 5% and 5%'}
                        </div>
                      </div>
                    </div>
                    <div className={css(styles.flex20_spacer2)} />
                    <div className={css(styles.flex20_col2)}>
                      <div className={css(styles.group27, styles.group27_layout)}>
                        <hr className={css(styles.line, styles.line_layout8)} />
                        <div className={css(styles.small_text_body, styles.small_text_body_layout21)}>{'20'}</div>
                      </div>
                    </div>
                  </div>

                  <hr className={css(styles.line, styles.line_layout9)} />
                </div>
              </div>

              <div className={css(styles.paragraph_body, styles.paragraph_body_layout)}>
                {
                  'XStarter does everything possible to ensure that your assets are protected from inflation and bring impressive capital gains.'
                }
              </div>
            </div>
          </div>
        </div>

        <div className={css(styles.cover_group8, styles.cover_group8_layout)}>
          <div className={css(styles.text_body4, styles.text_body4_layout)}>{'GO to BUY XS tokens'}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

Staking.inStorybook = true;

const styles = StyleSheet.create({
  group: {
    display: 'flex'
  },
  group_layout: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 1270,
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
    margin: '40px 47.5px'
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
    bottom: -1764,
    left: -1378,
    right: -2562
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
    margin: '18px 0px 0px'
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
    margin: '18px 0px 0px'
  },
  flex1_spacer2: {
    display: 'flex',
    flex: '0 1 30px'
  },
  flex1_col3: {
    display: 'flex',
    flex: '0 1 91px'
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
    flex: '0 1 64.5px'
  },
  flex1_col4: {
    display: 'flex',
    flex: '0 1 180px'
  },
  cover_group1: {
    display: 'flex',
    backgroundColor: 'rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group1_layout: {
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
    margin: '10px 32px 11px 33px'
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'center',
    font: '20px/1.2999999523162842 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px',
    margin: 0
  },
  subtitle_layout: {
    position: 'relative',
    width: 397,
    minWidth: 397,
    margin: '99px auto 0px'
  },
  cover_group2: {
    display: 'flex',
    backgroundColor: 'rgba(38,41,52,0.803921568627451)',
    boxShadow: '1px -1px 4px 0px rgba(243,243,243,0.25098039215686274)',
    border: '1px solid rgba(74,74,74,0.803921568627451)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group2_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 230,
    width: 364,
    minWidth: 364,
    margin: '40px auto 0px'
  },
  flex_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '28px 0px'
  },
  flex3: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex3_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '2px 30px 0px'
  },
  text_body: {
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  text_body_layout: {
    position: 'relative',
    margin: 0
  },
  text_body1: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  text_body1_layout: {
    position: 'relative',
    margin: 0
  },
  flex4: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex4_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '20px 30px 0px'
  },
  text_body3: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  text_body3_layout: {
    position: 'relative',
    margin: 0
  },
  cover_group3: {
    display: 'flex'
  },
  cover_group3_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 40,
    margin: '30px 30px 0px'
  },
  background1: {
    border: '1px solid rgb(0,183,131)',
    borderRadius: '8px 8px 8px 8px'
  },
  background1_layout: {
    position: 'absolute',
    zIndex: -1000,
    top: 0,
    height: 40,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  foreground: {
    display: 'flex'
  },
  foreground_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '12px 16px 12px 20px'
  },
  max: {
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  max_layout: {
    position: 'relative',
    margin: 0
  },
  foreground_spacer: {
    display: 'flex',
    flex: '0 1 211px'
  },
  xs: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  xs_layout: {
    position: 'relative',
    margin: 0
  },
  flex5: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex5_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '20px 72px 0px'
  },
  flex5_col: {
    display: 'flex',
    flex: '0 1 100px'
  },
  cover_group4: {
    display: 'flex',
    backgroundColor: 'rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group4_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 30,
    flexGrow: 1,
    margin: 0
  },
  stake: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  stake_layout: {
    position: 'relative',
    width: 41,
    minWidth: 41,
    margin: '6px auto 8px'
  },
  cover_group5: {
    display: 'flex'
  },
  cover_group5_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 30,
    flexGrow: 1,
    margin: 0
  },
  background2: {
    border: '1px solid rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  background2_layout: {
    position: 'absolute',
    top: 0,
    height: 30,
    left: 0,
    flexGrow: 1,
    right: 0,
    margin: 0
  },
  unstake: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  unstake_layout: {
    position: 'relative',
    flexGrow: 1,
    margin: '6px 20.5px 8px 21.5px'
  },
  subtitle_layout1: {
    position: 'relative',
    width: 397,
    minWidth: 397,
    margin: '80px auto 0px'
  },
  flex6: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flex6_layout: {
    position: 'relative',
    overflow: 'visible',
    width: 1068,
    minWidth: 1068,
    margin: '40px auto 0px'
  },
  flex6_col: {
    display: 'flex',
    flex: '0 1 502px'
  },
  flex7: {
    display: 'flex',
    flexDirection: 'column'
  },
  flex7_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: 0
  },
  cover_group6: {
    display: 'flex',
    backgroundColor: 'rgba(38,41,53,0.7019607843137254)',
    boxShadow: '1px 1px 4px 0px rgba(243,243,243,0.25098039215686274)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group6_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 268,
    margin: '0px 8px 0px 0px'
  },
  flex_layout1: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '29.5px 30px'
  },
  flex9: {
    display: 'flex'
  },
  flex9_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '0.5px 36px 8.5px 120.5px'
  },
  flex9_col: {
    display: 'flex',
    flex: '0 1 40px'
  },
  group2: {
    display: 'flex'
  },
  group2_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 9,
    flexGrow: 1,
    margin: 0
  },
  small_paragraph_body: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px',
    margin: 0
  },
  small_paragraph_body_layout: {
    position: 'absolute',
    height: 18,
    bottom: -9,
    left: -99.5,
    width: 36
  },
  allocation: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  allocation_layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexGrow: 1,
    right: 0
  },
  flex9_col1: {
    display: 'flex',
    flex: '0 1 201.5px'
  },
  group3: {
    display: 'flex'
  },
  group3_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 9,
    flexGrow: 1,
    margin: 0
  },
  small_paragraph_body_layout1: {
    position: 'absolute',
    height: 18,
    bottom: -9,
    width: 97,
    left: 0,
    right: 0,
    margin: '0px auto'
  },
  flex9_col2: {
    display: 'flex',
    flex: '0 1 36px'
  },
  pool_size: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  pool_size_layout: {
    position: 'relative',
    flexGrow: 1,
    margin: 0
  },
  group4: {
    display: 'flex'
  },
  group4_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 10.5,
    margin: 0
  },
  line: {
    backgroundColor: 'rgb(255,255,255)',
    opacity: 0.20000000298023224
  },
  line_layout: {
    position: 'absolute',
    height: 1,
    bottom: -0.5,
    left: 0,
    right: 0
  },
  flex10: {
    display: 'flex'
  },
  flex10_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '10px 20px 8.5px 29px'
  },
  small_text_body: {
    font: '10px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  small_text_body_layout: {
    position: 'relative',
    margin: '0px 0px 1px'
  },
  flex10_col: {
    display: 'flex',
    flex: '0 1 297px'
  },
  flex11: {
    display: 'flex'
  },
  flex11_layout: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: 0
  },
  flex11_spacer: {
    display: 'flex',
    flex: '0 1 72px'
  },
  flex11_col: {
    display: 'flex',
    flex: '0 1 37px'
  },
  group5: {
    display: 'flex'
  },
  group5_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 13,
    flexGrow: 1,
    margin: 0
  },
  lottery: {
    font: '10px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  lottery_layout: {
    position: 'absolute',
    height: 12,
    bottom: -9,
    left: 0,
    right: 0
  },
  flex11_spacer1: {
    display: 'flex',
    flex: '0 1 95px'
  },
  flex11_col1: {
    display: 'flex',
    flex: '0 1 9px'
  },
  group6: {
    display: 'flex'
  },
  group6_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 13,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout1: {
    position: 'absolute',
    height: 12,
    bottom: -9,
    left: 0,
    right: -1
  },
  flex11_spacer2: {
    display: 'flex',
    flex: '0 1 84px'
  },
  small_text_body_layout2: {
    position: 'relative',
    margin: '1px 0px 0px'
  },
  group7: {
    display: 'flex'
  },
  group7_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 4.5,
    margin: 0
  },
  flex12: {
    display: 'flex'
  },
  flex12_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '11px 27px 4.5px'
  },
  flex12_col: {
    display: 'flex',
    flex: '0 1 203px'
  },
  group8: {
    display: 'flex'
  },
  group8_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 13,
    flexGrow: 1,
    margin: 0
  },
  lottery_layout1: {
    position: 'absolute',
    height: 12,
    bottom: -5,
    left: 70,
    width: 37
  },
  small_text_body_layout4: {
    position: 'relative',
    margin: '1px 0px 0px'
  },
  flex12_spacer: {
    display: 'flex',
    flex: '0 1 96px'
  },
  min_pool: {
    font: '10px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  min_pool_layout: {
    position: 'relative',
    margin: '1px 0px 0px'
  },
  group9: {
    display: 'flex'
  },
  group9_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 7.5,
    margin: 0
  },
  flex13: {
    display: 'flex'
  },
  flex13_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '12px 26px 0.5px'
  },
  flex13_spacer: {
    display: 'flex',
    flex: '0 1 59px'
  },
  guaranteed: {
    font: '10px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px'
  },
  guaranteed_layout: {
    position: 'relative',
    margin: '1px 0px 0px'
  },
  flex13_col: {
    display: 'flex',
    flex: '0 1 188px'
  },
  group10: {
    display: 'flex'
  },
  group10_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 13,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout6: {
    position: 'absolute',
    top: 2,
    height: 12,
    left: 84,
    width: 8
  },
  min_pool_layout1: {
    position: 'relative',
    margin: '0px 0px 1px'
  },
  group11: {
    display: 'flex'
  },
  group11_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 10.5,
    margin: 0
  },
  flex14: {
    display: 'flex'
  },
  flex14_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '8px 24px 4.5px 113px'
  },
  flex14_col: {
    display: 'flex',
    flex: '0 1 59px'
  },
  group12: {
    display: 'flex'
  },
  group12_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 12,
    flexGrow: 1,
    margin: '3px 0px 0px'
  },
  guaranteed_layout1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexGrow: 1,
    right: 0
  },
  small_text_body_layout7: {
    position: 'absolute',
    height: 12,
    bottom: -5,
    left: -90,
    width: 35
  },
  flex14_spacer: {
    display: 'flex',
    flex: '0 1 84px'
  },
  small_text_body_layout8: {
    position: 'relative',
    margin: '0px 0px 3px'
  },
  flex14_spacer1: {
    display: 'flex',
    flex: '0 1 89px'
  },
  small_text_body_layout9: {
    position: 'relative',
    margin: '1px 0px 2px'
  },
  group13: {
    display: 'flex'
  },
  group13_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 8.5,
    margin: 0
  },
  flex15: {
    display: 'flex'
  },
  flex15_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: '8px 23px 0.5px 113px'
  },
  flex15_col: {
    display: 'flex',
    flex: '0 1 56px'
  },
  group14: {
    display: 'flex'
  },
  group14_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 16,
    flexGrow: 1,
    margin: 0
  },
  guaranteed_layout2: {
    position: 'absolute',
    top: 1,
    height: 12,
    left: 0,
    right: -3
  },
  small_text_body_layout10: {
    position: 'absolute',
    top: 5,
    height: 12,
    left: -91,
    width: 36
  },
  flex15_spacer: {
    display: 'flex',
    flex: '0 1 87px'
  },
  flex15_col1: {
    display: 'flex',
    flex: '0 1 4.1px'
  },
  group15: {
    display: 'flex'
  },
  group15_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 16,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout11: {
    position: 'absolute',
    top: 4,
    height: 12,
    left: 0,
    right: -3.9
  },
  flex15_spacer1: {
    display: 'flex',
    flex: '0 1 92.9px'
  },
  small_text_body_layout12: {
    position: 'relative',
    margin: '0px 0px 4px'
  },
  line_layout5: {
    position: 'relative',
    height: 1,
    margin: '11px 0px 0px'
  },
  paragraph_body: {
    font: '14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    letterSpacing: '0px',
    margin: 0
  },
  paragraph_body_layout: {
    position: 'relative',
    margin: '20px 0px 0px'
  },
  flex6_col1: {
    display: 'flex',
    flex: '0 1 494px'
  },
  flex_layout3: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '0px 68px 20px 0px'
  },
  cover_group7: {
    display: 'flex',
    backgroundColor: 'rgba(38,41,53,0.7019607843137254)',
    boxShadow: '1px 1px 4px 0px rgba(243,243,243,0.25098039215686274)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group7_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 196,
    margin: '0px 8px 0px 0px'
  },
  flex_layout2: {
    position: 'relative',
    overflow: 'visible',
    flexGrow: 1,
    margin: '29.5px 30px'
  },
  group16: {
    display: 'flex'
  },
  group16_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 9,
    width: 30,
    minWidth: 30,
    margin: '0.5px 3.5px 8.5px auto'
  },
  holding_period: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px',
    margin: 0
  },
  holding_period_layout: {
    position: 'absolute',
    height: 18,
    bottom: -9,
    left: -285.5,
    width: 36
  },
  profit_sharing: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px',
    margin: 0
  },
  profit_sharing_layout: {
    position: 'absolute',
    height: 18,
    bottom: -9,
    left: -125.5,
    width: 47
  },
  small_text_body13: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 8px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  small_text_body13_layout: {
    position: 'relative',
    flexGrow: 1,
    margin: 0
  },
  flex17_spacer: {
    display: 'flex',
    flex: '0 0 auto',
    minHeight: 10.5
  },
  flex18: {
    display: 'flex'
  },
  flex18_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: 0
  },
  flex18_col: {
    display: 'flex',
    flex: '0 1 38px'
  },
  group17: {
    display: 'flex'
  },
  group17_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 21.5,
    flexGrow: 1,
    margin: 0
  },
  line_layout6: {
    position: 'absolute',
    top: -0.5,
    height: 1,
    left: 0,
    right: -320
  },
  flex18_col1: {
    display: 'flex',
    flex: '0 1 41px'
  },
  group18: {
    display: 'flex'
  },
  group18_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 21.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout13: {
    position: 'absolute',
    top: 10,
    height: 12,
    left: 0,
    right: 0
  },
  flex18_spacer: {
    display: 'flex',
    flex: '0 1 122px'
  },
  flex18_col2: {
    display: 'flex',
    flex: '0 1 46px'
  },
  group19: {
    display: 'flex'
  },
  group19_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 21.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout14: {
    position: 'absolute',
    top: 10,
    height: 12,
    left: 0,
    right: 0
  },
  flex18_spacer1: {
    display: 'flex',
    flex: '0 1 88px'
  },
  flex18_col3: {
    display: 'flex',
    flex: '0 1 14px'
  },
  group20: {
    display: 'flex'
  },
  group20_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 21.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout15: {
    position: 'absolute',
    top: 10,
    height: 12,
    left: 0,
    right: 0
  },
  flex18_spacer2: {
    display: 'flex',
    flex: '0 1 9px'
  },
  flex17_spacer1: {
    display: 'flex',
    flex: '0 0 auto',
    minHeight: 14.5
  },
  flex19: {
    display: 'flex'
  },
  flex19_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: 0
  },
  flex19_col: {
    display: 'flex',
    flex: '0 1 35px'
  },
  group21: {
    display: 'flex'
  },
  group21_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 23.5,
    flexGrow: 1,
    margin: 0
  },
  line_layout7: {
    position: 'absolute',
    top: -0.5,
    height: 1,
    left: 0,
    right: -323
  },
  flex19_col1: {
    display: 'flex',
    flex: '0 1 48px'
  },
  group22: {
    display: 'flex'
  },
  group22_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 23.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout16: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    right: 0
  },
  flex19_spacer: {
    display: 'flex',
    flex: '0 1 70px'
  },
  flex19_col2: {
    display: 'flex',
    flex: '0 1 141px'
  },
  group23: {
    display: 'flex'
  },
  group23_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 23.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout17: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    right: -1
  },
  flex19_spacer1: {
    display: 'flex',
    flex: '0 1 40px'
  },
  flex19_col3: {
    display: 'flex',
    flex: '0 1 14px'
  },
  group24: {
    display: 'flex'
  },
  group24_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 23.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout18: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    right: 0
  },
  flex19_spacer2: {
    display: 'flex',
    flex: '0 1 10px'
  },
  flex17_spacer2: {
    display: 'flex',
    flex: '0 0 auto',
    minHeight: 12.5
  },
  flex20: {
    display: 'flex'
  },
  flex20_layout: {
    position: 'relative',
    overflow: 'visible',
    margin: 0
  },
  flex20_spacer: {
    display: 'flex',
    flex: '0 1 12px'
  },
  flex20_col: {
    display: 'flex',
    flex: '0 1 95px'
  },
  group25: {
    display: 'flex'
  },
  group25_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 22.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout19: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    right: 0
  },
  flex20_spacer1: {
    display: 'flex',
    flex: '0 1 36px'
  },
  flex20_col1: {
    display: 'flex',
    flex: '0 1 160px'
  },
  group26: {
    display: 'flex'
  },
  group26_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 22.5,
    flexGrow: 1,
    margin: 0
  },
  small_text_body_layout20: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    right: -1
  },
  flex20_spacer2: {
    display: 'flex',
    flex: '0 1 30px'
  },
  flex20_col2: {
    display: 'flex',
    flex: '0 1 25px'
  },
  group27: {
    display: 'flex'
  },
  group27_layout: {
    position: 'relative',
    overflow: 'visible',
    height: 22.5,
    flexGrow: 1,
    margin: 0
  },
  line_layout8: {
    position: 'absolute',
    top: -0.5,
    height: 1,
    left: -333,
    right: 0
  },
  small_text_body_layout21: {
    position: 'absolute',
    height: 12,
    bottom: -0.5,
    left: 0,
    width: 15
  },
  line_layout9: {
    position: 'relative',
    height: 1,
    margin: '13px 0px 0px'
  },
  cover_group8: {
    display: 'flex',
    backgroundColor: 'rgb(255,131,76)',
    borderRadius: '8px 8px 8px 8px'
  },
  cover_group8_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 30,
    width: 304,
    minWidth: 304,
    margin: '43px auto 0px'
  },
  text_body4: {
    display: 'flex',
    justifyContent: 'center',
    font: '700 14px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  text_body4_layout: {
    position: 'relative',
    width: 145,
    minWidth: 145,
    margin: '6px auto 8px'
  },
  flex_row: {
    display: 'flex'
  },
  flex21: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  image: {
    background: 'var(--src) center center / cover no-repeat'
  },
  image_layout: {
    position: 'relative',
    height: 50,
    width: 50,
    minWidth: 50,
    margin: '0px 0px 6px'
  },
  flex21_spacer: {
    display: 'flex',
    flex: '0 1 30px'
  },
  icon_layout2: {
    position: 'relative',
    height: 50,
    width: 50,
    minWidth: 50,
    margin: '0px 0px 6px'
  },
  flex21_col: {
    display: 'flex',
    flex: '0 1 50px'
  },
  cover_group9: {
    display: 'flex',
    background: 'var(--src) center center / cover no-repeat'
  },
  cover_group9_layout: {
    position: 'relative',
    overflow: 'visible',
    minHeight: 50,
    flexGrow: 1,
    margin: '0px 0px 6px'
  },
  image1: {
    background: 'var(--src) center center / contain no-repeat'
  },
  image1_layout: {
    position: 'relative',
    height: 24,
    width: 30,
    minWidth: 30,
    margin: '13px 10px'
  },
  flex21_spacer2: {
    display: 'flex',
    flex: '0 1 1031.5px'
  },
  flex21_col1: {
    display: 'flex',
    flex: '0 1 98px'
  },
  copyright: {
    display: 'flex',
    justifyContent: 'center',
    font: '20px/1.2 "Inter", Helvetica, Arial, serif',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    letterSpacing: '0px'
  },
  copyright_layout: {
    position: 'relative',
    flexGrow: 1,
    margin: '32px 0px 0px'
  }
});
