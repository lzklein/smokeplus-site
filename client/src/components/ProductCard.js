import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="productcard">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className='cardimage' alt={product.name} />
        <h4>
          {product.name} {product.flavors} {product.sizes}
        </h4>
        <p>
          Qty: {product.quantity} | ${parseFloat(product.price).toFixed(2)}
        </p>
      </Link>
      <br />
    </div>
  );
};

export default ProductCard;
