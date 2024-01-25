import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SessionContext } from '../App'; 

const Checkout = () => {
    const location = useLocation();
    const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
    const [loaded, setLoaded] = useState(false);
    const minTime = location.state?.minTime;  
    const maxTime = location.state?.maxTime;  
    const order = location.state?.order;
    const navigate = useNavigate();

    useEffect(() => {
        const postOrderAndDeleteCart = async () => {
            try {
                // Post the order
                console.log('post order')
                console.log(order)
                const orderResponse = await fetch(`${API_BASE_URL}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order),
                });

                if (!orderResponse.ok) {
                    console.error('Failed to post order:', orderResponse.statusText);
                    return;
                }

                console.log('Order posted successfully');

                // Delete the cart
                const cartDeletionResponse = await fetch(`${API_BASE_URL}/api/cart/deleteBySessionId/${sessionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!cartDeletionResponse.ok) {
                    console.error('Failed to delete cart:', cartDeletionResponse.statusText);
                    return;
                }
                else {
                    setCart([]);
                }

                console.log('Cart deleted successfully');

                setLoaded(true);
            } catch (error) {
                console.error('Error posting order and deleting cart:', error.message);
            }
        };

        postOrderAndDeleteCart();
    }, [order, sessionId, API_BASE_URL]);

    if (!loaded) {
        return <h1>Placing Order...</h1>;
    }

    return (
        <div>
            <h1 style={{marginTop:'40px'}}>Order Confirmed!</h1>
            <h2 style={{marginTop:'20px'}}>Your order number is {order.id}</h2>
            <h3 style={{marginTop:'40px'}}>
                It will be ready for pickup around {minTime}
                {' - '}
                {maxTime}
            </h3>
            <h3 style={{marginTop:'20px'}}>Payment will be made at the store</h3>
            <h4>Please have your payment method ready before entering the store</h4>

            <button className='logbutton' onClick={()=>{navigate('/')}} style={{marginTop:'50px', marginBottom:'50px'}}>Back to Home</button>
        </div>
    );
}

export default Checkout;
