// Inbox.jsx

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';
import OrderCard from './OrderCard';
import io from 'socket.io-client';
import bell from './sfx/bell.mp3';

const Inbox = () => {
  const navigate = useNavigate();
  const { API_BASE_URL, authorized } = useContext(SessionContext);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const socket = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      hasInteractedRef.current = true;
    };
    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socket.current = io(API_BASE_URL);

    // Notify new order
    socket.current.on('orderPost', () => {
      console.log('New order received');
      //! showNotification('New Order Received');
      fetchOrders();
    });

    socket.current.on('updateInbox', () => {
      console.log('Order Expired');
      fetchOrders();
    });

    // Unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  function playSound(soundFilePath, volume = 1.0) {
    if (hasInteractedRef.current) {
      const audio = new Audio(soundFilePath);

      // adjust volume
      audio.volume = volume;

      audio.play().catch((error) => {
        console.error('Failed to play sound:', error);
      });
    }
  }

  function showNotification(message) {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Order Notification', {
        body: message,
      });

      // play sound
      // ! playSound(bell, 0.4);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`);
      if (response.ok) {
        const orderList = await response.json();

        // parse the carts
        const ordersWithParsedCart = orderList.map((order) => {
          return {
            ...order,
            cart: JSON.parse(order.cart),
          };
        });

        setOrders(ordersWithParsedCart);
        setLoaded(true);

        // Notification and sfx on fetch
        //! showNotification('New Order Received');
      } else {
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Order ${orderId} deleted`);
        fetchOrders(); // refetch to refresh
      } else {
        console.error('Failed to delete order:', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const renderOrders = () => {
    return orders.map((order) => {
      return <OrderCard key={order.id} order={order} onComplete={deleteOrder} />;
    });
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

  if (loaded) {
    return (
      <div>
        <h1 style={{ marginTop: '40px', marginBottom: '20px' }}>Inbox</h1>
        {renderOrders()}
        <button className="backbutton" onClick={() => navigate(-1)}>
          {"<< Back"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Inbox</h1>
      <p>Loading...</p>
    </div>
  );
};

export default Inbox;
