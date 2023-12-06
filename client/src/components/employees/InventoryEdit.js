import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductForm from './NewProductForm'; // Adjust the import path based on your file structure

const InventoryEdit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNewProductSubmit = (newProductData) => {
    // Handle the submission of the new product data (e.g., make a POST request)
    console.log('New Product Data:', newProductData);
  };

  return (
    <div>
      <h1>InventoryEdit</h1>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <br />
      <button className="backbutton" onClick={openModal}>
        + New Product
      </button>

      {/* Render the NewProductForm as a modal */}
      <NewProductForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handleNewProductSubmit} />
    </div>
  );
};

export default InventoryEdit;
