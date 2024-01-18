import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../App'; 

const CartCard = ({ sessionId, setTotal, setCart, item, url, order }) => {
  const { cart, API_BASE_URL, isMobile } = useContext(SessionContext);
  const [loaded, setLoaded] = useState(false);
  const [product, setProduct] = useState([]);
  const [initSet, setInitSet] = useState(true);
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

  useEffect(()=>{
    if(!initSet){
      if(!order){
        // console.log(product)
        if(!!product.deals){
          setTotal((prevTotal) => prevTotal + getPrice(product.price) * item.quantity)
          setInitSet(true)
          return;
        }
        else{
          setTotal((prevTotal) => prevTotal + product.price * item.quantity)
          setInitSet(true)
          return;
        }
      }
    }
    setInitSet(false)
  }, [product])

  const getPrice = (fullPrice) => {
    const discount = (product.deals * 0.01) * fullPrice;
    return parseFloat(fullPrice - discount).toFixed(2);
  }

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
        if(!!product.deals){
          setTotal((prevTotal) => {
            // console.log('prevTotal:',prevTotal, typeof(prevTotal));
            // console.log('price:',getPrice(product.price, typeof(getPrice(product.price))));
            return prevTotal + parseFloat(getPrice(product.price));
          });
        }
        else{
          setTotal((prevTotal) => prevTotal + product.price);
        }
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
        const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
        if(!!product.deals){
          setTotal((prevTotal) => prevTotal - getPrice(product.price));
        }
        else{
          setTotal((prevTotal) => prevTotal - product.price);
        }
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
        if(!!product.deals){
          setTotal((prevTotal) => prevTotal - getPrice(product.price)*item.quantity)
        }
        else{
          setTotal((prevTotal) => prevTotal - getPrice(product.price) * item.quantity);
        }      }
    }
  };

  const getProductName = () => {
    const productName = product.name.toLowerCase() + " " + product.flavors.toLowerCase() + " " + product.sizes.toLowerCase();
  
    const formattedName = productName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedName;
  };

  if(!!order){
    return(
      <div className='cartcard'>
        <img style={{marginLeft:'25vw'}} src={product.image} className='cart-img' alt={product.name} />
        <h3 style={{marginRight:'25vw'}}>{product.name} {product.flavors} {product.sizes} - {item.quantity}</h3>
      </div>
    )
  }

  return (
    <div>
      {loaded ? (
        <div className='cartcard'>
          <h3 style={isMobile ? { marginLeft: '10px' } : { marginLeft: '300px' }}>{getProductName()}</h3>
          <div className='cart-left'>
            <img src={product.image} className='cart-img' alt={product.name} />
          </div>
          <div className='cart-right'>
            {isMobile && (
              product.deals ? <p>${getPrice(product.price)}</p> : <p>${(product.price * item.quantity).toFixed(2)}</p>
            )}
            <div className="cart-quantity">
              <span className="minus" onClick={lessQuantity} style={{ marginTop: '12px', marginRight: '-1px' }}>-</span>
              <input
                type="text"
                className='counter'
                readOnly
                value={item.quantity}
              />
              <span className="plus" onClick={moreQuantity} style={{ marginTop: '12px', marginLeft: '-1px' }}>+</span>
            </div>
          </div>
          {!isMobile && <br />}
          {!isMobile && (product.deals ? <p>${getPrice(product.price)}</p> : <p>${(product.price * item.quantity).toFixed(2)}</p>)}
          {isMobile? null: <button className="backbutton" onClick={handleDelete} style={{ marginRight: '300px', marginLeft: '30px', marginTop: '16px' }}>Remove from Cart</button>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
};

export default CartCard;