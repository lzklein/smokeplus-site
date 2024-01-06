import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App'; 

// import '../styles/Header.css';

const Header = () => {
  const { sessionId, cart } = useContext(SessionContext);

  return (
    <header className="header">
      <div className="left-nav">
        <NavLeft />
      </div>
      <div className="logo">
        <Link to="/">SMOKE PLUS</Link>
      </div>
      <div className="right-nav">
        <NavRight cart={cart}/>
      </div>
      {/* <button className='logbutton' onClick={()=>{console.log(sessionId)}}>boop</button> */}
    </header>
  );
}

export default Header;
