import React from 'react'
import Deals from './Deals'
import Popular from './Popular'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
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