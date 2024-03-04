import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, price, setTotal, item, discount, url, sessionId, setCart, product }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleTotalChange = () => {
    const newQuantity = parseInt(quantity);
    const originalPrice = item.quantity * price;
    const difference = parseFloat((newQuantity * price) - originalPrice).toFixed(2);
    setTotal((prevTotal) => parseFloat(prevTotal) + parseFloat(difference));
  };

  const handleDropdownChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setQuantity(selectedValue);

    if (selectedValue === 10) {
      setIsInputMode(true);
    } else {
      handleTotalChange();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    setQuantity(inputValue);
  };

  const handleApplyClick = () => {
    if (!quantity) {
      handleDelete();
    } else if (quantity > max) {
      alert(`Quantity exceeds stock limit. Current number in stock: ${max}`);
      setQuantity(max);
    } else {
      handleTotalChange();
      changeQuantity();
    }
  };

  const changeQuantity = async () => {
    const response = await fetch(`${url}/api/cart/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      console.error('Failed to update cart item:', response.statusText);
    } else {
      console.log('Cart item updated successfully');
      const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
      const updatedCartData = await updatedResponse.json();
      setCart(updatedCartData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApplyClick();
  };

  return (
    <div className='cart-quantity'>
      <form onSubmit={handleSubmit}>
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
            <button type="submit" className='backbutton' style={{ marginTop: '3px' }}>
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
      </form>
    </div>
  );
};

export default CartQuantity;