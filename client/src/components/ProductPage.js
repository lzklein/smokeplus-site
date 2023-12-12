import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

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
            <p style={{'margin-bottom':"10px"}}>${product.price}</p>
            {
              product.sizes ?
               <select>

               </select> 
               : null
            }
            {
              product.flavors ? 
              <select>

              </select> 
              : null
            }
            <br/>
            <button className="backbutton" style={{"margin-top":"10px"}}>Add to Cart</button>
            <p>{product.description}</p>
          </div>
        </div>
        <div>
        </div>
      </>

    ) : (
      <div>loading</div>
    )
  );
};

export default ProductPage;
