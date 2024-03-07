import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, price, setTotal, item, discount, url, sessionId, setCart, product }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState(quantity)

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const discountedPrice = discount(product, item)

  const handleTotalChange = (newQuantity) => {
    console.log(product)
    console.log(item)
    console.log(discountedPrice)
    console.log(newQuantity)
    const quantityParse = parseInt(newQuantity);
    console.log(quantityParse)
    const originalPrice = item.quantity * price;
    console.log(item)
    console.log(item.quantity)
    console.log(price)
    console.log(originalPrice)
    const difference = parseFloat((quantityParse * price) - originalPrice);
    console.log(difference)
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

  const deleteCheck = () => {
    handleDelete();
    setQuantity(1);
    setInputValue(1)
    handleTotalChange(1)
    return;
  }

  const handleApplyClick = async (e, inputValue) => {
    if (!inputValue || parseInt(inputValue, 10) === 0) {
      deleteCheck()
    } else if (inputValue > max) {
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
      const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
      const updatedCartData = await updatedResponse.json();
      setCart(updatedCartData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              defaultValue={quantity}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: '80px', marginRight: '5px' }}
            />
            <button type="submit" className='backbutton' style={{ marginTop: '8px' }}>
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