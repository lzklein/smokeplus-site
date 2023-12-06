import React, { useState } from 'react';
import Modal from 'react-modal';

const NewProductForm = ({ isOpen, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    categories: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: productName.trim() === '' ? 'This field must be filled out' : '',
      categories: productCategories.trim() === '' ? 'This field must be filled out' : '',
      price: productPrice.trim() === '' ? 'This field must be filled out' : '',
      quantity: productQuantity.trim() === '' ? 'This field must be filled out' : '',
      description: productDescription.trim() === '' ? 'This field must be filled out' : '',
      image: productImage.trim() === '' ? 'This field must be filled out' : '',
    };

    setErrors(newErrors);

    // Check if any field has an error
    return Object.values(newErrors).some((error) => error !== '');
  };

  const closeModal = () => {
    setErrors({}); // Reset the errors state
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      // If there are validation errors, do not submit the form
      return;
    }
  
    try {
      const response = await fetch('http://your-backend-url/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          categories: productCategories,
          price: productPrice,
          quantity: productQuantity,
          description: productDescription,
          image: productImage,
        }),
      });
  
      if (!response.ok) {
        // Handle errors, you might want to throw an error or log it
        throw new Error('Failed to submit the form');
      }
  
      // Reset form fields and errors, and close the modal
      setProductName('');
      setProductCategories('');
      setProductPrice('');
      setProductQuantity('');
      setProductDescription('');
      setProductImage('');
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={errors.name && 'error'}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Categories:
            <input
              type="text"
              value={productCategories}
              onChange={(e) => setProductCategories(e.target.value)}
              className={errors.categories && 'error'}
            />
            {errors.categories && <span className="error-message">{errors.categories}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={errors.price && 'error'}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Quantity:
            <input
              type="text"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className={errors.quantity && 'error'}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={errors.description && 'error'}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Image:
            <input
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              className={errors.image && 'error'}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </label>
        </div>
        <button type="submit" className="logbutton">Submit</button>
      </form>
    </Modal>
  );
};

export default NewProductForm;
