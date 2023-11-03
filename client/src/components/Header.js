import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="left-nav">
        <Link to="/left">Left</Link>
      </div>
      <div className="logo">
        <Link to="/">SMOKE PLUS</Link>
      </div>
      <div className="right-nav">
        <Link to="/right">Right</Link>
      </div>
    </header>
  );
}

export default Header;