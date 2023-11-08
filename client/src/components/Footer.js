import React from 'react';
import Map from './Map';

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
              <li><a href="/insta">Instagram</a></li>
              <li><a href="/fb">Facebook</a></li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="footer-center">
        <ul>
          <li><h4>Contact Us</h4></li>
          <ul className="foot-sub">
            <li><p>Phone #</p></li>
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
