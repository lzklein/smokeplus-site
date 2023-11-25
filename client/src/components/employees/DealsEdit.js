import React, { createContext, useState, useEffect } from 'react';
import { Link, Routes, Route , useNavigate} from 'react-router-dom';

const DealsEdit = () => {
    // all products import, maybe a search bar
    // input number field, checkbox next to each item
    // submit button, each checked item add input number (default 0) to product.deals
    //! if deals =/= 0, cross off price and next to price display price * (product.deals/100)
    // items where product.deals =/= 0 display as already checked, with input as product.deals
    // uncheck to remove deal
    // add button to filter only items with deals
    // also add button to remove all deals
    const navigate= useNavigate();

  return (
    <div>
        DealsEdit
        <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
    </div>
  )
}

export default DealsEdit