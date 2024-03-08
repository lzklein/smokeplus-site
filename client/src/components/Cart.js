import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';
import CartCard from './CartCard';

const Cart = () => {
  const navigate = useNavigate();
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [total, setTotal] = useState(0);
  const [readyTimeMin, setReadyTimeMin] = useState('');
  const [readyTimeMax, setReadyTimeMax] = useState('');
  const [orderName, setOrderName] = useState('');
  const [tax, setTax] = useState(0)

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tax`);
        if (!response.ok) {
          throw new Error(`Failed to fetch tax rate: ${response.statusText}`);
        }
        
        const data = await response.json();
        setTax(data.taxRate/100);
      } catch (error) {
        console.error('Error fetching tax rate:', error.message);
      }
    };

    fetchTaxRate();
  }, []);

  useEffect(() => {
    const currentTime = new Date();
    const addMinMinutes = new Date(currentTime.getTime() + 10 * 60000); // Adding 10 minutes
    const addMaxMinutes = new Date(currentTime.getTime() + 15 * 60000); // Adding 15 minutes
    setReadyTimeMin(
      addMinMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    setReadyTimeMax(
      addMaxMinutes?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
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
        const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    const newSubtotal = updatedCart.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
    setTotal(newSubtotal);
  };

  const renderCart = () => {
    return cart.map((item) => (
      <CartCard
        key={item.id}
        sessionId={sessionId}
        setCart={setCart}
        item={item}
        onDelete={() => handleDelete(item.id)}
        setTotal={setTotal}  
        url={API_BASE_URL}
        order={false}
        onQuantityChange={handleQuantityChange}
      />
    ));
  };
  
  const order = {
    cart: cart,
    userId: sessionId,
  };

  const handleScheduleOrder = (e) => {
    e.preventDefault();
    console.log('order', order)
    console.log('name', orderName)
    if(!orderName){
      alert('please enter a name for the order');
      return;
    }
    else if(orderName.length>11){
      alert('please enter a shorter name');
      return;
    }
    else{
      navigate('/checkout', {
        state: { order: order, name:orderName, minTime: readyTimeMin, maxTime: readyTimeMax },
      });
    }
  };

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
          <h4 style={{ marginTop: '2px', marginLeft:'30px' }}>Tax: ${(total*tax).toFixed(2)}</h4>
          <h3 style={{ marginTop: '2px' }}>Total: ${(total+(total*tax)).toFixed(2)}</h3>
          <h4 style={{marginTop:'2px'}}>
            Your Order Will Be Ready Around {readyTimeMin} - {readyTimeMax}
          </h4>
          <form onSubmit={handleScheduleOrder}>
            <div>
              <input
                type="text"
                style={{marginTop:'10px'}}
                placeholder="Name for pickup..."
                value={orderName}
                onChange={(e) => {
                  setOrderName(e.target.value);
                }}
              />
            </div>
            <div>
              <button className="logbutton" type="submit" style={{ marginTop: '10px' }}>
                Place Order
              </button>
            </div>
          </form>
          <h4>*Tobacco products may be subject to additional taxes during payment instore</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
