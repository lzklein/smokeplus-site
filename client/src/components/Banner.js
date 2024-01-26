import React, { useState, useEffect } from 'react';

const Banner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000); // image change every 3 seconds
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  return (
      <div className="carousel banner">
        <button className="prev" onClick={prevImage}>&lt;</button>
        <img className='bannerimg'src={images[currentImageIndex].file} alt={`Image ${currentImageIndex}`} draggable={false}/>
        <button className="next" onClick={nextImage}>&gt;</button>
      </div>
    );
  };

export default Banner;
