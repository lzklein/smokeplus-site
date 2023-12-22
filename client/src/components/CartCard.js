import React, {useEffect, useState} from 'react'

const CartCard = ({sessionId, setCart, item, onDelete, setTotal}) => {
    const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

    const [loaded, setLoaded] = useState(false)
    const [product,setProduct] = useState([]);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/api/products/${item.product}`);
              if (response.ok) {
                const productData = await response.json();
                console.log(productData)
                setProduct(productData);
                setTotal((prevTotal) => prevTotal + productData.price * item.quantity);
                setLoaded(true)
              } else {
                console.error('Failed to fetch products:', response.status);
              }
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };
          fetchProduct();
    },[])

    const moreQuantity = async () => {
      // console.log(item)
      console.log(item.id)
      const response = await fetch(`${API_BASE_URL}/api/cart/${item.id}`, {
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
        const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
        const updatedCartData = await updatedResponse.json();
        setCart(updatedCartData);
        setTotal((prevTotal) => prevTotal += product.price);
      }
    };

    const lessQuantity = async () => {
      // console.log(item)
      if (item.quantity > 1) {
        const response = await fetch(`${API_BASE_URL}/api/cart/${item.id}`, {
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
          const updatedResponse = await fetch(`${API_BASE_URL}/api/cart?sessionId=${sessionId}`);
          const updatedCartData = await updatedResponse.json();
          setCart(updatedCartData);
          setTotal((prevTotal) => prevTotal -= product.price);

        }
      } else if (item.quantity === 1) {
        handleDelete()
      }
    };

    const handleDelete = () => {
      const confirmed = window.confirm('Remove this item from cart?');
      const productTotal = product.price * item.quantity;
      if (confirmed) {
        onDelete();
        setTotal((prevTotal)=>prevTotal -= productTotal)
      }
    }
  return (
    <div>
    {loaded?
        <div className='cartcard'>
            <h3>{product.name}</h3>
            <div className='cart-left'>
              <img src={product.image} className='cart-img'/>
            </div>
            <div className='cart-right'>
              <p>${(product.price*item.quantity).toFixed(2)}</p>
              <div className="number">
                <span className="minus" onClick={lessQuantity}>-</span>
                <input type="text" readOnly value={item.quantity}/>
                <span className="plus" onClick={moreQuantity}>+</span>
              </div>     
            </div>
            <br/>
            <button className="backbutton" onClick={handleDelete}>Remove</button>
            {/* <button onClick={()=>{console.log(item)}}>test</button>
            <button onClick={()=>{console.log(product)}}>test2</button> */}
        </div>
        :
        <div>
        </div>
    }
    </div>


  )
}

export default CartCard