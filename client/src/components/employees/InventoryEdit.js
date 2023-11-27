import React from 'react'
import {useNavigate} from 'react-router-dom';

// create full list of products, click on to go into product edit
// x key to delete with confirmation
// maybe add new product button
const InventoryEdit = () => {
  const navigate= useNavigate();

  return (
    <div>InventoryEdit

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default InventoryEdit