import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App'; 

const Cart = () => {
  const { sessionId } = useContext(SessionContext);
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
  
        const cartData = await response.json();
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
        console.log(cart)
      }
    };
  
    fetchCartItems();
  }, [sessionId]);


  return (
    <div>
      {
        loading?
        <div>Loading</div>
        :
        <div>Cart</div>
      }
    </div>
  )
}

export default Cart