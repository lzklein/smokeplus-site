import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductForm from './NewProductForm';
import ProductCard from './ProductCard';
import Modal from 'react-modal';

const API_BASE_URL = 'http://localhost:5555'; // Update this with your actual base URL

const InventoryEdit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productId: null });
  const [products, setProducts] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNewProductSubmit = async (newProductData) => {
    console.log(newProductData)
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('New Product created:', newProduct);
        setProducts([newProduct, ...products]);
      } else {
        console.error('Failed to create new product:', response.status);
      }
    } catch (error) {
      console.error('Error submitting new product:', error);
    }
  };

  const handleEditProduct = async (productId, editedProductData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'PATCH', // Use PATCH method for updating existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProductData),
      });
  
      if (response.ok) {
        console.log(`Product with ID ${productId} updated`);
        // Update the products state with the edited product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...editedProductData } : product
          )
        );
      } else {
        console.error(`Failed to update product with ID ${productId}:`, response.status);
      }
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
    }
  };
  
  const handleDeleteProduct = (productId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?")
    if(isConfirmed) {
      confirmDelete(productId)
    }
  };

  const confirmDelete = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Product with ID ${productId} deleted`);
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error(`Failed to delete product with ID ${productId}:`, response.status);
      }
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }

    setDeleteConfirmation({ isOpen: false, productId: null });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (response.ok) {
          const productList = await response.json();
          setProducts(productList);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    Modal.setAppElement('#root');
    fetchProducts();
  }, []);

  const renderProducts = () => {
    return products.map((product) => {
      return(
        <>
          <ProductCard key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} onSubmit={handleEditProduct}/>
        </>
      )
    })
  }

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

      <NewProductForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handleNewProductSubmit} />

      {renderProducts()}

      
    </div>
  );
};

export default InventoryEdit;
