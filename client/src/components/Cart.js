import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App'; 
import CartCard from './CartCard';

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
        console.log(cartData)
        setCart(cartData);
        console.log(cart)
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
        console.log(cart)
      }
    };
  
    fetchCartItems();
  }, [sessionId]);

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
      <CartCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />
    ));
  }

  return (
    <div>
      {
        loading ?
        <div>Loading</div>
        :
        <div>
          <h3>Cart</h3>
          {renderCart()}
        </div>
      }
    </div>
  )
}

export default Cart;
