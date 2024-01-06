import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import ProductCard from './ProductCard';

const ProductPage = () => {
  const { sessionId, cart, setCart, API_BASE_URL, addToCart } = useContext(SessionContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          productData.categories = productData.categories.split(',');
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
    if(product){
      fetchFlavorsAndSizes();
      fetchRelatedProduct();
    }
  }, [product]);

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
      // console.error('Error fetching flavors or sizes:', error);
    }
  };

  const fetchRelatedProduct = async () => {
    const maxRetries = 5; // Set a maximum number of retries
    let retryCount = 0;
    const usedCategories = []; // Keep track of used categories
  
    while (retryCount < maxRetries && usedCategories.length < product.categories.length) {
      const randomIndex = Math.floor(Math.random() * product.categories.length);
      const randomCategory = product.categories[randomIndex];
  
      // Check if the category has already been used
      if (!usedCategories.includes(randomCategory)) {
        usedCategories.push(randomCategory); // Mark the category as used
  
        try {
          const relatedResponse = await fetch(`${API_BASE_URL}/api/products/related-products/${randomCategory}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.id,
            }),
          });
  
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            if (relatedData.length > 0) {
              setRelatedProducts(relatedData);
              return; // Exit the loop if related products are found
            }
          } else {
            console.error('Fetch failed');
          }
        } catch (error) {
          console.error('Error fetching related products:', error);
        }
      }
  
      retryCount++;
    }
  
    // If no related products are found after maxRetries or all categories are used, handle it here
    if (usedCategories.length === product.categories.length) {
      console.error('All categories used, no related products found');
    } else {
      console.error('No related products found after multiple attempts');
    }
  };
  
    
  const renderRelatedProducts = () => {
    return relatedProducts.map((product) => {
      return (<div key={product.id} className='productcard'>
        <ProductCard product = {product}/>
      </div>)
    })
  }

  return (
    loaded ? (
      <>
        <div className="product-container">
          <div className="product-left">
            <img src={product.image} alt={product.name} draggable='false' className="product-img" />
          </div>
          <div className="product-right">
            <h2>{product.name}</h2>
            <p style={{ marginBottom: '10px' }}>${parseFloat(product.price).toFixed(2)}</p>
            {/* <button className='backbutton' onClick={()=>{console.log(flavors)}}>flavors</button>
            <button className='backbutton' onClick={()=>{console.log(sizes)}}>sizes</button> */}

            {sizes.length > 0 && (
              <div>
                <p>Size Options:</p>
                <select
                  onChange={(e) => {
                    const selectedId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                    navigate(`/products/${selectedId}`);
                  }}
                  defaultValue={product.sizes}
                >
                  {sizes.map((sizeProduct) => (
                    <option key={sizeProduct.id} value={sizeProduct.sizes} data-id={sizeProduct.id}>
                      {sizeProduct.sizes}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {flavors.length > 0 && (
              <div>
                <p>Flavors:</p>
                <select
                  onChange={(e) => {
                    const selectedId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                    navigate(`/products/${selectedId}`);
                  }}
                  defaultValue={product.flavors}
                >
                  {flavors.map((flavorProduct) => (
                    <option key={flavorProduct.id} value={flavorProduct.flavors} data-id={flavorProduct.id}>
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
        <h3 style={{ textAlign: 'left', marginLeft: '25%' }}>Related Items:</h3>
        <div className="related-products">
          {relatedProducts ? renderRelatedProducts() : null}
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
