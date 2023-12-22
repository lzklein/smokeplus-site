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
// TODO Order, Check Order, Related Items, Inbox, Categories, Banners, Deals/Popular, excel, finish css
const App = () => {

  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([])
  const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

  useEffect(() => {
    let currentSession = localStorage.getItem('sessionId');
    if (!currentSession) {
      currentSession = generateSessionId();
      localStorage.setItem('sessionId', currentSession);
    }
    setSessionId(currentSession)
  }, []);

  useEffect(()=>{
    const fetchCartItems = async () => {
      try {
        console.log("sessionId:",sessionId)
        const response = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
  
        const cartData = await response.json();
        console.log(cartData)
        setCart(cartData);
        console.log(cart)
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        console.log(cart)
        setLoading(false)
      }
    };
    fetchCartItems();
  },[sessionId])
  
  const addToCart = (product) => {
    const cartItem = {
      user: sessionId,
      product: product.id,
      quantity: 1,
    }
    // console.log(cart)
    cart.map((item)=>{console.log(item.product)})
    // console.log(cartItem.product)
    const existingCartItem = cart.find((item) => item.product === cartItem.product);
    if(existingCartItem){
      cartPatch(existingCartItem)
    }
    else{
      cartPost(cartItem);
    }
  }

  const cartPatch = async (cartItem) => {
    // console.log(cartItem)
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
      // Fetch updated cart items after successful update
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
        setCart((prevState)=>[...prevState, updatedCartData]);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  // ! Temp banner, change to useEffect fetch backend banner images
  const importAll = (r) => r.keys().map(r);
  const bannerImages = importAll(require.context('./img/banner', false, /\.(png|gif)$/));
  
  
  return (
    <SessionContext.Provider value={{sessionId, cart, setCart, API_BASE_URL, addToCart}}>
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
