import React, { useState } from 'react';

const CartQuantity = () => {
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
    setIsInputMode(false);
    console.log(`Quantity applied: ${quantity}`);
  };

  return (
    <div className='cart-quantity'>
      {isInputMode ? (
        <>
          <input
            type='number'
            min='1'
            value={quantity}
            onChange={handleInputChange}
          />
          <button onClick={handleApplyClick}>Apply</button>
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
