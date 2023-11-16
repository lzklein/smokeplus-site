import React, { createContext, useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import cow from '../../img/cow.gif';
// routes

const EmployeeHome = () => {
  return (
    <div><h1>Smoke Plus Employees Portal</h1>
      <nav>
        <ul>
          <li><Link to="/inbox">Inbox</Link></li>
          <li><Link to='/upload'>Upload Excel</Link></li>
          <li><Link to="/banner/edit">Edit Banner</Link></li>
          <li><Link to='/inventory/edit'>Edit Inventory</Link></li> 
          <li><Link to='/product/edit'>Edit Product</Link></li>
        </ul>
      </nav>
      <img src={cow}/>
    </div>
  )
}

export default EmployeeHome