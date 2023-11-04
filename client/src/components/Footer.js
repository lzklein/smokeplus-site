import React from 'react';
import Map from './Map';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        {/* Left column content */}
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact Us</a></li>
          {/* Add more links as needed */}
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
