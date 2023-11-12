import React from 'react';
import { Link } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left-nav">
        <NavLeft />
      </div>
      <div className="logo">
        <Link to="/">SMOKE PLUS</Link>
      </div>
      <div className="right-nav">
        <NavRight />
      </div>
    </header>
  );
}

export default Header;
