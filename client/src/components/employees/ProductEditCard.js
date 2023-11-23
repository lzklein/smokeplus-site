import React from 'react'
import {useNavigate} from 'react-router-dom';

const ProductCard = () => {
  const navigate= useNavigate();

  return (
    <div>ProductCard

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default ProductCard