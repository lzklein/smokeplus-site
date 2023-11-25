import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerEdit = ({ bannerImages }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>BannerEdit</div>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <div className="banner-cards">
        {bannerImages.map((image, index) => (
          <div key={index} className="banner-card">
            <img src={image} alt={`Banner ${index + 1}`} />
            {/* Add other content for the banner card as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerEdit;
