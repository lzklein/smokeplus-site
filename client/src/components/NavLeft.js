import React from 'react'
import { Link } from 'react-router-dom';

const NavLeft = () => {
  return (
    <div>
        <Link to="/all">All Products</Link>
        <Link to="/contact">Contact Us</Link>
    </div>
  )
}

export default NavLeft