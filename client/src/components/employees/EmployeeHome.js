import React, { createContext, useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// routes

const EmployeeHome = () => {
  return (
    <div><h1>Smoke Plus Employees Portal</h1>
      <nav>
        <ul className='employee-menu'>
          <li className='employee-link'><Link to="/inbox">Inbox</Link></li>
          <li className='employee-link'><Link to='/upload'>Upload Excel</Link></li>
          <li className='employee-link'><Link to="/banner/edit">Edit Banner</Link></li>
          <li className='employee-link'><Link to='/inventory/edit'>Edit Inventory</Link></li> 
          <li className='employee-link'><Link to='/deals/edit'>Edit Deals</Link></li>
          <li className='employee-link'><Link to='/popular/edit'>Select Popular Items</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default EmployeeHome