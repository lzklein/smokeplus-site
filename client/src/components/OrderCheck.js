import React, {useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CartCard from './CartCard'
import { SessionContext } from '../App'; 

const OrderCheck = () => {
    const { sessionId, setCart, API_BASE_URL } = useContext(SessionContext);
    const location = useLocation();
    const order = location.state?.orderItem;  

    const renderCard = () => {
        return order.cart.map((item) => (
          <CartCard key={item.id} sessionId = {sessionId} setCart = {setCart} item={item} url={API_BASE_URL} order={true}/>
        ));
      }

  return (
    <div>
        <h1 style={{marginBottom:'10px'}}>Your Order</h1>
        <h2 style={{marginBottom:'40px'}}>Order Number {order.id}</h2>
        {renderCard()}
    </div>
  )
}

export default OrderCheck