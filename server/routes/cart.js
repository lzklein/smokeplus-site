const express = require('express');
const { sequelize, Cart } = require('../models'); 

const router = express.Router();

// Get all cart items
router.get('/', async (req, res) => {
    console.log("Getting Cart!")
    const { sessionId } = req.query;
    console.log(sessionId)
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
router.put('/:id', async (req, res) => {
    console.log("Patching!")
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

module.exports = router;