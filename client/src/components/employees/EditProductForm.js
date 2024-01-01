import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditProductForm = ({ isOpen, onClose, onSubmit, product }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [errors, setErrors] = useState({});
    const [productCategories, setProductCategories] = useState(['']);
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      setEditedProduct({ ...product });
      setLoaded(true);
    }, [product]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    };
  
    const handleAddCategory = () => {
      setProductCategories([...productCategories, '']);
    };
  
    const handleRemoveCategoryAtIndex = (index) => {
      const updatedCategories = [...productCategories];
      updatedCategories.splice(index, 1);
      setProductCategories(updatedCategories);
    };
  
    const handleChangeCategory = (index, value) => {
      const updatedCategories = [...productCategories];
      updatedCategories[index] = value;
      setProductCategories(updatedCategories);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!editedProduct.name || editedProduct.name.trim() === '') {
        setErrors({ name: 'Name is required' });
        return;
      }
      setErrors({});
      onSubmit(editedProduct);
      onClose();
    };
  
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
        {isOpen && (
          <>
            <h2>Edit Product</h2>
            {loaded ? (
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="form-group">
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        className={errors.name && 'error'}
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </label>
                  </div>
  
                  {/* Categories */}
                  {productCategories && (
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
                              <button
                                type="button"
                                className="backbutton"
                                onClick={() => handleRemoveCategoryAtIndex(index)}
                              >
                                -
                              </button>
                            )}
                            {index === productCategories.length - 1 && (
                              <button className="backbutton" type="button" onClick={handleAddCategory}>
                                +
                              </button>
                            )}
                            {errors.categories && errors.categories[index] && (
                              <span className="error-message">{errors.categories[index]}</span>
                            )}
                          </div>
                        ))}
                      </label>
                    </div>
                  )}
  
                  {/* Sizes */}
                  <div className="form-group">
                    <label>
                      Size:
                      <input
                        type="text"
                        name="sizes"
                        value={editedProduct.sizes}
                        onChange={handleChange}
                        // Add validation and styling as needed
                      />
                    </label>
                  </div>
  
                  {/* Flavors */}
                  <div className="form-group">
                    <label>
                      Flavors:
                      <input
                        type="text"
                        name="flavors"
                        value={editedProduct.flavors}
                        onChange={handleChange}
                        // Add validation and styling as needed
                      />
                    </label>
                  </div>
  
                  {/* Price */}
                  <div className="form-group">
                    <label>
                      Price:
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        className={errors.price && 'error'}
                      />
                      {errors.price && <span className="error-message">{errors.price}</span>}
                    </label>
                  </div>
  
                  {/* Quantity */}
                  <div className="form-group">
                    <label>
                      Quantity:
                      <input
                        type="number"
                        name="quantity"
                        value={editedProduct.quantity}
                        onChange={handleChange}
                        className={errors.quantity && 'error'}
                      />
                      {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                    </label>
                  </div>
  
                  {/* Description */}
                  <div className="form-group">
                    <label>
                      Description:
                      <input
                        type="text"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        // Add validation and styling as needed
                      />
                    </label>
                  </div>
  
                  {/* UPC */}
                  <div className="form-group">
                    <label>
                      UPC:
                      <input
                        type="number"
                        name="upc"
                        value={editedProduct.upc}
                        onChange={handleChange}
                        // Add validation and styling as needed
                      />
                    </label>
                  </div>
  
                  {/* Image */}
                  <div className="form-group">
                    <label>
                      Image:
                      <input
                        type="text"
                        name="image"
                        value={editedProduct.image}
                        onChange={handleChange}
                        // Add validation and styling as needed
                      />
                    </label>
                    <img src={editedProduct.image} alt="Product Preview" className="imgpreview" />
                  </div>
  
                  <button type="submit" className="logbutton">
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <h1>Loading</h1>
            )}
          </>
        )}
      </Modal>
    );
  };
  
  export default EditProductForm;
