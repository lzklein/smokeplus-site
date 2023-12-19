import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';

const ProductPage = () => {
  const { sessionId, cart, setCart, API_BASE_URL, addToCart } = useContext(SessionContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          console.log(productData);
          setProduct(productData);
          setLoaded(true);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchFlavorsAndSizes = async () => {
      try {
        const flavorsResponse = await fetch(`${API_BASE_URL}/api/products/${product.name}/flavors`);
        const sizesResponse = await fetch(`${API_BASE_URL}/api/products/${product.name}/sizes`);

        if (flavorsResponse.ok) {
          const flavorsData = await flavorsResponse.json();
          // Filter out items without flavors
          const filteredFlavors = flavorsData.filter((product) => product !== null && product !== undefined && product.flavors !== "");
          setFlavors(filteredFlavors);
        } else {
          console.error('Failed to fetch flavors');
        }

        if (sizesResponse.ok) {
          const sizesData = await sizesResponse.json();
          // Filter out items without sizes
          const filteredSizes = sizesData.filter((product) => product !== null && product !== undefined && product.sizes !== "");
          setSizes(filteredSizes);
        } else {
          console.error('Failed to fetch sizes');
        }
      } catch (error) {
        console.error('Error fetching flavors or sizes:', error);
      }
    };

      fetchFlavorsAndSizes();
  }, [product]);
  return (
    loaded ? (
      <>
        <div className="product-container">
          <div className="product-left">
            <img src={product.image} alt={product.name} className="product-img" />
          </div>
          <div className="product-right">
            <h2>{product.name}</h2>
            <p style={{ marginBottom: '10px' }}>${parseFloat(product.price).toFixed(2)}</p>
            {/* <button className='backbutton' onClick={()=>{console.log(flavors)}}>flavors</button>
            <button className='backbutton' onClick={()=>{console.log(sizes)}}>sizes</button> */}

            {sizes.length > 0 && (
              <div>
                <p>Size Options:</p>
                <select onChange={(e)=>{navigate(`/products/${e.target.value}`)}}>
                  {sizes.map((sizeProduct) => (
                    <option key={sizeProduct.id} value={sizeProduct.id} selected={sizeProduct.sizes === product.sizes}>
                      {sizeProduct.sizes}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {flavors.length > 0 && (
              <div>
                <p>Flavors:</p>
                <select onChange={(e)=>{navigate(`/products/${e.target.value}`)}}>
                  {flavors.map((flavorProduct) => (
                    <option key={flavorProduct.id} value={flavorProduct.id} selected={flavorProduct.flavors === product.flavors}>
                      {flavorProduct.flavors}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <br />
            <button
              className="backbutton"
              style={{ marginTop: '10px' }}
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to Cart 🛒
            </button>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="related-products">
          <h3 style={{ textAlign: 'left', marginLeft: '25%' }}>Related Items:</h3>
          {/* {renderRelated()} */}
        </div>
      </>
    ) : (
      <div className="empty-space" style={{ margin: '5000px' }}>
        <h1>Loading</h1>
      </div>
    )
  );
};

export default ProductPage;
