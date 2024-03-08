// imports
import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Checkout from './components/Checkout';
import OrderCheck from './components/OrderCheck';
import PopularAll from './components/PopularAll';
import DealsAll from './components/DealsAll';
import Search from './components/Search';
import CategoryMore from './components/CategoryMore';
import SubcategoryMore from './components/SubcategoryMore';
import BrandMore from './components/BrandMore';

// employee components
import EmployeeLogin from './components/employees/EmployeeLogin';
import EmployeeHome from './components/employees/EmployeeHome';
import Inbox from './components/employees/Inbox';
import ExcelUploader from './components/employees/ExcelUploader';
import BannerEdit from './components/employees/BannerEdit';
import InventoryEdit from './components/employees/InventoryEdit';
import DealsEdit from './components/employees/DealsEdit';
import PickPopular from './components/employees/PickPopular';
import Tax from './components/employees/Tax';

// css
const loadMobileStyles = async (isMobile) => {
  const cssFileName = isMobile ? 'mobile/App.css' : 'computer/App.css';
  await import(`./styles/${cssFileName}`);
};

export const SessionContext = createContext();

const generateSessionId = () => {
  return uuidv4();
};

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 932);
  const [mobileLoading, setMobileLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);
  const [isModal, setIsModal] = useState(false);
  // ! Switch back to false before deploy
  const [authorized, setAuthorized] = useState(false);
  const [cart, setCart] = useState([]);
  // ! Website url here vv
  const API_BASE_URL = 'https://smokeplus-api.onrender.com';
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    const loadIfMobile = async () => {
      await loadMobileStyles(isMobile);
      setMobileLoading(false);
    };
    loadIfMobile();
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

  const routes = [
    { path: '/search', element: <Search /> },
    { path: '/tax', element: <Tax /> },
    { path: '/category/more/:category', element: <CategoryMore /> },
    { path: '/subcategory/more/:subcategory', element: <SubcategoryMore /> },
    { path: '/brand/more/:brand', element: <BrandMore /> },
    { path: '/banner/edit', element: <BannerEdit bannerImages={bannerImages} /> },
    { path: '/deals/edit', element: <DealsEdit /> },
    { path: '/products/:productId', element: <ProductPage /> },
    { path: '/popular/edit', element: <PickPopular /> },
    { path: '/cart', element: <Cart /> },
    { path: '/order/:id', element: <OrderCheck /> },
    { path: '/order', element: <Order /> },
    { path: '/all', element: <AllProducts /> },
    { path: '/categories', element: <Contact /> },
    { path: '/popular/all', element: <PopularAll /> },
    { path: '/deals/all', element: <DealsAll /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/deals', element: <Deals /> },
    { path: '/popular', element: <Popular /> },
    { path: '/employee-login', element: <EmployeeLogin /> },
    { path: '/employee', element: <EmployeeHome /> },
    { path: '/inventory/edit', element: <InventoryEdit /> },
    { path: '/inbox', element: <Inbox /> },
    { path: '/upload', element: <ExcelUploader /> },
    { path: '/', element: <Home bannerImages={bannerImages} /> },
  ];

  if (!!loading) {
    return (
      <div class="drawing" id="loading">
        <div class="loading-dot"></div>
      </div>
    );
  }

  return (
    <SessionContext.Provider
      value={{ sessionId, cart, setCart, API_BASE_URL, addToCart, authorized, setAuthorized, isMobile, isModal, setIsModal }}
    >
      <div className="App" id="root">
        <Header />
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </SessionContext.Provider>
  );
};

export default App;
