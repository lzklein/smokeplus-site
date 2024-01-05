import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';
import OrderCard from './OrderCard';
import io from 'socket.io-client';
import bell from './sfx/bell.mp3';

const Inbox = () => {
    const navigate = useNavigate();
    const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
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
            //! playSound(bell, 0.4);
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders`);
            if (response.ok) {
                const orderList = await response.json();
                setOrders(orderList);
                setLoaded(true);

                // Trigger the notification and sound on successful fetch
                showNotification('New Order Received');
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

    const renderOrders = () => {
        return orders.map((order) => {
            return <OrderCard key={order.id} order={order} />;
        });
    };

    if (loaded) {
        return (
            <div>
                <h1>Inbox</h1>
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
            <button className="backbutton" onClick={() => navigate(-1)}>
                {"<< Back"}
            </button>
        </div>
    );
};

export default Inbox;
