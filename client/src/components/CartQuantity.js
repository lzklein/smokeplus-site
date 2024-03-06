import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, price, setTotal, item, discount, url, sessionId, setCart, product }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleTotalChange = (newQuantity) => {
    const quantityParse = parseInt(newQuantity);
    const originalPrice = item.quantity * price;
    const difference = parseFloat((quantityParse * price) - originalPrice);
    setTotal((prevTotal) => parseFloat(prevTotal) + parseFloat(difference));
    changeQuantity(newQuantity)
  };

  const handleDropdownChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);

    if (selectedValue === 0){
      deleteCheck()
    }

    setQuantity(selectedValue);

    if (selectedValue === 10) {
      setIsInputMode(true);
    } else {
      handleTotalChange(selectedValue);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    setQuantity(inputValue);
    handleTotalChange(inputValue);
  };

  const deleteCheck = () => {
    handleDelete();
    setQuantity(1);
    handleTotalChange(1)
    return;
  }

  const handleApplyClick = async (e, inputValue) => {
    if (!quantity) {
      deleteCheck()
    } else if (quantity > max) {
      alert(`Quantity exceeds stock limit. Current number in stock: ${max}`);
      setQuantity(max);
      handleTotalChange(max);
    } else {
      setQuantity(inputValue)
      handleTotalChange(inputValue);
    }
  };
  
  const changeQuantity = async (newQuantity) => {
    const response = await fetch(`${url}/api/cart/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: newQuantity,
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
    console.log('e.target', e.target);
    console.log('e.target.value', e.target.value);
    const inputValue = document.querySelector('.quantity-input').value;
    console.log(inputValue)
    handleApplyClick(e, inputValue);
  };

  return (
    <div className='cart-quantity'>
      <form onSubmit={handleSubmit}>
        {isInputMode ? (
          <>
            <input
              type='number'
              min='0'
              className='quantity-input'
              max={max}
              defaultValue={quantity}
              style={{ width: '80px', marginRight: '5px' }}
            />
            <button type="submit" className='backbutton' style={{ marginTop: '3px' }}>
              Apply
            </button>
          </>
        ) : (
          <select value={quantity} onChange={handleDropdownChange}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <option key={value} value={value}>
                {value === 0 ? '0 (Remove)' : value === 10 ? '10+' : value}
              </option>
            ))}
          </select>
        )}
      </form>
    </div>
  );
};

export default CartQuantity;