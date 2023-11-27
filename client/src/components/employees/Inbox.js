import React from 'react'
import {useNavigate} from 'react-router-dom';

const Inbox = () => {
  const navigate= useNavigate();
  // every midnight delete all inbox items/all "confirmed" items or something
  return (
    <div>Inbox

      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default Inbox