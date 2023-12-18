import React from 'react'
import { Link } from 'react-router-dom';

const NavRight = ({cart}) => {
  return (
    <div>
        <Link to="/order" className="headnav" style={{"margin-left":"80px", "margin-right":"80px"}}>Order Status</Link>
        <Link to="/cart" className="headnav">Cart ({cart.length})</Link>
    </div>
  )
}

export default NavRight