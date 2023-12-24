import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerEdit = ({ bannerImages }) => {
  const navigate = useNavigate();
  const [updatedBannerImages, setUpdatedBannerImages] = useState(bannerImages);

  useEffect(() => {
    localStorage.setItem('bannerImages', JSON.stringify(updatedBannerImages));
  }, [updatedBannerImages]);

  const handleDelete = async (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');

    if (isConfirmed) {
      try {
        const response = await fetch('/api/banner/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: updatedBannerImages[index] }),
        });

        if (response.ok) {
          const newImages = [...updatedBannerImages];
          newImages.splice(index, 1);
          setUpdatedBannerImages(newImages);
        } else {
          console.error('Failed to delete image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleAddNewImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg, .jpeg, .gif, .png'; // Specify accepted file formats

    input.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('image', file);

          const response = await fetch('/api/banner/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const { filename } = await response.json();
            setUpdatedBannerImages([filename, ...updatedBannerImages]);
          } else {
            console.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });

    input.click();
  };

  return (
    <div>
      <h2>Banner Editor</h2>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <br />
      <button className="backbutton" onClick={handleAddNewImage} style={{ marginBottom: "10px" }}>
        + Add New Image
      </button>
      <div className="bannercards">
        {updatedBannerImages.map((image, index) => (
          <div key={index} className="bannercard">
            <img src={image} alt={`Banner ${index + 1}`} className="bannerimg" />
            <button className="backbutton" onClick={() => handleDelete(index)} style={{ marginBottom: "5px", marginTop: "2px" }}>
              &uarr; Delete &uarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerEdit;
