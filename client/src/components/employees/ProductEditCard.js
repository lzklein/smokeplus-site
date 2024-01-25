import React, { useState, useEffect } from 'react';
import EditProductForm from './EditProductForm';
import Modal from 'react-modal';

const ProductCard = ({ product, handleDeleteProduct, onSubmit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  useEffect(()=>{
    Modal.setAppElement('#root');
  },[])

  return (
    <div className="product-edit-card">
      <img src={product.image} className='cardimage' alt={product.name} />
      <p>{product.id}</p>
      <h4>
        {product.name}{" "}{product.flavors}{" "}{product.sizes}
      </h4>
      <p>
        Qty: {product.quantity} | ${parseFloat(product.price).toFixed(2)}
      </p>
      <br />
      <button className="backbutton" onClick={() => handleDeleteProduct(product.id)}> Delete </button>
      <button className="backbutton" style={{ marginLeft: "3px" }} onClick={openEditModal}> Edit </button>

      {isEditModalOpen && (
        <EditProductForm
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          product={product}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

export default ProductCard;
