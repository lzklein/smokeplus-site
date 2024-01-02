import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditProductForm = ({ isOpen, onClose, onSubmit, product }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [errors, setErrors] = useState({});
    const [productCategories, setProductCategories] = useState(['']);
    const [loaded, setLoaded] = useState(false);
    const [originalId, setOriginalId] = useState('');

    useEffect(() => {
        setEditedProduct({ ...product });
        setProductCategories(Array.isArray(product.categories) ? [...product.categories] : [product.categories]);
        setOriginalId(product.id)
        setLoaded(true);
    }, []);

    const validateForm = () => {
        // Log current form values
        console.log('productName:', editedProduct.name);
        console.log('productCategories:', productCategories);
        console.log('productSizes:',editedProduct.sizes);
        console.log('productFlavors:',editedProduct.flavors);
        console.log('productPrice:', editedProduct.price);
        console.log('productQuantity:', editedProduct.quantity);
        console.log('productDescription:', editedProduct.description);
        console.log('productUPC:', editedProduct.id);
        console.log('productImage:', editedProduct.image);
        
        const newErrors = {
            name: editedProduct.name.trim() === '' ? 'This field must be filled out' : '',
            categories: productCategories.map((category) =>
            category.trim() === '' ? 'This field must be filled out' : ''
            ),
            // ! These ones null ok
            // sizes: productSizes.trim() === '' ? 'This field must be filled out' : '',  
            // flavors: productFlavors.trim() === '' ? 'This field must be filled out' : '',
            price: !/^\d+(\.\d{1,2})?$/.test(editedProduct.price)
            ? 'Enter a valid price (up to 2 decimal places)'
            : '',
            quantity: !/^\d+$/.test(editedProduct.quantity)
            ? 'Enter a valid quantity (whole number)'
            : '',
            description: editedProduct.description.trim() === '' ? 'This field must be filled out' : '',
            upc: !/^\d+$/.test(editedProduct.id) ? 'Enter a valid UPC (whole number)' : '',
            image: editedProduct.image.trim() === '' ? 'This field must be filled out' : ''
        };
        
        // Special handling for arrays
        if (productCategories.some((category) => category.trim() === '')) {
            newErrors.categories = ['All categories must be filled out'];
        } else {
            newErrors.categories = [];
        }
        
        // Log current errors
        console.log('New Errors:', newErrors);
        
        // Set errors state
        setErrors(newErrors);
        
        // Log current state after setting errors
        console.log('Current Errors State:', errors);
        
        // Check if any field has an error
        const hasError = Object.values(newErrors).some((error) => {
            if (Array.isArray(error)) {
            return error.length > 0; // Check if array has elements
            }
            return error !== ''; // For non-array values, check if it's not an empty string
        }) || newErrors.categories.length > 0;
        
        // Log values used to determine hasError
        console.log('Values for hasError:', Object.values(newErrors));
        console.log('Has Error:', hasError);
        
        return hasError;
        };

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
      
        // Remove the category from editedProduct
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          categories: updatedCategories.filter(Boolean), // Remove empty categories
        }));
      };
      

    const handleChangeCategory = (index, value) => {
        setProductCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            updatedCategories[index] = value;

            setEditedProduct((prevProduct) => ({
            ...prevProduct,
            categories: updatedCategories,
            }));

            return updatedCategories;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // validate
        if (validateForm()) {
          return;
        }
        // changes
        const changedFields = {};
        for (const key in editedProduct) {
          if (editedProduct[key] !== product[key]) {
            changedFields[key] = editedProduct[key];
          }
        }
        // const patchProduct = {
        //   ...changedFields
        // };
        // Reset errors, submit patchProduct, close modal
        console.log(changedFields)
        onSubmit(originalId, changedFields);
        setErrors({});
        onClose();
      };

  
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
        {isOpen && (
          <>
            <h2>Edit Product</h2>
            <button type="submit" onClick={()=>{console.log(editedProduct)}}>Boop</button>
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
                {productCategories.map((category, index) => (
                  <div key={index} className="form-group">
                    <label>
                      Category {index + 1}:
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
                    </label>
                  </div>
                ))}
  
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
                        name="id"
                        value={editedProduct.id}
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
