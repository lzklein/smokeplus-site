import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, price, setTotal, item }) => {
    console.log(item)
  const [quantity, setQuantity] = useState(item.quantity);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleTotalChange = (e) => {
    console.log(e.target.value)
    console.log(quantity)
    const newQuantity = parseInt(e.target.value, 10);
    console.log(newQuantity)
    console.log(price)
    const originalPrice = quantity*price
    console.log(originalPrice)
    const difference = (newQuantity*price)-originalPrice
    console.log(difference)
    setTotal((prevTotal)=>prevTotal+parseInt(difference,10))
    setQuantity(newQuantity)
  }

  const handleDropdownChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    console.log(selectedValue)
    setQuantity(selectedValue);

    if (selectedValue === 10) {
      setIsInputMode(true);
    } else {
      setIsInputMode(false);
      handleTotalChange(e)
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    setQuantity(inputValue);
    handleTotalChange(e)
  };

  const handleApplyClick = () => {
    if (!quantity) {
      handleDelete();
    } else if (quantity > max) {
      alert(`Quantity exceeds stock limit. Maximum allowed: ${max}`);
      setQuantity(max);
    }

  };

  return (
    <div className='cart-quantity'>
      {isInputMode ? (
        <>
          <input
            type='number'
            min='1'
            max={max}
            value={quantity}
            onChange={handleInputChange}
            style={{ width: '80px', marginRight: '5px' }}
          />
          <button onClick={handleApplyClick} className='backbutton' style={{marginTop:'3px'}}>
            Apply
          </button>
        </>
      ) : (
        <select value={quantity} onChange={handleDropdownChange}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <option key={value} value={value}>
              {value === 10 ? '10+' : value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CartQuantity;
