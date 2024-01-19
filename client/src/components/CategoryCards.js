import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../App';
import ProductCard from './ProductCard';

const CategoryCards = ({ category }) => {
  const { sessionId, cart, setCart, API_BASE_URL, isMobile } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      const productResponse = await fetch(`${API_BASE_URL}/api/products/related-products/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (productResponse.ok) {
        const productData = await productResponse.json();
        setProducts(productData);
        setLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const renderCategoryProducts = () => {
    return products.map((product) => {
        return (<div key={product.id} className={isMobile?'productcard-compact':'productcard'}>
        <ProductCard product = {product} compact={isMobile}/>
      </div>)
    });
  };

  if (!loaded) {
    return <div>Loading</div>;
  }

  if (products.length === 0) {
    return <div>Oops No Products. Site Not Updated</div>;
  }

  return (
    <div className='related-products'>{renderCategoryProducts()}</div>
  );
};

export default CategoryCards;
