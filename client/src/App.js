// imports
import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './styles/computer/App.css';

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
import Checkout from './components/Checkout';
import OrderCheck from './components/OrderCheck';
import PopularAll from './components/PopularAll';
import DealsAll from './components/DealsAll';
import Search from './components/Search';
import CategoryMore from './components/CategoryMore';

// employee components
import EmployeeLogin from './components/employees/EmployeeLogin';
import EmployeeHome from './components/employees/EmployeeHome';
import Inbox from './components/employees/Inbox';
import ExcelUploader from './components/employees/ExcelUploader';
import BannerEdit from './components/employees/BannerEdit';
import InventoryEdit from './components/employees/InventoryEdit';
import DealsEdit from './components/employees/DealsEdit';
import PickPopular from './components/employees/PickPopular';
import Searchbar from './components/Searchbar';

// css
const loadMobileStyles = async () => {
  await import('./styles/mobile/App.css');
};

export const SessionContext = createContext();

const generateSessionId = () => {
  return uuidv4();
};

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [mobileLoading, setMobileLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);
  // ! Switch back to false before deploy
  const [authorized, setAuthorized] = useState(true);
  const [cart, setCart] = useState([]);
  const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

  useEffect(() => {
    let currentSession = localStorage.getItem('sessionId');
    if (!currentSession) {
      currentSession = generateSessionId();
      localStorage.setItem('sessionId', currentSession);
    }
    setSessionId(currentSession);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log('sessionId:', sessionId);
        const response = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
        const cartData = await response.json();
        setCart(cartData);
        await fetchBannerImages();
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [sessionId]);

  useEffect(() => {
    const loadMobileStylesIfNeeded = async () => {
      if (isMobile) {
        await loadMobileStyles();
        setMobileLoading(false);
      }
    };

    loadMobileStylesIfNeeded();
  }, [isMobile]);

  const addToCart = (product, itemQuantity = 1) => {
    const cartItem = {
      user: sessionId,
      product: product.id,
      quantity: itemQuantity,
    };

    const existingCartItem = cart.find((item) => item.product === cartItem.product);
    if (existingCartItem) {
      cartPatch(existingCartItem);
    } else {
      cartPost(cartItem);
    }
  };

  const cartPatch = async (cartItem) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/${cartItem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: cartItem.quantity + 1,
      }),
    });

    if (!response.ok) {
      console.error('Failed to update cart item:', response.statusText);
    } else {
      console.log('Cart item updated successfully');
      const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
      const updatedCartData = await updatedResponse.json();
      setCart(updatedCartData);
    }
  };

  const cartPost = async (cartItem) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItem,
        }),
      });

      if (!response.ok) {
        console.error('Failed to add item to cart:', response.statusText);
      } else {
        const updatedCartData = await response.json();
        console.log('Item added to cart successfully');
        setCart((prevState) => [...prevState, updatedCartData]);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  const fetchBannerImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banner/images`);
      if (response.ok) {
        const data = await response.json();
        setBannerImages(data.bannerImages);
      } else {
        console.error('Failed to fetch banner images');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if(!!loading){
    return(
      <div>Loading</div>
    )
  }

  if (isMobile){
    return (
      <SessionContext.Provider
        value={{ sessionId, cart, setCart, API_BASE_URL, addToCart, authorized, setAuthorized, isMobile }}
      >
        {loading || (isMobile && mobileLoading) ? (
          <div>Loading</div>
        ) : (
          <div className="App" id="root">
            <Searchbar/>
            <Header />
            <Routes>
            <Route path='/search' element={<Search />} />
              <Route path='/category/more/:category' element={<CategoryMore />} />
              <Route path="/banner/edit" element={<BannerEdit bannerImages={bannerImages}/>} />
              <Route path='/deals/edit' element={<DealsEdit/>}/>
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path='/popular/edit' element={<PickPopular/>}/>
              <Route path='/cart' element={<Cart />} />
              <Route path='/order/:id' element={<OrderCheck />}/>
              <Route path='/order' element={<Order />} />
              <Route path='/all' element={<AllProducts />} />
              <Route path='/categories' element={<Contact />} />
              <Route path='/popular/all' element={<PopularAll/>}/>
              <Route path='/deals/all' element={<DealsAll/>}/>
              <Route path='/checkout' element={<Checkout />}/>
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
        )}
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider
      value={{ sessionId, cart, setCart, API_BASE_URL, addToCart, authorized, setAuthorized, isMobile }}
    >
      {loading || (isMobile && mobileLoading) ? (
        <div>Loading</div>
      ) : (
        <div className="App" id="root">
          <Header />
          <Routes>
          <Route path='/search' element={<Search />} />
            <Route path='/category/more/:category' element={<CategoryMore />} />
            <Route path="/banner/edit" element={<BannerEdit bannerImages={bannerImages}/>} />
            <Route path='/deals/edit' element={<DealsEdit/>}/>
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path='/popular/edit' element={<PickPopular/>}/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/order/:id' element={<OrderCheck />}/>
            <Route path='/order' element={<Order />} />
            <Route path='/all' element={<AllProducts />} />
            <Route path='/categories' element={<Contact />} />
            <Route path='/popular/all' element={<PopularAll/>}/>
            <Route path='/deals/all' element={<DealsAll/>}/>
            <Route path='/checkout' element={<Checkout />}/>
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
      )}
    </SessionContext.Provider>
  );
};

export default App;