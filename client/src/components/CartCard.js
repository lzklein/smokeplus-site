import React, {useEffect, useState} from 'react'

const CartCard = ({item, onDelete, setTotal}) => {
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

  return (
    <div>
    {loaded?
        <div>
            <h3>{product.name}</h3>
            <img src={product.image} className='cart-img'/>
            <p>${product.price*item.quantity}</p>
            <button>-</button> <p>Qty: {item.quantity}</p> <button>+</button>
            <br/>
            <button className="backbutton" onClick={onDelete}>Delete</button>
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