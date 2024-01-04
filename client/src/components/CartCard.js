import React, { useEffect, useState } from 'react';

const CartCard = ({ sessionId, setCart, item, url, order }) => {
  const [loaded, setLoaded] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${url}/api/products/${item.product}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
          setLoaded(true);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  const moreQuantity = async () => {
    if (item.quantity < product.quantity) {
      const response = await fetch(`${url}/api/cart/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity + 1,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update cart item:', response.statusText);
      } else {
        console.log('Cart item updated successfully');
        // Fetch updated cart items after successful update
        const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    } else {
      alert('No more in stock');
    }
  };

  const lessQuantity = async () => {
    if (item.quantity > 1) {
      const response = await fetch(`${url}/api/cart/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity - 1,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update cart item:', response.statusText);
      } else {
        console.log('Cart item updated successfully');
        // Fetch updated cart items after successful update
        const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    } else if (item.quantity === 1) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Remove this item from cart?');
    if (confirmed) {
      const response = await fetch(`${url}/api/cart/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to delete cart item:', response.statusText);
      } else {
        console.log('Cart item deleted successfully');
        // Fetch updated cart items after successful delete
        const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
      }
    }
  };

  if(!!order){
    return(
      <div className='cartcard'>
        <img style={{marginLeft:'800px'}} src={product.image} className='cart-img' alt={product.name} />
        <h3 style={{marginRight:'800px'}}>{product.name} {product.flavors} {product.sizes} - {item.quantity}</h3>
      </div>
    )
  }

  return (
    <div>
      {loaded ? (
        <div className='cartcard'>
          <h3 style={{marginLeft:'300px'}}>{product.name} {product.flavors} {product.sizes}</h3>
          <div className='cart-left'>
            <img src={product.image} className='cart-img' alt={product.name} />
          </div>
          <div className='cart-right'>
            <div className="number">
              <span className="backbutton" onClick={lessQuantity} style={{marginTop:'12px', marginRight:'2px'}}>-</span>
              <input type="text" style={{ maxWidth: '50px' }} readOnly value={item.quantity} />
              <span className="backbutton" onClick={moreQuantity} style={{marginTop:'12px', marginLeft:'2px'}}>+</span>
            </div>
          </div>
          <br />            
          <p>${(product.price * item.quantity).toFixed(2)}</p>
          <button className="backbutton" onClick={handleDelete} style={{marginRight:'300px', marginLeft:'30px', marginTop:'16px'}}>Remove from Cart</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CartCard;