import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';

const PickPopular = () => {
  const { API_BASE_URL, authorized } = useContext(SessionContext);
  const [allProducts, setAllProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [notPopularProducts, setNotPopularProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (response.ok) {
        const productList = await response.json();
        const initialPopularProducts = productList.filter(product => !!product.popular);
        const initialNotPopularProducts = productList.filter(product => !product.popular);

        setAllProducts(productList);
        setPopularProducts(initialPopularProducts);
        setNotPopularProducts(initialNotPopularProducts);
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductSearchString = (product) => {
    return `${product.name} ${product.flavors} ${product.sizes}`;
  };

  const handlePopularChange = async (productId, value) => {
    try {
      const popularValue = value === '' ? 0 : parseFloat(value);

      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productChanges:{
            popular: popularValue,
          }
        }),
      });

      if (response.ok) {
        console.log(`Product ${productId} popularity updated to ${popularValue}`);
      } else {
        console.error('Failed to update product popularity:', response.status);
      }
    } catch (error) {
      console.error('Error updating product popularity:', error);
    }
  };

  const handleCheckboxChange = (productId, isPopular) => {
    setAllProducts(
        allProducts.map((product) => {
        if (product.id === productId) {
          const updatedProduct = { ...product, popular: !product.popular };

          if (product.popular) {
            setNotPopularProducts((prev) => [...prev, updatedProduct]);
            setPopularProducts((prev) => prev.filter((p) => p.id !== productId));
          } else {
            setPopularProducts((prev) => [...prev, updatedProduct]);
            setNotPopularProducts((prev) => prev.filter((p) => p.id !== productId));
          }

          return updatedProduct;
        }

        return product;
      })
    );
  };

  const handleApplyPopular = async () => {
    // checked as 1
    await Promise.all(
      popularProducts.map(async (product) => {
        await handlePopularChange(product.id, 1);
      })
    );

    // unchecked as 0
    await Promise.all(
      notPopularProducts.map(async (product) => {
        await handlePopularChange(product.id, 0);
      })
    );

    // update changes to page
    fetchProducts();
  };

  const renderProducts = (products) => {
    const filteredProducts = products.filter((product) =>
      getProductSearchString(product).toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
        {filteredProducts.map((product) => (
          <li key={product.id} style={{ marginBottom: '10px', marginLeft: '15vw' }}>
            <label style={{ display: 'flex', alignItems: 'center', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={product.popular}
                onChange={() => handleCheckboxChange(product.id, product.popular)}
              />
              <span style={{ marginLeft: '5px' }}>{product.name} {product.flavors} {product.sizes}</span>
            </label>
          </li>
        ))}
      </ul>
    );
  };
  

  if (!authorized) {
    return (
      <div>
        <h1>ERROR</h1>
        <h1>Unauthorized User</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Select Popular Products</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="product-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form onSubmit={(e) => e.preventDefault()} style={{ margin: '20px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
          <h2 style={{ marginLeft: '2vw' }}>Not Popular Products</h2>
            {renderProducts(notPopularProducts)}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginLeft: '2vw' }}>Popular Products</h2>
            {renderProducts(popularProducts)}
          </div>
        </div>
        <button
          type="button"
          className="backbutton"
          style={{ marginTop: '13px', marginLeft: '5px' }}
          onClick={handleApplyPopular}
        >
          Apply Popular
        </button>
      </form>
      <button className="backbutton" onClick={() => navigate(-1)}>
          {"<< Back"}
        </button>
    </div>
  );
};

export default PickPopular;
