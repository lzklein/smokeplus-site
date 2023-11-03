// imports
import './App.css';
import React, {createContext, useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

// TODO sessionid create/check on open

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
