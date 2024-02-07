import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App'; 


const Header = () => {
  const { cart, isMobile } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleBurger = () => {
    setIsOpen(!isOpen);
    setHidden(!hidden);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsOpen(false);
    setHidden(true);
  }, [location.pathname]);

  return (
    <header className="header" style={{ userSelect: 'none' }}>
      <div className="left-nav">
        <nav role="navigation">
          <div id="menuToggle" onClick={handleBurger}>
            <input type="checkbox" />

            <span></span>
            <span></span>
            <span></span>

            <ul id="menu" className={isMenuOpen ? 'isMenuOpen' : ''}>
              <a href="#"><li>Home</li></a>
              <a href="#"><li>About</li></a>
              <a href="#"><li>Info</li></a>
              <a href="#"><li>Contact</li></a>
            </ul>
          </div>
        </nav>
        <NavLeft />
      </div>

      <div className={`right-nav ${isMenuOpen ? 'isMenuOpen' : ''}`} style={{ userSelect: 'none' }}>
        <NavRight cart={cart}/>
      </div>
    </header>
  );
}

export default Header;