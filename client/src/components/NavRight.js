import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { SessionContext } from '../App'; 

const NavRight = ({cart}) => {
  const { isMobile } = useContext(SessionContext);

  if (isMobile){
    return (
      <div>
          <Link to="/cart" className="headnav" style={{ marginLeft:'10px', fontSize:'20px', fontWeight:'500'}}>Cart ({cart.length})</Link>
      </div>
    )
  }

  return (
    <div style={{marginRight:'20px'}}>
        <Link to="/all" className="headnav" style={{marginRight:'50px', fontSize:'20px', fontWeight:'500'}}>All Products</Link>
        {/* <Link to="/categories" className="headnav" style={{marginRight:'50px', fontSize:'20px', fontWeight:'500'}}>Top Categories</Link> */}
        <Link to="/order" className="headnav" style={{marginRight:'50px', fontSize:'20px', fontWeight:'500'}}>Order Status</Link>
        <Link to="/cart" className="headnav" style={{marginRight:'50px', fontSize:'20px', fontWeight:'500'}}>Cart ({cart.length})</Link>
    </div>
  )
}

export default NavRight