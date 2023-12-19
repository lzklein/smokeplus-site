import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App'; 
import CartCard from './CartCard';

const Cart = () => {
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);


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
        cart.length == 0 ?
        <div>
          <h2>Cart is empty</h2>
        </div>
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
