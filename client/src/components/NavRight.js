import React from 'react'
import { Link } from 'react-router-dom';

const NavRight = () => {
  return (
    <div>
        <Link to="/order">Order Status</Link>
        <Link to="/cart">Cart</Link>
    </div>
  )
}

export default NavRight