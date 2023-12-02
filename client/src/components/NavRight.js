import React from 'react'
import { Link } from 'react-router-dom';

const NavRight = () => {
  return (
    <div>
        <Link to="/order" style={{"margin-left":"80px", "margin-right":"80px"}}>Order Status</Link>
        <Link to="/cart" >Cart (0{/* cart.length() */})</Link>
    </div>
  )
}

export default NavRight