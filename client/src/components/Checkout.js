import React from 'react'
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const order = location.state?.order;

    console.log(order)
  return (
    <div>Checkout</div>
  )
}

export default Checkout