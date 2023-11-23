import React from 'react'
import {useNavigate} from 'react-router-dom';

// create full list of products, click on to go into product edit
const InventoryEdit = () => {
  const navigate= useNavigate();

  return (
    <div>InventoryEdit

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default InventoryEdit