import React, {useState, useEffect, useContext} from 'react'
import { SessionContext } from '../App';
import ProductCard from './ProductCard';

const Deals = () => {
  const { sessionId, API_BASE_URL } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      const productResponse = await fetch(`${API_BASE_URL}/api/products/related-products/deals`, {
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
        return (<div key={product.id} className='productcard-compact'>
        <ProductCard product = {product} compact={true}/>
      </div>)
    });
  };

  if (!loaded) {
    return <div>Loading</div>;
  }

  if (products.length === 0) {
    return <div>
      --Currently No Deals--
    </div>;
  }

  return (
    <div className='related-products'>
      {renderCategoryProducts()}
      </div>
  );
}

export default Deals