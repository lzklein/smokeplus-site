import React, { useState, useEffect } from 'react';

const Banner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to switch to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatically switch to the next image every few seconds
  useEffect(() => {
    const timer = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      <img src={images[currentImageIndex]} alt="Promotion" />
    </div>
  );
};

export default Banner;
