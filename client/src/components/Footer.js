import React from 'react'
import Map from './Map'
const Footer = () => {
  return (
    <footer class="footer">
    <div class="footer-left">
        {/* <!-- Left column content --> */}
        <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact Us</a></li>
        {/* <!-- Add more links as needed --> */}
        </ul>
    </div>
    <div class="footer-right">
        {/* <!-- Right column content (map) --> */}
        <div id="map-container">
            <Map/>
        </div>
    </div>
    </footer>

  )
}

export default Footer