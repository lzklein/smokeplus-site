import React from 'react'
import Deals from './Deals'
import Popular from './Popular'
import { Link } from 'react-router-dom';
import Banner from './Banner';

// banner images
import hero1 from '../img/hero1.png';
import hero2 from '../img/hero2.png';
import hero3 from '../img/hero3.png';
import hero4 from '../img/hero4.png';

const Home = () => {
  const images = [
    hero1,
    hero2,
    hero3,
    hero4
    // Add more image URLs as needed
  ];
  return (
    <div>
      <Banner images={images} />
      {/* Banner/Promo thing here */}
      <div className="section">
        <h3>Deals!</h3>
        <a className="see-all-link">See All &raquo;</a>
      </div>
      <Deals />
      <div className="section">
        <h3>Popular</h3>
        <a className="see-all-link">See All &raquo;</a>
      </div>
      <Popular />
    </div>
  );
}

export default Home