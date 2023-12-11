import React from 'react';

const ProductCard = ({ product, handleDeleteProduct }) => {

  return (
    <div className="productcard">
      <img src={product.image} className='cardimage' alt={product.name} />
      <p>{product.id}</p>
      <h4>
        {product.name}{" "}{product.flavors}{" "}{product.sizes}
      </h4>
      <p>
        Qty: {product.quantity} | ${parseFloat(product.price).toFixed(2)} 
      </p>
      <br/>
      <button className="backbutton" onClick={() => handleDeleteProduct(product.id)}> Delete </button>
      <button className="backbutton" style={{ "margin-left": "3px" }}> Edit </button>
    </div>
  );
}

export default ProductCard;
