import React, { useContext } from 'react';
import { SessionContext } from '../App';
import map from '../map.png';

const Footer = () => {
  const { isMobile } = useContext(SessionContext);

  if (isMobile) {
    return (
      null
    );
  }

  return (
    <footer className="footer">
      <div className="footer-center" style={{marginLeft:'20vw', marginTop:'25px'}}>
        <ul>
          <li>
            <h4 style={{marginBottom:'50px'}}>Contact Us - (425) 264-5749</h4>
          </li>
          {/* <li>
            <p style={{fontSize:'12px', marginBottom:'10px'}}> Phone (425) 264-5749</p>
          </li> */}
          <li>
            <h4 onClick={()=>{window.open('https://www.instagram.com/smoke_plus_renton/?hl=en', '_blank')}} rel="noopener noreferrer" style={{marginBottom:'50px', cursor: 'pointer'}}>Follow us on Instagram!</h4>
          </li>
          {/* <li>
            <a href="https://www.instagram.com/smoke_plus_renton/?hl=en" target="_blank" rel="noopener noreferrer" style={{fontSize:'12px'}}>
              Instagram
            </a>
          </li> */}
          <li>
            <a href="/employee-login" >Employee Login</a>
          </li>
          {/* <li>
            <a href="/employee-login" style={{fontSize:'12px'}}>Login</a>
          </li> */}
        </ul>
      </div>
      <div className="footer-right" style={{marginRight:'5vw'}}>
        <div id="map-container">
          <a
            href="https://www.google.com/maps/dir//SMOKE+PLUS,+1222+Bronson+Way+N+UNIT+110,+Renton,+WA+98057/@47.4834672,-122.2039636,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x54906801b0adccd3:0x1a5833d1f30e5aa8!2m2!1d-122.201274!2d47.4834422!3e0?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={map} alt="Store Location" className="map-png" />
          </a>
        </div>
        <p className='map-address'>SMOKE PLUS, 1222 Bronson Way N UNIT 110, Renton, WA 98057</p>
      </div>
    </footer>
  );
};

export default Footer;
