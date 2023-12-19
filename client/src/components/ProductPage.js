import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../App'; 

const ProductPage = () => {
  const { sessionId, cart, setCart, API_BASE_URL, addToCart } = useContext(SessionContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // ! if this product has a size or flavor or both, search for all products with same name, create sizes/flavors array for dropdown
  // ? Ideas: Reviews, Star Rating (can be static), Related Items (random items of same category or something)
  // ? if quantity under x number, red text "Only x left, buy now"?
  // ! Above add to cart, put dropdown menu for buy quantity add to cart that many times
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          console.log(productData)
          setProduct(productData);
          setLoaded(true)
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, []);



  return (
    loaded ? (
      <>           
        <div className="product-container">
          <div className="product-left">
            <img src={product.image} alt={product.name} className="product-img" />
          </div>
          <div className="product-right">
            <h2>{product.name}</h2>
            <p style={{marginBottom:"10px"}}>${parseFloat(product.price).toFixed(2)}</p>
            {
              product.sizes ?
              <div>
                <p>Size Options</p>
                <select></select> 
              </div>

               : null
            }
            {
              product.flavors ? 
              <div>
                <p>Flavors</p>
                <select></select> 
              </div>
              : null
            }
            <br/>
            <button className="backbutton" style={{marginTop:"10px"}} onClick={()=>{addToCart(product)}}>Add to Cart 🛒</button>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="related-products">
          <h3 style={{textAlign:"left", marginLeft:"25%"}}>Related Items:</h3>
          {/* {renderRelated()} */}
        </div>
      </>

    ) : (
      <div className="empty-space" style={{margin:"5000px"}}>
        <h1>Loading</h1>
      </div>
    )
  );
};

export default ProductPage;
