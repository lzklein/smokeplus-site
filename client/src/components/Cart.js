import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { SessionContext } from '../App'; 
import CartCard from './CartCard';
import { v4 as uuidv4 } from 'uuid';


const Cart = () => {
  const navigate = useNavigate();
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [total, setTotal] = useState(0);
  const [readyTimeMin, setReadyTimeMin] = useState('');
  const [readyTimeMax, setReadyTimeMax] = useState('');

  useEffect(() => {
    const currentTime = new Date();
    const addMinMinutes = new Date(currentTime.getTime() + 10 * 60000); // Adding 10 minutes in milliseconds
    const addMaxMinutes = new Date(currentTime.getTime() + 15 * 60000); // Adding 10 minutes in milliseconds
    setReadyTimeMin(addMinMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    setReadyTimeMax(addMaxMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  }, [cart, total]);

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
        console.log('Item removed cart successfully');
        // Fetch updated cart items after successful deletion
        const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  }

  const renderCart = () => {
    return cart.map((item) => (
      <CartCard key={item.id} sessionId = {sessionId} setCart = {setCart} item={item} onDelete={() => handleDelete(item.id)} setTotal={setTotal} />
    ));
  }

  function uuidToNumber(uuid) {
    const hexString = uuid.replace(/-/g, '').slice(0, 6);
    const numericValue = parseInt(hexString, 16);
    
    return numericValue.toString().padStart(6, '0');
  }
  

  const order = {
    id : uuidToNumber(uuidv4()),
    cart : cart,
    userId : sessionId
  }

  const handleScheduleOrder = () => {
    navigate('/checkout', { state: { order: order, minTime: readyTimeMin, maxTime: readyTimeMax } });
  }
  
  return (
    <div>
      {
        cart.length === 0 ?
        <div style={{marginTop:"100px", marginBottom:"500px"}}>
          <h1>Cart is empty</h1>
        </div>
        :
        <div className='cart-container'>
          <h2 style={{marginTop:'40px', marginBottom:'50px'}}>Cart</h2>
          {renderCart()}
          <h3>Subtotal: ${total.toFixed(2)}</h3>
          <h4>Your Order Will Be Ready Around {readyTimeMin} - {readyTimeMax}</h4>
          <button className="logbutton" onClick={handleScheduleOrder}>Place Order</button>
        </div>
      }
    </div>
  )
}

export default Cart;
