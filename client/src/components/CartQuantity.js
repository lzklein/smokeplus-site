import React, { useState } from 'react';

const CartQuantity = ({max}) => {
  const [quantity, setQuantity] = useState(1);
  const [isInputMode, setIsInputMode] = useState(false);

  const handleDropdownChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setQuantity(selectedValue);

    if (selectedValue === 10) {
      setIsInputMode(true);
    } else {
      setIsInputMode(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    setQuantity(inputValue);
  };

  const handleApplyClick = () => {
    // Remove the line that switches back to dropdown mode
    console.log(`Quantity applied: ${quantity}`);
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
            style={{ width: '50px', marginRight: '5px' }}
          />
          <button onClick={handleApplyClick} className='back-button'>Apply</button>
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
