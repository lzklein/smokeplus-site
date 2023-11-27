import React from 'react'
import {useNavigate} from 'react-router-dom';

// each card onclick nav to product/edit/product.id or something
const ProductCard = () => {
  const navigate= useNavigate();

  return (
    <div>ProductCard

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default ProductCard