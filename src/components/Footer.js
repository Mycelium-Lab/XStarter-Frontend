import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { Px, commonStyles } from './posize';
export const Footer = () => {
    return (
        <div className={css(styles.flex_row)}>
            <Px.div x="1fr 1339.5px 1fr" y="80px minmax(0px, 56fr) 10px" className={css(styles.flex21)}>
            <div
                style={{ '--src': `url(${require('assets/f46bd013b1655c9ecc0c37782732c6af.png')})` }}
                className={css(styles.image, styles.image_layout)}
            />
            <div className={css(styles.flex21_spacer)} />
            <div
                style={{ '--src': `url(${require('assets/5973fb4bdf2343a0a87d7cd6527bdea1.png')})` }}
                className={css(styles.icon, styles.icon_layout2)}
            />
            <div className={css(styles.flex21_spacer)} />
            <div className={css(styles.flex21_col)}>
                <div
                style={{ '--src': `url(${require('assets/b2fe8991c70f4ecc20f4d6f206f0e193.png')})` }}
                className={css(styles.cover_group9, styles.cover_group9_layout)}>
                <div
                    style={{ '--src': `url(${require('assets/e18ec21f9f22d41337887ae88804acca.png')})` }}
                    className={css(styles.image1, styles.image1_layout)}
                />
                </div>
            </div>
            <div className={css(styles.flex21_spacer2)} />
            <div className={css(styles.flex21_col1)}>
                <h3 className={css(styles.copyright, styles.copyright_layout)}>{'Copyright'}</h3>
            </div>
            </Px.div>
      </div>
    )
}
const styles = StyleSheet.create({
    icon: {
        background: 'var(--src) center center / contain no-repeat'
      },
      icon_layout2: {
        position: 'relative',
        height: 50,
        width: 50,
        minWidth: 50,
        margin: '0px 0px 6px'
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