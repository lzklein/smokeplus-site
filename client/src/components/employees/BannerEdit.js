import React from 'react'
import {useNavigate} from 'react-router-dom';

const BannerEdit = () => {
  const navigate= useNavigate();

  return (
    <div>BannerEdit
      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>

  )
}

export default BannerEdit