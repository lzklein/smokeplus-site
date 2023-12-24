import React from 'react'
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const order = location.state?.order;

    console.log(order)
  return (
    <div>
      <h2>Checkout</h2>
      <h3>
        Pickup Time?
      </h3>
      {/* ASAP or SCHEDULE TIME (ASAP default to ~ 10 minutes from now) */}
    </div>
  )
}

export default Checkout