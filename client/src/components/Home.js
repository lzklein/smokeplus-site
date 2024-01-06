import React from 'react';
import Deals from './Deals';
import Popular from './Popular';
import { Link } from 'react-router-dom';
import Banner from './Banner';

const Home = ({bannerImages}) => {
  return (
    <div>
      <Banner images={bannerImages} />
      {/* Banner/Promo thing here */}
      <div>
        <div className="section">
          <h2>Deals!</h2>
          <Link className="see-all-link" to='/deals'>See All &raquo;</Link>
        </div>
        <Deals />
      </div>
      <div>
        <div className="section">
          <h2>Popular!</h2>
          <Link className="see-all-link" to='/popular'>See All &raquo;</Link>
        </div>
        <Popular />
      </div>
    </div>
  );
}

export default Home;
