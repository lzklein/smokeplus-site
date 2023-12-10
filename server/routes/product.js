const express = require('express');
const { sequelize, Product } = require('../models'); 

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    console.log("Getting All!")
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product
router.get('/:id', async (req, res) => {
    console.log("Getting One!")

  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
    console.log("Posting!")
  
    const { name, categories, price, quantity, description, image, id, sizes, flavors } = req.body;
    
    console.log("New Product:", name,categories,price,quantity,description,image,id,sizes,flavors)
    console.log("New Product:", name,categories,price,quantity,description,image,id,sizes,flavors)

    try {
      const newProduct = await Product.create({
        name,
        categories,
        price,
        quantity,
        description,
        image,
        id, 
        sizes,
        flavors
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Update a product
router.put('/:id', async (req, res) => {
    console.log("Patching!")

  const productId = req.params.id;
  const { name, categories, price, quantity, description, image } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update({
        name,
        categories,
        price,
        quantity,
        description,
        image,
      });
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    console.log("Deleting!")
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;