import React, { useContext, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { SessionContext } from '../App'; 

const AllProducts = () => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
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
  }, []);

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
      <h1>All Products</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="product-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="productcard-container">{renderProducts()}</div>
    </div>
  );
};

export default AllProducts;
