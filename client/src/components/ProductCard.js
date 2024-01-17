import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../App'; 

const ProductCard = ({ product }) => {
  const { addToCart, isMobile } = useContext(SessionContext);
  const [carted, setCarted] = useState(false);

  const getPrice = () => {
    const discount = (product.deals * 0.01) * product.price;
    const discountedPrice = parseFloat(product.price - discount).toFixed(2);
    return product.deals ? `$${discountedPrice}` : `$${parseFloat(product.price).toFixed(2)}`;
  }

  useEffect(() => {
    let timeout;
    if (carted) {
      timeout = setTimeout(() => {
        setCarted(false);
      }, 2500); // 2.5 seconds
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [carted]);

  const getProductName = () => {
    const productName = product.name + " " + product.flavors + " " + product.sizes
    if (productName.length > 21){
      return productName.slice(0, 20) + "..."
    }
    return productName
  }

  if(isMobile){
    return(
      <div>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className='cardimage' alt={product.name} />
        <h4>
          {getProductName()}
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
      <button className="logbutton" onClick={() => { addToCart(product); setCarted(true) }}>
        🛒 +
      </button>
      <br />
      {carted? <p style={{color:'green'}}>Added to Cart!</p>:<span>&nbsp;</span>}
    </div>
    )
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
      <button className="logbutton" onClick={() => { addToCart(product); setCarted(true) }}>
        🛒 Add to Cart
      </button>
      <br />
      {carted? <p style={{color:'green'}}>Added to Cart!</p>:<span>&nbsp;</span>}
    </div>
  );
};

export default ProductCard;
