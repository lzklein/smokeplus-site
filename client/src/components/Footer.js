import React from 'react';
import Map from './Map';
// import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div>
          <ul>
            <li><h4>About Us</h4></li>
            <ul className="foot-sub">
              <li><a href="/about">About</a></li>
              <li><a href="/terms">Terms and Policies</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
            <li><h4>Stay Connected</h4></li>
            <ul className="foot-sub">
              {/* TODO link new tab socials */}
              <li><a href="/twit">Twitter</a></li>
              <li><a href="https://www.instagram.com/smoke_plus_renton/?hl=en" target="_blank">Instagram</a></li>
              <li><a href="/fb">Facebook</a></li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="footer-center">
        <ul>
          <li><h4>Contact Us</h4></li>
          <ul className="foot-sub">
            <li><p>Phone #: (425)264-5749</p></li>
            {/* link to email sender thing maybe */}
            <li><a href="/terms">Email: </a></li>
          </ul>
          <li><h4>Employee Resources</h4></li>
          <ul className="foot-sub">
            <li><a href="/employee-login">Login</a></li>
          </ul>
        </ul>
      </div>
      <div className="footer-right">
        {/* Right column content (map) */}
        <div id="map-container">
          <Map />
        </div>
        <p>
          SMOKE PLUS, 1222 Bronson Way N UNIT 110, Renton, WA 98057
        </p>
      </div>
    </footer>
  );
}

export default Footer;
