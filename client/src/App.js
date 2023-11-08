// imports
import './App.css';
import React, {createContext, useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Order from './components/OrderStatus';
import Contact from './components/Contact';
import AllProducts from './components/AllProducts';
import Banner from './components/Banner';

// TODO sessionid create/check on open

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <Routes>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/all' element={<AllProducts/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
