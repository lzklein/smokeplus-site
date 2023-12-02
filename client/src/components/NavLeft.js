import React from 'react'
import { Link } from 'react-router-dom';

const NavLeft = () => {
  return (
    <div>
        <Link to="/all" >All Products</Link>
        <Link to="/contact" style={{"margin-left":"80px", "margin-right":"80px"}}>Contact Us</Link>
    </div>
  )
}

export default NavLeft