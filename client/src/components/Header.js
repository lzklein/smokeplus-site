import React, { useContext } from 'react';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App'; 

const Header = () => {
  const { sessionId, cart, isMobile } = useContext(SessionContext);

  if(isMobile){
    return(
      <header className="header" style={{ userSelect: 'none' }}>
      <div className="left-nav">
        <NavLeft />
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
