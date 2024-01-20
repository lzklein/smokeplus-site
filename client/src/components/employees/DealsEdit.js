import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';

const DealsEdit = () => {
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
          productChanges: {
            deals: dealsValue,
          },
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

    return filteredProducts.map((product) => (
      <li key={product.id}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDealChange(product.id, e.target.elements.deals.value);
          }}
          style={{margin:'20px'}}
        >
          <p>
            {product.name} {product.flavors} {product.sizes}
          </p>
          <input
            type="number"
            step="any"
            name="deals"
            defaultValue={product.deals}
            min="0"
            max="100"
            style={{maxWidth:'100px'}}
          />
          <button type='submit' className='backbutton' style={{marginTop:'13px', marginLeft:'5px'}}>Apply Deal</button>
        </form>
      </li>
    ));
  };

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
      <h1>Edit Deals</h1>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <br/>
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
};

export default DealsEdit;
