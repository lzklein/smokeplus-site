import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../App'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(SessionContext);

  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className='cardimage' alt={product.name} />
        <h4>
          {product.name} {product.flavors} {product.sizes}
        </h4>
        <p>
          Qty: {product.quantity} | ${parseFloat(product.price).toFixed(2)}
        </p>
      </Link>
        <button className="logbutton" onClick={()=>{addToCart(product)}}>
          🛒 Add to Cart
        </button>
      <br />
    </div>
  );
};

export default ProductCard;
