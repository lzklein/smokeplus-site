import React from 'react';

const ProductCard = ({ product }) => {

  return (
    <div className="productcard">
      <img src={product.image} className='cardimage' alt={product.name} />
      <h4>
        {product.name}{" "}{product.flavors}{" "}{product.sizes}
      </h4>
      <p>
        Qty: {product.quantity} | ${parseFloat(product.price).toFixed(2)} 
      </p>
      <br/>
    </div>
  );
}

export default ProductCard;
