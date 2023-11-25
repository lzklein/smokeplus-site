import React from 'react'

const OrderStatus = () => {
  // if order number doesn't exist, 404 => alert(Could not find order number, please double check)
  // if exist, nav => order/order.id
  return (
    <div>
      <form>
        <h4>Enter your order number:</h4>
        <br/>
        <input type="text" placeholder="Order Number"></input>
        <br/>
        <button type="submit" className="logbutton">Check Order Status</button>
      </form>
    </div>
  )
}

export default OrderStatus