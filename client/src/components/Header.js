import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App'; 


const Header = () => {
  const { sessionId, cart, isMobile } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const location = useLocation();

  const handleBurger = () => {
    setIsOpen(!isOpen);
    setHidden(!hidden);
  };

  useEffect(() => {
    setIsOpen(false);
    setHidden(true);
  }, [location.pathname]);

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
        <NavLeft />
      </div>

      <div className="right-nav" style={{ userSelect: 'none' }}>
        <NavRight cart={cart}/>
      </div>
      {/* <button className='logbutton' onClick={()=>{console.log(sessionId)}}>boop</button> */}
    </header>
  );
}

export default Header;
