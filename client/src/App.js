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
import InventoryEdit from './components/employees/InventoryEdit';
import DealsEdit from './components/employees/DealsEdit';


// TODO sessionid create/check on open
const App = () => {

  // ! Temp banner, change to useEffect fetch backend banner images
  const importAll = (r) => r.keys().map(r);
  const bannerImages = importAll(require.context('./img/banner', false, /\.(png|gif)$/));
  
  return (
    <div className="App">
      <Header />

      <Routes>        
        <Route path="/banner/edit" element={<BannerEdit bannerImages={bannerImages}/>} />
        <Route path='/deals/edit' element={<DealsEdit/>}/>
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
        <Route path="/" element={<Home bannerImages={bannerImages}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
