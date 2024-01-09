import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';

const PickPopular = () => {
  const { sessionId, cart, setCart, API_BASE_URL, authorized } = useContext(SessionContext);
  const [allProducts, setAllProducts] = useState([]);
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
        setAllProducts(productList);
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

  const handleDealChange = async (productId, value) => {
    try {
      const dealsValue = value === '' ? 0 : parseFloat(value);

      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deals: dealsValue,
        }),
      });

      if (response.ok) {
        console.log(`Product ${productId} deals updated to ${dealsValue}`);
        fetchProducts();
      } else {
        console.error('Failed to update product deals:', response.status);
      }
    } catch (error) {
      console.error('Error updating product deals:', error);
    }
  };

  const renderProducts = () => {
    const filteredProducts = allProducts.filter((product) =>
      getProductSearchString(product).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id} style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight:'10px' }} />
                <p>
                  {product.name} {product.flavors} {product.sizes}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
      
    }
      
  if(!authorized){
    return(
      <div>
        <h1>
          ERROR
        </h1>
        <h1>Unauthorized User</h1>
      </div>
    )
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{margin:'20px'}}
        >
      <ul>{renderProducts()}</ul>

          <button type='submit' className='backbutton' style={{marginTop:'13px', marginLeft:'5px'}}>Apply Popular</button>
        </form>
    </div>
  );
};

export default PickPopular;
