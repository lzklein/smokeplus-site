import React from 'react'

const ProductCard = () => {

  const handleNavigate = () => {
    // navigate to /product/product.name or product.id or something
  }

  return (
    <div className="productcard" onClick={handleNavigate()}>
      <img/>
      <h4>Product name</h4>
      <p>Price</p>
    </div>
  )
}

export default ProductCard