import React from 'react'
import { Link } from 'react-router-dom';

//TODO add hover effect
// ? Take hamburger from mobile and add to desktop
const NavLeft = () => {
  return (
    <div>
      <div className="logo">
        <Link to="/" style={{marginLeft:'30px', fontSize:'30px', fontWeight:'500'}}>SMOKE PLUS</Link>
      </div>
    </div>
  )
}

export default NavLeft