import React, { useContext } from 'react';
import Map from './Map';
import { SessionContext } from '../App'; 

const Footer = () => {
  const { isMobile } = useContext(SessionContext);

  if(isMobile){
    return(
      <footer className='footer'>
        <div>
          {/* Right column content (map) */}
          <div id="map-container">
            <Map />
          </div>
          <p className='map-address' style={{marginLeft:'190px'}}>
            SMOKE PLUS, 1222 Bronson Way N UNIT 110, Renton, WA 98057
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="footer">
      <div className="footer-center" style={{marginLeft:'300px', marginTop:'20px'}}>
        <ul>
          <li><h4>Contact Us</h4></li>
          <ul className="foot-sub">
            <li><p>Phone (425)264-5749</p></li>
            {/* link to email sender thing maybe */}
          </ul>
          <li><h4 style={{marginTop:'50px'}}>Follow us on Instagram!</h4></li>
            <ul className="foot-sub">
              {/* TODO link new tab socials */}
              {/* <li><a href="/twit">Twitter</a></li> */}
              <li><a href="https://www.instagram.com/smoke_plus_renton/?hl=en" target="_blank">Instagram</a></li>
              {/* <li><a href="/fb">Facebook</a></li> */}
            </ul>
          <li><h4 style={{marginTop:'50px'}}>Employee Resources</h4></li>
          <ul className="foot-sub">
            <li><a href="/employee-login">Login</a></li>
          </ul>
        </ul>
      </div>
      <div className="footer-right" style={{marginRight:'10vw'}}>
        {/* Right column content (map) */}
        <div id="map-container">
          <Map />
        </div>
        <p className='map-address' style={{marginLeft:'190px'}}>
          SMOKE PLUS, 1222 Bronson Way N UNIT 110, Renton, WA 98057
        </p>
      </div>
    </footer>
  );
}

export default Footer;
