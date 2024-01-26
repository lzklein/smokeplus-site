import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import { SessionContext } from '../App'; 

const OrderStatus = () => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const handleFindOrder = (e) => {
    e.preventDefault();
    const orderSearch = document.getElementById('orderNumber').value;
    findOrder(orderSearch);
  }

  const findOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
      if (response.ok) {
        const orderItem = await response.json();
        orderItem.cart = JSON.parse(orderItem.cart);
        navigate(`/order/${orderId}`, { state: { orderItem } });
      } else {
        console.error('Failed to find order:', response.status);
        setError(response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFindOrder}>
        <h1 style={{marginTop:'60px', marginBottom:'100px'}}>Enter your order number:</h1>
        <br/>
        {error?<p style={{color:'red'}}>Order number not found</p>:<p>&nbsp;</p>}
        <input type="text" id="orderNumber" placeholder="Order Number" style={{marginBottom:'30px', borderColor:error?'red':'initial'}}></input>
        <br/>
        <button type="submit" className="logbutton" style={{marginBottom:'300px'}}>Check Order Status</button>
      </form>
    </div>
  )
}

export default OrderStatus