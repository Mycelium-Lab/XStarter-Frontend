import React from 'react';
import topblockimg from '../img/top-block-img.png';

function PPCurrentIDO(props) {  
  const { handleChange } = props; 
  return (
        <div className="xs-current-ido mb100">
          <div className="xs-ido">
            Current IDOs
          </div>
          <div className="xs-blocks">
            <div className="xs-block">
              <div className="xs-block-top">
                <div className="xs-block-top-img">
                  <img src={topblockimg} alt="" />
                </div>
                <div className="xs-block-top-content">
                  <span className="xs-top-block-name">shuffle!</span>
                  <span className="xs-top-block-name-links">
                    <a href="#">Website</a>
                    <a href="#">Medium</a>
                    <a href="#">Twitter</a>
                    <a href="#">Telegram</a>
                  </span>
                </div>
              </div>
              <div className="xs-block-content">
                <div className="xs-block-ido-status">
                  <div className="ido-status-top mb30">
                    <div>IDO Status: <span>Completed</span></div>
                    <div>Pair: <span>ETC</span></div>
                  </div>
                  <div className="ido-status-desc mb30">
                    SHUFFLE! is a deflationary odds based slot machine that runs on SHUFFLE! native token. Prizes consist of $SHFL, $CARDS, $C3, $GERO and others.
                  </div>
                  <div className="ido-status-progress mb30">
                    <div>IDO Progress: <span>100%</span></div>
                    <div className="progress-wrap progress">
                      <div className="progress-bar progress" style={{width: '100%'}}>
                      </div>
                    </div>
                  </div>
                  <div className="ido-status-stats">
                    <div>Swap Rate - 1 ETH: 285000.00 SHFL</div>
                    <div>Pool Cap - 349772.7272727 SHFL</div>
                    <div>Access - PRIVATE</div>
                    <div>Participants - 856</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}


export default PPCurrentIDO;