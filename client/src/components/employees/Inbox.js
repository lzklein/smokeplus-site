import React, { useContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { SessionContext } from '../../App'; 

const Inbox = () => {
  const navigate= useNavigate();
  const { sessionId, cart, setCart, API_BASE_URL } = useContext(SessionContext);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders`);
        if (response.ok) {
          const orderList = await response.json();
          setOrders(orderList);
          console.log(orderList)
          setLoaded(true);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
  },[])

  if(loaded){
    return (
      <div>
        <h1>Inbox</h1>
        
        <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
      </div>
    )
  }

  return(
    <div>
      <h1>Inbox</h1>
      <p>Loading...</p>
      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default Inbox