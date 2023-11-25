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
      <h2>Banner Editor</h2>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <br/>
      <button className="backbutton" onClick={handleAddNewImage} style = {{"margin-bottom":"10px"}}>
          + Add New Image
        </button>
      <div className="bannercards">
        {updatedBannerImages.map((image, index) => (
          <div key={index} className="bannercard">
            <img src={image} alt={`Banner ${index + 1}`} className="bannerimg"/>
            <button className="backbutton" onClick={() => handleDelete(index)}  style = {{"margin-bottom":"5px", "margin-top":"2px"}}>
            &uarr; Delete &uarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerEdit;
