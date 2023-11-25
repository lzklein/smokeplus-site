import React from 'react';
import Deals from './Deals';
import Popular from './Popular';
import { Link } from 'react-router-dom';
import Banner from './Banner';

// Import all files in the img/banner directory
const importAll = (r) => r.keys().map(r);
const bannerImages = importAll(require.context('../img/banner', false, /\.(png|gif)$/));

const Home = () => {
  return (
    <div>
      <Banner images={bannerImages} />
      {/* Banner/Promo thing here */}
      <div className="section">
        <h3>Deals!</h3>
        <Link className="see-all-link" to='/deals'>See All &raquo;</Link>
      </div>
      <Deals />
      <div className="section">
        <h3>Popular</h3>
        <Link className="see-all-link" to='/popular'>See All &raquo;</Link>
      </div>
      <Popular />
    </div>
  );
}

export default Home;
