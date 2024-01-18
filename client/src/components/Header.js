import React, { useState, useContext } from 'react';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App'; 


const Header = () => {
  const { sessionId, cart, isMobile } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleBurger = () => {
    setIsOpen(!isOpen);
  };

  if(isMobile){
    return(
      <header className="header" style={{ userSelect: 'none' }}>
      <div className="left-nav">
        <div className={`hamburger-container ${isOpen ? 'open' : ''}`} onClick={handleBurger}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </div>
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
