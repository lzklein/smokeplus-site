// OrderCard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../App';

const OrderCard = ({ order, onComplete }) => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [hidden, setHidden] = useState(true);
  const [products, setProducts] = useState([]);

  const getPickuptime = () => {
    const date = new Date(order.createdAt);
    const pickupTime = new Date(date.getTime() + 10 * 60000); // 60000 milliseconds in a minute
    return `${pickupTime.getUTCHours()}:${pickupTime.getUTCMinutes()}`;
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = [];

      for (const item of order.cart) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/products/${item.product}`);
          if (response.ok) {
            const productData = await response.json();
            productDetails.push(productData);
          } else {
            console.error('Failed to fetch product details:', response.status);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }

      setProducts(productDetails);
    };

    fetchProductDetails();
  }, [order]);

  const renderCartList = () => {
    return products.map((product, index) => (
      <li key={index} style={{ userSelect: 'none' }}>
        {product.name} ({product.price}) -{order.cart[index].quantity}-
      </li>
    ));
  };

  return (
    <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onClick={() => setHidden(!hidden)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px', userSelect: 'none' }}>
          Order # {order.id} | Pickup Time: {getPickuptime()}
        </h3>
        <button className='backbutton' style={{ marginTop: '13.5px', marginLeft: '20px' }} onClick={() => onComplete(order.id)}>
          Complete
        </button>
      </div>
      {hidden ? null : <ul>{renderCartList()}</ul>}
    </div>
  );
};

export default OrderCard;
