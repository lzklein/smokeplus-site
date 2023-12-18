// imports
import './styles/App.css';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Order from './components/OrderStatus';
import Contact from './components/Categories';
import AllProducts from './components/AllProducts';
import Deals from './components/Deals';
import Popular from './components/Popular';
import ProductPage from './components/ProductPage';

// employee components
import EmployeeLogin from './components/employees/EmployeeLogin';
import EmployeeHome from './components/employees/EmployeeHome';
import Inbox from './components/employees/Inbox';
import ExcelUploader from './components/employees/ExcelUploader';
import BannerEdit from './components/employees/BannerEdit';
import InventoryEdit from './components/employees/InventoryEdit';
import DealsEdit from './components/employees/DealsEdit';

export const SessionContext = createContext();

const generateSessionId = () => {
  return uuidv4();
};

// TODO sessionid create/check on open
// TODO Cart, Order, Check Order, Related Items, Inbox, Categories, Banners, Deals/Popular, excel, finish css
const App = () => {

  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentSession = localStorage.getItem('sessionId');
    if (!currentSession) {
      currentSession = generateSessionId();
      localStorage.setItem('sessionId', currentSession);
    }
    setSessionId(currentSession)
    setLoading(false)
  }, []);
  
  // ! Temp banner, change to useEffect fetch backend banner images
  const importAll = (r) => r.keys().map(r);
  const bannerImages = importAll(require.context('./img/banner', false, /\.(png|gif)$/));
  
  
  return (
    <SessionContext.Provider value={{sessionId}}>
    {loading?
    <div>
      Loading
    </div>
    :
    <div className="App">
      <Header />
      <Routes>        
        <Route path="/banner/edit" element={<BannerEdit bannerImages={bannerImages}/>} />
        <Route path='/deals/edit' element={<DealsEdit/>}/>
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/all' element={<AllProducts />} />
        <Route path='/categories' element={<Contact />} />
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
    }
    </SessionContext.Provider>
  );
}

export default App;
