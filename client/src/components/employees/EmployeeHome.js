import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App'; 

const EmployeeHome = () => {

  const { setAuthorized} = useContext(SessionContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setAuthorized(false);
    localStorage.removeItem('authorized');
    navigate('/');
  };

  return (
    <div><h1>Smoke Plus Employees Portal</h1>
      <nav>
        <ul className='employee-menu'>
          <Link to="/inbox" className='employee-link'>
            <li>Inbox</li>
          </Link>
          <Link to='/upload' className='employee-link'>
            <li>Upload Excel</li>
          </Link>
          <Link to="/banner/edit" className='employee-link'>
            <li>Edit Banner</li>
          </Link>
          <Link to='/inventory/edit' className='employee-link'>
            <li>Edit Inventory</li>
          </Link>
          <Link to='/deals/edit' className='employee-link'>
            <li>Edit Deals</li>
          </Link>
          <Link to='/popular/edit' className='employee-link'>
            <li>Select Popular Items</li>
          </Link>
          <Link to='/tax' className='employee-link'>
            <li>Edit Tax Rate</li>
          </Link>
          <Link to='/backup' className='employee-link'>
            <li>Save Backup</li>
          </Link>
          <button onClick={handleLogout} className='employee-link'>
            <li>Logout</li>
          </button>
        </ul>
      </nav>
    </div>
  )
}

export default EmployeeHome