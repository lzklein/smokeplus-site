import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductForm from './NewProductForm';

const InventoryEdit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNewProductSubmit = async (newProductData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('New Product created:', newProduct);
        setProducts([newProduct, ...products]); // Prepend the new product to the existing list
        // Optionally, you can update the UI or perform other actions based on the response
      } else {
        console.error('Failed to create new product:', response.status);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error submitting new product:', error);
      // Handle unexpected errors
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const productList = await response.json();
          setProducts(productList);
        } else {
          console.error('Failed to fetch products:', response.status);
          // Handle error scenarios
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle unexpected errors
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

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

      {/* Display the list of products */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryEdit;
