import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const minTime = location.state?.minTime;  // Updated to minTime
    const maxTime = location.state?.maxTime;  // Updated to maxTime
    const order = location.state?.order;
    const navigate = useNavigate();
    console.log(order)
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
