import React, { useState, useEffect } from 'react';

const CartQuantity = ({ max, handleDelete, price, setTotal, item, discount, url, sessionId, setCart, product }) => {
    console.log(item)
  const [quantity, setQuantity] = useState(item.quantity);
  const [isInputMode, setIsInputMode] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleTotalChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    const originalPrice = quantity*price
    console.log(originalPrice)
    const difference = (newQuantity*price)-originalPrice
    const formattedDifference = parseFloat(difference);
    setTotal((prevTotal) => (parseFloat(prevTotal) + Number(formattedDifference)).toFixed(2));
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
        if(!!product.deals){
          setTotal((prevTotal) => {
            return prevTotal + parseFloat(discount(product.price));
          });
        }
        else{
          setTotal((prevTotal) => prevTotal + product.price);
        }
      }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleApplyClick();
    setIsInputMode(false);
    handleTotalChange(quantity);
    changeQuantity();
  }

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
            <button type="submit" className='backbutton' style={{marginTop:'3px'}}>
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
