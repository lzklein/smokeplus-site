import React from 'react';
import Deals from './Deals';
import Popular from './Popular';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Searchbar from './Searchbar';

const Home = ({bannerImages}) => {
  return (
    <div>
      <Searchbar />
      {bannerImages?      
       <Banner images={bannerImages} />
       :null
      }
      <div>
        <div className="section" style={{marginTop:'30px'}}>
          <h2>Deals!</h2>
          <Link className="see-all-link" to='/deals/all'>See All &raquo;</Link>
        </div>
        <Deals />
      </div>
      <div>
        <div className="section">
          <h2>Popular!</h2>
          <Link className="see-all-link" to='/popular/all'>See All &raquo;</Link>
        </div>
        <Popular />
      </div>
    </div>
  );
}

export default Home;
