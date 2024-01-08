import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../App'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(SessionContext);

  const getPrice = () => {
    const discount = (product.deals * 0.01) * product.price;
    const discountedPrice = parseFloat(product.price - discount).toFixed(2);
    return product.deals ? `$${discountedPrice}` : `$${parseFloat(product.price).toFixed(2)}`;
  }



  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className='cardimage' alt={product.name} />
        <h4>
          {product.name} {product.flavors} {product.sizes}
        </h4>
        {!!product.deals?
          <span style={{color: 'red',}}> {product.deals}% Off!</span>
          :
          <span>&nbsp;</span>
          }

        <p>
          Qty: {product.quantity} | {product.deals ? (
            <>             
              <span style={{ textDecoration: 'line-through', color: 'grey' }}>
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <span style={{color: 'red',}}> {getPrice()} </span> 

            </>
          ) : (
            <span>${parseFloat(product.price).toFixed(2)}</span>
          )}
        </p>
      </Link>
      <button className="logbutton" onClick={() => { addToCart(product) }}>
        🛒 Add to Cart
      </button>
      <br />
    </div>
  );
};

export default ProductCard;
