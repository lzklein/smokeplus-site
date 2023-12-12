import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

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

  const renderProducts = () => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
