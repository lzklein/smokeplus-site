import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

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
  
  const renderProducts = () =>{
    return allProducts.map((product) => {
      return(
        <div>
          <ProductCard product={product}/>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>All Products</h1>
      {/* Render the list of products */}
      {renderProducts()}
    </div>
  );
};

export default AllProducts;


// add size + flavor araays (same as categories)