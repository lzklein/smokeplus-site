import React, { useState } from 'react';
import Modal from 'react-modal';

const NewProductForm = ({ isOpen, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState(['']);
  const [productSizes, setProductSizes] = useState('');
  const [productFlavors, setProductFlavors] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productUPC, setProductUPC] = useState('');
  const [productImage, setProductImage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    categories: [],
    sizes:[],
    flavors:[],
    price: '',
    quantity: '',
    description: '',
    upc: '',
    image: '',
  });


  const validateForm = () => {
    // Log current form values
    console.log('productName:', productName);
    console.log('productCategories:', productCategories);
    console.log('productSizes:',productSizes);
    console.log('productFlavors:',productFlavors);
    console.log('productPrice:', productPrice);
    console.log('productQuantity:', productQuantity);
    console.log('productDescription:', productDescription);
    console.log('productUPC:', productUPC);
    console.log('productImage:', productImage);
  
    const newErrors = {
      name: productName.trim() === '' ? 'This field must be filled out' : '',
      categories: productCategories.map((category) =>
        category.trim() === '' ? 'This field must be filled out' : ''
      ),
      // ! These ones null ok
      // sizes: productSizes.trim() === '' ? 'This field must be filled out' : '',  
      // flavors: productFlavors.trim() === '' ? 'This field must be filled out' : '',
      price: !/^\d+(\.\d{1,2})?$/.test(productPrice)
        ? 'Enter a valid price (up to 2 decimal places)'
        : '',
      quantity: !/^\d+$/.test(productQuantity)
        ? 'Enter a valid quantity (whole number)'
        : '',
      description: productDescription.trim() === '' ? 'This field must be filled out' : '',
      upc: !/^\d+$/.test(productUPC) ? 'Enter a valid UPC (whole number)' : '',
      image: productImage.trim() === '' ? 'This field must be filled out' : ''
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
  
  // category
  const handleAddCategory = () => {
    setProductCategories([...productCategories, '']);
  };

  const handleRemoveCategory = (i) => {
    const updatedCategories = [...productCategories];
    updatedCategories.splice(i, 1);
    setProductCategories(updatedCategories);
  };

  const handleChangeCategory = (i, value) => {
    const updatedCategories = [...productCategories];
    updatedCategories[i] = value;
    setProductCategories(updatedCategories);
  };
  

  const closeModal = () => {
    setProductName('');
    setProductCategories(['']);
    setProductSizes('');
    setProductFlavors('');
    setProductPrice('');
    setProductQuantity('');
    setProductDescription('');
    setProductUPC('');
    setProductImage('');
    setErrors({});

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting")
    if (validateForm()) {
      return;
    }
    console.log('Form data valid:', {
        name: productName,
        categories: productCategories,
        sizes:productSizes,
        flavors:productFlavors,
        price: productPrice,
        quantity: productQuantity,
        description: productDescription,
        id: productUPC,
        image: productImage,
      });
    try {
      const formData = {
        name: productName,
        categories: productCategories.join(","),
        sizes:productSizes,
        flavors:productFlavors,
        price: parseFloat(productPrice),
        quantity: parseInt(productQuantity),
        description: productDescription,
        id: parseInt(productUPC),
        image: productImage
      }
    //   formData.append('name', productName);
    //   formData.append('categories', JSON.stringify(productCategories));
    //   formData.append('price', parseFloat(productPrice));
    //   formData.append('quantity', parseInt(productQuantity));
    //   formData.append('description', productDescription);
    //   formData.append('id', parseInt(productUPC));
    //   formData.append('image', submittedImage ? null : imageFile);

      console.log(formData)
      onSubmit(formData);

      setProductName('');
      setProductCategories(['']);
      setProductSizes('');
      setProductFlavors('');
      setProductPrice('');
      setProductQuantity('');
      setProductDescription('');
      setProductUPC('');
      setProductImage('');
      setErrors({});

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
            {/* Name */}
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
  
            {/* Categories */}
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
                      <button type="button" className="backbutton" onClick={() => handleRemoveCategory(index)}>
                        -
                      </button>
                    )}
                    {index === productCategories.length - 1 && (
                      <button className="backbutton" type="button" onClick={handleAddCategory}>
                        +
                      </button>
                    )}
                    {errors.categories && errors.categories[index] && <span className="error-message">{errors.categories[index]}</span>}
                  </div>
                ))}
              </label>
            </div>

            {/* Sizes */}
            <div className="form-group">
              <label>
                Size:
                <input
                  type="text"
                  value={productSizes}
                  onChange={(e) => setProductSizes(e.target.value)}
                  className={errors.sizes && 'error'}
                />
                {errors.sizes && <span className="error-message">{errors.sizes}</span>}
              </label>
            </div>

            {/* Flavors */}
            <div className="form-group">
              <label>
                flavors:
                <input
                  type="text"
                  value={productFlavors}
                  onChange={(e) => setProductFlavors(e.target.value)}
                  className={errors.flavors && 'error'}
                />
                {errors.flavors && <span className="error-message">{errors.flavors}</span>}
              </label>
            </div>
  
            {/* Price */}
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
  
            {/* Quantity */}
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
  
            {/* Description */}
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
  
            {/* UPC */}
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
  
            {/* Image */}
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
              <img src={productImage}/>
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
