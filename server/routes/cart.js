const express = require('express');
const { sequelize, Cart } = require('../models'); 
const validator = require('validator');

const router = express.Router();

// Get all cart items
router.get('/', async (req, res) => {
    console.log("Getting Cart!")
    const { sessionId } = req.query;
    
    console.log("sessionId", sessionId)
  try {
    const cart = await Cart.findAll({
        where:{
            user:sessionId
        }
    });
    console.log(cart)
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new Cart Item
router.post('/', async (req, res) => {
    console.log("Posting!")
    console.log('Request Body:', req.body);

    const { user, product, quantity } = req.body.cartItem;

    console.log("New Cart Item:", user, product, quantity)

    try {
      const newCart = await Cart.create({
        user,
        product,
        quantity
      });
      res.status(201).json(newCart);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Update a Cart item
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Validate quantity as a number
  if (!validator.isNumeric(String(quantity))) {
    return res.status(400).json({ error: 'Invalid quantity format. Must be a number.' });
  }
    
  try {
    const updatedCartItem = await Cart.findByPk(id);

    if (!updatedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    updatedCartItem.quantity = quantity;
    await updatedCartItem.save();

    res.json(updatedCartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a Cart item
router.delete('/:id', async (req, res) => {
    console.log("Deleting!")
  const id = req.params.id;

  try {
    const product = await Cart.findByPk(id);
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

// Delete by user
router.delete('/deleteBySessionId/:id', async (req, res) => {
  console.log("Deleting!");
  const userId = req.params.id; // Assuming the ID here corresponds to the user ID

  try {
    // Find all cart items associated with the user ID
    const cartItems = await Cart.findAll({
      where: {
        user: userId,
      },
    });

    // Delete each cart item
    for (const cartItem of cartItems) {
      await cartItem.destroy();
    }

    res.status(204).end(); // Respond with 204 (No Content) as the deletion was successful
  } catch (error) {
    console.error('Error deleting cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;