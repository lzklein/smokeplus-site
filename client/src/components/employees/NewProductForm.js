import React, { useState } from 'react';
import Modal from 'react-modal';

const NewProductForm = ({ isOpen, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productCategories, setProductCategories] = useState(['']);
  const [productSubcategories, setProductSubcategories] = useState(['']);
  const [productBrands, setProductBrands] = useState('');
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
    subcategories: [],
    brands: '',
    sizes:'',
    flavors:'',
    price: '',
    quantity: '',
    description: '',
    upc: '',
    image: '',
  });


  const validateForm = () => {  
    const newErrors = {
      name: productName.trim() === '' ? 'This field must be filled out' : '',
      categories: productCategories.map((category) =>
        category.trim() === '' ? 'This field must be filled out' : ''
      ),
      subcategories: productSubcategories.map((subcategory) =>
      subcategory.trim() === '' ? 'This field must be filled out' : ''
      ),
      brands: productBrands.trim() === '' ? 'This field must be filled out' : '',
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
  
    if (productCategories.some((category) => category.trim() === '')) {
      newErrors.categories = ['All categories must be filled out'];
    } else {
      newErrors.categories = [];
    }
    if (productSubcategories.some((subcategory) => subcategory.trim() === '')) {
      newErrors.subcategories = ['All subcategories must be filled out'];
    } else {
      newErrors.subcategories = [];
    }
  
    setErrors(newErrors);
  
    const hasError = Object.values(newErrors).some((error) => {
      if (Array.isArray(error)) {
        return error.length > 0;
      }
      return error !== '';
    }) || newErrors.categories.length > 0;
  
    console.log('Values for hasError:', Object.values(newErrors));
    console.log('Has Error:', hasError);
  
    return hasError;
  };
  
  // category & subcategory + - buttons
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

  const handleAddSubcategory = () => {
    setProductSubcategories([...productSubcategories, '']);
  };

  const handleRemoveSubcategory = (i) => {
    const updatedSubcategories = [...productSubcategories];
    updatedSubcategories.splice(i, 1);
    setProductSubcategories(updatedSubcategories);
  };

  const handleChangeSubcategory = (i, value) => {
    const updatedSubcategories = [...productSubcategories];
    updatedSubcategories[i] = value;
    setProductSubcategories(updatedSubcategories);
  };
  

  const closeModal = () => {
    setProductName('');
    setProductCategories(['']);
    setProductSubcategories(['']);
    setProductBrands('');
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
        subcategories:productSubcategories,
        brands:productBrands,
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
        subcategories:productSubcategories.join(","),
        brands:productBrands,
        sizes:productSizes,
        flavors:productFlavors,
        price: parseFloat(productPrice),
        quantity: parseInt(productQuantity),
        description: productDescription,
        id: parseInt(productUPC),
        image: productImage
      }

      console.log(formData)
      onSubmit(formData);

      setProductName('');
      setProductCategories(['']);
      setProductSubcategories(['']);
      setProductBrands('');
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
          <div className="form-container">
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

              {/* Subcategories */}
              <div className="form-group">
                <label>
                  Subcategories:
                  {productSubcategories.map((subcategory, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => handleChangeSubcategory(index, e.target.value)}
                        className={(errors.subcategories && errors.subcategories[index]) ? 'error' : ''}
                      />
                      {index > 0 && (
                        <button type="button" className="backbutton" onClick={() => handleRemoveSubcategory(index)}>
                          -
                        </button>
                      )}
                      {index === productSubcategories.length - 1 && (
                        <button className="backbutton" type="button" onClick={handleAddSubcategory}>
                          +
                        </button>
                      )}
                      {errors.subcategories && errors.subcategories[index] && <span className="error-message">{errors.subcategories[index]}</span>}
                    </div>
                  ))}
                </label>
              </div>

              {/* Brand */}
              <div className="form-group">
                <label>
                  Brand:
                  <input
                    type="text"
                    value={productBrands}
                    onChange={(e) => setProductBrands(e.target.value)}
                  />
                  {errors.brands && <span className="error-message">{errors.brands}</span>}
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
                  />
                  {errors.sizes && <span className="error-message">{errors.sizes}</span>}
                </label>
              </div>

              {/* Flavors */}
              <div className="form-group">
                <label>
                  Flavor:
                  <input
                    type="text"
                    value={productFlavors}
                    onChange={(e) => setProductFlavors(e.target.value)}
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
                <img src={productImage} className="imgpreview"/>
              </div>
    
              <button type="submit" className="logbutton">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </Modal>
  );
  
};

export default NewProductForm;
