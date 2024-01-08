import React from 'react'
import { Link } from 'react-router-dom';

const NavRight = ({cart}) => {
  return (
    <div style={{marginRight:'20px'}}>
        <Link to="/all" className="headnav" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>All Products</Link>
        <Link to="/categories" className="headnav" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>Shop by Category</Link>
        <Link to="/order" className="headnav" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>Order Status</Link>
        <Link to="/cart" className="headnav" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>Cart ({cart.length})</Link>
    </div>
  )
}

export default NavRight