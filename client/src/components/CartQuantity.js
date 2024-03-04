import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, value, price, setTotal }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleTotalChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    const originalPrice = quantity*price
    const difference = originalPrice-(newQuantity*price)
    setTotal((prevTotal)=>prevTotal+difference)
    setQuantity(newQuantity)
  }

  const handleDropdownChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
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
