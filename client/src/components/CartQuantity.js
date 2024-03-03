import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, value, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleDropdownChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setQuantity(selectedValue);
    onQuantityChange(selectedValue);

    if (selectedValue === 10) {
      setIsInputMode(true);
    } else {
      setIsInputMode(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    setQuantity(inputValue);
    onQuantityChange(inputValue); 
  };

  const handleApplyClick = () => {
    if (!quantity) {
      handleDelete();
    } else if (quantity > max) {
      alert(`Quantity exceeds stock limit. Maximum allowed: ${max}`);
      setQuantity(max);
      onQuantityChange(max); 
    } else {
      onQuantityChange(quantity);
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
          <button onClick={handleApplyClick} className='backbutton' style={{ marginTop: '3px' }}>
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
