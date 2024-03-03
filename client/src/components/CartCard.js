import React, { useEffect, useState, useContext } from 'react';
import CartQuantity from './CartQuantity';
import { SessionContext } from '../App';

const CartCard = ({
  sessionId,
  setCart,
  item,
  url,
  order,
  onQuantityChange,
  onDelete,
  setTotal,
}) => {
  const { isMobile } = useContext(SessionContext);
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

  const getPrice = (fullPrice) => {
    const discount = (product.deals * 0.01) * fullPrice;
    return parseFloat(fullPrice - discount).toFixed(2);
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
        const updatedResponse = await fetch(`${url}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
        if (!!product.deals) {
          setTotal((prevTotal) => prevTotal - getPrice(product.price) * item.quantity);
        } else {
          setTotal((prevTotal) => prevTotal - getPrice(product.price) * item.quantity);
        }
      }
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

  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(item.product, newQuantity);
  };

  useEffect(() => {
    if (!initSet || !product || !item) {
      return;
    }

    if (!order) {
      if (!!product.deals) {
        setProductDetails([...productDetails, { id: item.product, name: getProductName(), quantity: item.quantity, price: getPrice(product.price) }]);
      } else {
        setProductDetails([...productDetails, { id: item.product, name: getProductName(), quantity: item.quantity, price: product.price }]);
      }
    }

    setInitSet(false);
  }, [item.quantity, product, order, setTotal, initSet]);

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
            <div className='cart-quantity'>
              <CartQuantity
                max={product.quantity}
                handleDelete={handleDelete}
                value={item.quantity}
                onQuantityChange={handleQuantityChange}
                setTotal={setTotal}
              />
            </div>
          </div>
          {!isMobile && <br />}
          {!isMobile && (product.deals ? <p>${getPrice(product.price)}</p> : <p>${(product.price * item.quantity).toFixed(2)}</p>)}
          {isMobile ? null : <button className="backbutton" onClick={handleDelete} style={{ marginRight: '300px', marginLeft: '30px', marginTop: '16px' }}>Remove from Cart</button>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CartCard;
