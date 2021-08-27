import React from 'react';
import topblockimg from '../img/top-block-img.png';

function PPUpcomingIDO(props) {  
  const { handleChange } = props; 
  return (
    <div className="xs-current-ido mb100">
        <div className="xs-ido">
        Upcoming IDOs
        </div>
        <div className="xs-ido-noupcoming">
        There is no upcoming IDOs yet. Stay tuned
        </div>            
    </div>
    );
}

export default PPUpcomingIDO;