import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import ProductCard from './ProductCard';

const ProductPage = () => {
  const { sessionId, cart, setCart, API_BASE_URL, addToCart, isMobile } = useContext(SessionContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [carted, setCarted] = useState(false)

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
        const filteredFlavors = flavorsData.filter((product) => product !== null && product !== undefined && product.flavors !== "");
        setFlavors(filteredFlavors);
      } else {
        console.error('Failed to fetch flavors');
      }

      if (sizesResponse.ok) {
        const sizesData = await sizesResponse.json();
        const filteredSizes = sizesData.filter((product) => product !== null && product !== undefined && product.sizes !== "");
        setSizes(filteredSizes);
      } else {
        console.error('Failed to fetch sizes');
      }
    } catch (error) {
      console.log('Error fetching flavors or sizes:', error);
    }
  };

  const fetchRelatedProduct = async () => {
    const maxRetries = 5; 
    let retryCount = 0;
    const usedCategories = []; 
  
    while (retryCount < maxRetries && usedCategories.length < product.categories.length) {
      const randomIndex = Math.floor(Math.random() * product.categories.length);
      const randomCategory = product.categories[randomIndex];
  
      if (!usedCategories.includes(randomCategory)) {
        usedCategories.push(randomCategory);
  
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
              return;
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
  
    if (usedCategories.length === product.categories.length) {
      console.error('All categories used, no related products found');
    } else {
      console.error('No related products found after multiple attempts');
    }
  };
  
  const getPrice = () => {
    const discount = (product.deals * 0.01) * product.price;
    const discountedPrice = parseFloat(product.price - discount).toFixed(2);
    return product.deals ? `$${discountedPrice}` : `$${parseFloat(product.price).toFixed(2)}`;
  }
    
  const renderRelatedProducts = () => {
    return relatedProducts.map((product) => (
      <div key={product.id} className={isMobile?'productcard-compact':'productcard'}>
        <ProductCard product={product} compact={isMobile} />
      </div>
    ));
  };
  
  if(isMobile){
    return (
      loaded ? (
        <div>
          <h1 style={{marginTop:'25px'}}>{product.name}</h1>
          <div className='mobile-image'>
            <img src={product.image} alt={product.name} draggable='false' className="product-img" />
          </div>
          <br/>
          <p>
            {product.deals ? (
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
              <p style={{marginTop:'5px', marginBottom:'10px'}}>Flavors:</p>
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
          <input 
            name='itemQuantity'
            type='number'  
            style={{marginRight:'5px', maxWidth:'70px'}}
            defaultValue={1}
            min={1}
            max={product.quantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value, 10))}
          />
          <br/>
          <button
            className="backbutton"
            style={{ marginTop: '20px', padding:'15px' }}
            onClick={() => {
              addToCart(product, itemQuantity);
              setCarted(true);
            }}
          >Add to Cart 🛒
          </button>
          {carted?<p style={{color:'green'}}>Added to cart!</p>:<p>&nbsp;</p>}
          <p style={{marginTop:'5px'}}>{product.description}</p>
          <h3 style={{ textAlign: 'left', marginTop:'80px', marginLeft: '10%' }}>Related Items:</h3>
          <div className="related-products">
            {relatedProducts ? renderRelatedProducts() : null}
          </div>
        </div>
      ) : (
        <div className="empty-space" style={{ margin: '5000px' }}>
          <h1>Loading</h1>
        </div>
      )
    );
  }

  return (
    loaded ? (
      <>
        <div className="product-container">
          <div className="product-left">
            <div className='image-container'>
              <img src={product.image} alt={product.name} draggable='false' className="product-img" />
            </div>
          </div>
          <div className="product-right">
            <h2>{product.name}</h2>
            <p>
              {product.deals ? (
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
            <input 
              name='itemQuantity'
              type='number'  
              style={{marginRight:'5px', maxWidth:'70px'}}
              defaultValue={1}
              min={1}
              max={product.quantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value, 10))}
              />
            <button
              className="backbutton"
              style={{ marginTop: '10px' }}
              onClick={() => {
                addToCart(product, itemQuantity);
                setCarted(true);
              }}
            >
              Add to Cart 🛒
            </button>
            {carted?<p style={{color:'green'}}>Added to cart!</p>:<p>&nbsp;</p>}
            <p style={{marginTop:'5px'}}>{product.description}</p>
          </div>
        </div>
        <h3 style={{ textAlign: 'left', marginTop:'80px', marginLeft: '25%' }}>Related Items:</h3>
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
