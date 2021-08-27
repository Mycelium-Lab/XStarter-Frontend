import React from 'react';
import telegram from '../img/ftr-logos/tg.svg';
import twitter from '../img/ftr-logos/tw.svg';
import medium from '../img/ftr-logos/m.svg';

function Footer(props) {
  const { handleChange } = props;
  return (
    <footer>
        <div className="socials">
          <a href="#"><img src={telegram} alt="" /></a>
          <a href="#"><img src={twitter} alt="" /></a>
          <a href="#"><img src={medium} alt="" /></a>
        </div>
        <div className="copyright">Copyright</div>
      </footer>
  );
}

export default Footer;