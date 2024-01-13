// CategoryMore.js
import React, { useContext, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { SessionContext } from '../App';
import { useParams } from 'react-router-dom';

const CategoryMore = () => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/${category}`);
        if (response.ok) {
          const productList = await response.json();
          setAllProducts(productList);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const getProductSearchString = (product) => {
    return `${product.name} ${product.flavors} ${product.sizes}`;
  };

  const renderProducts = () => {
    const filteredProducts = allProducts.filter((product) =>
      getProductSearchString(product).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredProducts.map((product) => (
      <div key={product.id} className="productcard">
        <ProductCard product={product} />
      </div>
    ));
  };

  return (
    <div>
      <h1 style={{ marginTop: '50px', marginBottom: '30px' }}>All {category}</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="product-search"
        style={{ marginBottom: '40px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="productcard-container">{renderProducts()}</div>
    </div>
  );
};

export default CategoryMore;
