import React, { useState } from 'react';
import Modal from 'react-modal';

const NewProductForm = ({ isOpen, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState(['']);
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productUPC, setProductUPC] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    categories: [],
    price: '',
    quantity: '',
    description: '',
    upc: '',
    image: '',
  });
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [submittedImage, setSubmittedImage] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: productName.trim() === '' ? 'This field must be filled out' : '',
      categories: productCategories.map((category) => (category.trim() === '' ? 'This field must be filled out' : '')),
      price: !/^\d+(\.\d{1,2})?$/.test(productPrice) ? 'Enter a valid price (up to 2 decimal places)' : '',
      quantity: !/^\d+$/.test(productQuantity) ? 'Enter a valid quantity (whole number)' : '',
      description: productDescription.trim() === '' ? 'This field must be filled out' : '',
      image: !imageFile && !isImageRemoved ? 'Upload an image file' : '',
    };

    setErrors(newErrors);

    // Check if any field has an error
    return Object.values(newErrors).some((error) => error !== '');
  };

  const handleAddCategory = () => {
    setProductCategories([...productCategories, '']);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...productCategories];
    updatedCategories.splice(index, 1);
    setProductCategories(updatedCategories);
  };

  const handleChangeCategory = (index, value) => {
    const updatedCategories = [...productCategories];
    updatedCategories[index] = value;
    setProductCategories(updatedCategories);
  };


  const handleImageInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setIsImageRemoved(false);
      setSubmittedImage(true);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setIsImageRemoved(true);
    setSubmittedImage(false);
  };

  const closeModal = () => {
    setProductName('');
    setProductCategories(['']);
    setProductPrice('');
    setProductQuantity('');
    setProductDescription('');
    setProductUPC('');
    setImageFile(null);
    setErrors({});
    setIsImageRemoved(false);
    setSubmittedImage(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('categories', JSON.stringify(productCategories));
      formData.append('price', parseFloat(productPrice));
      formData.append('quantity', parseInt(productQuantity));
      formData.append('description', productDescription);
      formData.append('upc', parseInt(productUPC));
      formData.append('image', submittedImage ? null : imageFile);

      onSubmit(formData);

      setProductName('');
      setProductCategories(['']);
      setProductPrice('');
      setProductQuantity('');
      setProductDescription('');
      setProductUPC('');
      setImageFile(null);
      setErrors({});
      setIsImageRemoved(false);
      setSubmittedImage(false);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      {isOpen && (
        <>
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
                {productCategories.map((category, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => handleChangeCategory(index, e.target.value)}
                      className={(errors.categories && errors.categories[index]) ? 'error' : ''}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => handleRemoveCategory(index)}>
                        -
                      </button>
                    )}
                    {index === productCategories.length - 1 && (
                      <button type="button" onClick={handleAddCategory}>
                        +
                      </button>
                    )}
                    {errors.categories && errors.categories[index] && <span className="error-message">{errors.categories[index]}</span>}
                  </div>
                ))}
              </label>
            </div>
            <div className="form-group">
              <label>
                Price:
                <input
                  type="number"
                  step="0.01"
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
                  type="number"
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
                UPC:
                <input
                  type="number"
                  value={productUPC}
                  onChange={(e) => setProductUPC(e.target.value)}
                  className={errors.upc && 'error'}
                />
                {errors.upc && <span className="error-message">{errors.upc}</span>}
              </label>
            </div>
            <div className="form-group">
              <label>
                Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageInputChange}
                  className={(errors.image || isImageRemoved) && 'error'}
                  disabled={isImageRemoved || submittedImage}
                />
                {isImageRemoved && (
                  <button type="button" className="backbutton" onClick={handleRemoveImage}>
                    Remove Image
                  </button>
                )}
                {submittedImage && (
                  <button type="button" className="backbutton" onClick={handleRemoveImage}>
                    Delete Image
                  </button>
                )}
                {errors.image && <span className="error-message">{errors.image}</span>}
              </label>
            </div>
            <button type="submit" className="logbutton">
              Submit
            </button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default NewProductForm;