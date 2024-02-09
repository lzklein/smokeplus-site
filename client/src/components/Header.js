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
  const [openCategory, setOpenCategory] = useState('');
  const [openSubcategory, setOpenSubcategory] = useState('');
  const [categoryData, setCategoryData] = useState({});

  useEffect(()=>{

  },[])

  const handleBurger = () => {
    setIsOpen(!isOpen);
    setHidden(!hidden);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsOpen(false);
    setHidden(true);
  }, [location.pathname]);

  const handleCategory = (e) => {
    if(e.target.value == openCategory){
      setOpenCategory('')
    }
    else{
      setOpenCategory(e.target.value)
    }
  }

  const handleSubcategory = (e) => {
    if(e.target.value == openCategory){
      setOpenSubcategory('')
    }
    else{
      setOpenSubcategory(e.target.value)
    }
  }

  if(isMobile){
    return(
      <header className="header" style={{ userSelect: 'none' }}>
      <div className="left-nav">
        <div className={`hamburger-container ${isOpen ? 'open' : ''}`} onClick={handleBurger}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <Link to="/" style={{marginLeft:'50px', fontSize:'30px', fontWeight:'500'}}>SMOKE PLUS</Link>
      </div>
      {!hidden && (
          <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <Link to="/all" className="hamburger-link" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>All Products</Link>
            <Link to="/categories" className="hamburger-link" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>Top Categories</Link>
            <Link to="/order" className="hamburger-link" style={{marginRight:'100px', fontSize:'20px', fontWeight:'500'}}>Order Status</Link>
          </div>
        )}
        
      <div className="right-nav" style={{ userSelect: 'none' }}>
        <NavRight cart={cart}/>
      </div>
    </header>
    )
  }

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