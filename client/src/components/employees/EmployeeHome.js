import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeHome = () => {
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
        </ul>
      </nav>
    </div>
  )
}

export default EmployeeHome