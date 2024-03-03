import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import CartCard from './CartCard';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const navigate = useNavigate();
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [productDetails, setProductDetails] = useState([]);
  const [readyTimeMin, setReadyTimeMin] = useState('');
  const [readyTimeMax, setReadyTimeMax] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    const addMinMinutes = new Date(currentTime.getTime() + 10 * 60000);
    const addMaxMinutes = new Date(currentTime.getTime() + 15 * 60000);
    setReadyTimeMin(
      addMinMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    setReadyTimeMax(
      addMaxMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
  }, [cart, productDetails]);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to delete item:', response.statusText);
      } else {
        const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };


  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProductDetails = productDetails.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProductDetails(updatedProductDetails);
  };

  const renderCart = () => {
    return cart.map((item) => (
      <CartCard
        key={item.id}
        sessionId={sessionId}
        setCart={setCart}
        item={item}
        onDelete={() => handleDelete(item.id)}
        url={API_BASE_URL}
        order={false}
        onQuantityChange={(newQuantity) => handleQuantityChange(item.product, newQuantity)}
        productDetails={productDetails}
        setProductDetails={setProductDetails}
      />
    ));
  };

  const order = {
    id: uuidv4(),
    cart: cart,
    userId: sessionId,
  };

  const handleScheduleOrder = () => {
    navigate('/checkout', {
      state: { order: order, minTime: readyTimeMin, maxTime: readyTimeMax },
    });
  };

  useEffect(() => {
    const newSubtotal = productDetails.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    );
    setTotal(newSubtotal);
  }, [productDetails]);

  return (
    <div>
      {cart.length === 0 ? (
        <div style={{ marginTop: '100px', marginBottom: '500px' }}>
          <h1>Cart is empty</h1>
        </div>
      ) : (
        <div className='cart-container'>
          <h2 style={{ marginTop: '40px', marginBottom: '60px' }}>Cart</h2>
          {renderCart()}
          <h3 style={{ marginTop: '100px' }}>Subtotal: ${total.toFixed(2)}</h3>
          <h4>
            Your Order Will Be Ready Around {readyTimeMin} - {readyTimeMax}
          </h4>
          <button className='logbutton' onClick={handleScheduleOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
