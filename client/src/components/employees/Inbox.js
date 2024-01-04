import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const Inbox = () => {
  const navigate= useNavigate();
  const [orders, setOrders] = useState([]);

  return (
    <div>Inbox

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default Inbox