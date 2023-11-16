// imports
import './styles/App.css';
import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Order from './components/OrderStatus';
import Contact from './components/Contact';
import AllProducts from './components/AllProducts';
import Deals from './components/Deals';
import Popular from './components/Popular';

// employee components
import EmployeeLogin from './components/employees/EmployeeLogin';
import EmployeeHome from './components/employees/EmployeeHome';
import Inbox from './components/employees/Inbox';
import ExcelUploader from './components/employees/ExcelUploader';
import BannerEdit from './components/employees/BannerEdit';
import ProductEdit from './components/employees/ProductEdit';
import InventoryEdit from './components/employees/InventoryEdit';


// TODO sessionid create/check on open
const App = () => {


  
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/all' element={<AllProducts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/deals' element={<Deals/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/employee-login' element={<EmployeeLogin/>}/>
        <Route path='/employee' element={<EmployeeHome/>}/>
        <Route path="/inventory/edit" element={<InventoryEdit/>} />
        <Route path="/inbox" element={<Inbox/>} />
        <Route path="/upload" element={<ExcelUploader/>} />
        <Route path="/banner/edit" element={<BannerEdit/>} />
        <Route path="/product/edit" element={<ProductEdit/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
