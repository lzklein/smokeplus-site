import React from 'react'
import { Link } from 'react-router-dom';

const NavLeft = () => {
  return (
    <div>
        <Link to="/all" className="headnav">All Products</Link>
        <Link to="/categories" className="headnav" style={{marginLeft:"80px", marginRight:"80px"}}>Shop by Category</Link>
    </div>
  )
}

export default NavLeft