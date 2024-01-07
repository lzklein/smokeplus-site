import React, { useContext, useState, useEffect } from 'react';
import { Link, Routes, Route , useNavigate} from 'react-router-dom';
import { SessionContext } from '../../App'; 

const DealsEdit = () => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate= useNavigate();

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

    // all products import, maybe a search bar
    // input number field, checkbox next to each item
    // submit button, each checked item add input number (default 0) to product.deals
    //! if deals =/= 0, cross off price and next to price display price * (product.deals/100)
    // items where product.deals =/= 0 display as already checked, with input as product.deals
    // uncheck to remove deal
    // add button to filter only items with deals
    // also add button to remove all deals

    const renderProducts = () => {
      const filteredProducts = allProducts.filter((product) =>
        getProductSearchString(product).toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return filteredProducts.map((product) => (
        <li key={product.id}>
         {product.name} {product.flavors} {product.sizes}
        </li>
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
        <ul>{renderProducts()}</ul>
      </div>
    );
}

export default DealsEdit