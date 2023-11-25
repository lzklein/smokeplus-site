import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerEdit = ({ bannerImages }) => {
  const navigate = useNavigate();
  const [updatedBannerImages, setUpdatedBannerImages] = useState(bannerImages);

  useEffect(() => {
    localStorage.setItem('bannerImages', JSON.stringify(updatedBannerImages));
  }, [updatedBannerImages]);

  const handleDelete = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');
    
    if (isConfirmed) {
      const newImages = [...updatedBannerImages];
      newImages.splice(index, 1);
      setUpdatedBannerImages(newImages);
    }
  };

  const handleAddNewImage = () => {
    const newImageURL = prompt('Enter the URL for the new image:');
    if (newImageURL) {
      setUpdatedBannerImages([...updatedBannerImages, newImageURL]);
    }
  };

  return (
    <div>
      <div>BannerEdit</div>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <div className="banner-cards">
        {updatedBannerImages.map((image, index) => (
          <div key={index} className="banner-card">
            <img src={image} alt={`Banner ${index + 1}`} />
            <button className="backbutton" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <button className="backbutton" onClick={handleAddNewImage}>
          + Add New Image
        </button>
      </div>
    </div>
  );
};

export default BannerEdit;
