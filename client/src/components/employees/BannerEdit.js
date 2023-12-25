import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App'; 

const BannerEdit = ({ bannerImages }) => {
  const navigate = useNavigate();
  const [updatedBannerImages, setUpdatedBannerImages] = useState(bannerImages);
  const { API_BASE_URL } = useContext(SessionContext);

  useEffect(() => {
    localStorage.setItem('bannerImages', JSON.stringify(updatedBannerImages));
  }, [updatedBannerImages]);

  const handleDelete = async (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');
  
    if (isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/banner/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: updatedBannerImages[index].name }),
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
    const file = await selectFile();
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const response = await fetch(`${API_BASE_URL}/api/banner/upload`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const { filename } = await response.json();
  
          const newImage = {
            file: URL.createObjectURL(file),
            name: filename,
          };
  
          console.log('Upload successful', filename);
          setUpdatedBannerImages([newImage, ...updatedBannerImages]);
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  
  const selectFile = () => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.jpg, .jpeg, .gif, .png';
  
      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        resolve(file);
      });
  
      input.click();
    });
  };
  
  console.log(updatedBannerImages)
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
            <img src={image.file} alt={`Banner ${index + 1}, ${image}`} className="bannerimg" />
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
