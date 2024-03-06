import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../App';
import CartQuantity from './CartQuantity';

const CartCard = ({ sessionId, setTotal, setCart, item, url, order }) => {
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
    if(!!product.deals){
      const discount = (product.deals * 0.01) * fullPrice;
      return parseFloat(fullPrice - discount).toFixed(2);
    }
    else{
      return fullPrice
    }
  }

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
  
    let formattedName = productName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    if (formattedName.length >= 25) {
      formattedName = formattedName.slice(0, 25) + "...";
    }
  
    if (product.categories && product.categories.includes("Tobacco")) {
      formattedName += "*";
    }
  
    return formattedName;
  };
  
  

  if(!!order){
    return(
      <div className='cartcard'>
        <img style={isMobile?null:{marginLeft:'25vw'}} src={product.image} className='cart-img' alt={product.name} />
        <h3 style={isMobile?{maxWidth:'20vw', marginLeft:'-150px'}:{marginRight:'25vw'}}>{product.name} {product.flavors} {product.sizes} {isMobile? null: item.quantity}</h3>
        {isMobile?<h3 style={{marginLeft:'-80px'}}>{item.quantity}</h3>:null}
      </div>
    )
  }

 return (
    <div>
      {loaded ? (
        <div className='cartcard'>
          <div className='cart-left'>
            <h3 style={isMobile ? { marginLeft: '10px', textAlign:'left' } : { marginLeft: '300px', textAlign:'left' }}>{getProductName()}</h3>
          </div>
          <div className='cart-right'>
            {isMobile && (
              product.deals ? <p>${getPrice(product.price)}</p> : <p>${(product.price * item.quantity).toFixed(2)}</p>
            )}
            <div className='cart-quantity' style={isMobile ? { paddingLeft: '120px', paddingRight:'50px' } : null}>
              <CartQuantity
                max={product.quantity}
                handleDelete={handleDelete}
                price={getPrice(product.price)}
                setTotal={setTotal}
                item={item}
                discount={getPrice}
                url={url}
                sessionId={sessionId}
                setCart={setCart}
                product={product}
              />
            </div>
          </div>
          {!isMobile && <br />}
          {!isMobile && (product.deals ? <p>${getPrice(product.price)}</p> : <p>${(product.price * item.quantity).toFixed(2)}</p>)}
          <button className="backbutton" onClick={handleDelete} style={{ marginRight: '300px', marginLeft: '30px', marginTop: '16px' }}>{isMobile?'x':'Remove from Cart'}</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CartCard;