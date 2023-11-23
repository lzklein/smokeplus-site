import React from 'react'
import {useNavigate} from 'react-router-dom';

const ProductEdit = () => {
  const navigate= useNavigate();

  return (
    <div>ProductEdit

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default ProductEdit