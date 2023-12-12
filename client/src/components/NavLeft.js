import React from 'react'
import { Link } from 'react-router-dom';

const NavLeft = () => {
  return (
    <div>
        <Link to="/all" className="headnav">All Products</Link>
        <Link to="/categories" className="headnav" style={{"margin-left":"80px", "margin-right":"80px"}}>Shop by Category</Link>
    </div>
  )
}

export default NavLeft