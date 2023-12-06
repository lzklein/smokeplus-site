import React, { useState, useEffect } from 'react';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Adjust the API endpoint as needed
        if (response.ok) {
          const products = await response.json();
          setAllProducts(products);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    // Call the fetchAllProducts function
    fetchAllProducts();
  }, []); // The empty dependency array ensures that this effect runs once on mount

  return (
    <div>
      <h1>All Products</h1>
      {/* Render the list of products */}
      <ul>
        {allProducts.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
