// imports
import './App.css';
import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// banner images
import hero1 from './img/hero1.png';
import hero2 from './img/hero2.png';
import hero3 from './img/hero3.png';
import hero4 from './img/hero4.png';

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
const App = () => {
  const images = [
    hero1,
    hero2,
    hero3,
    hero4
    // Add more image URLs as needed
  ];
  
  return (
    <div className="App">
      <Header />
      <Banner images={images} />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/all' element={<AllProducts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
