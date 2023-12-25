const express = require('express');
const { sequelize, Order } = require('../models'); 

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    console.log("Getting All!")
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get one
router.get('/:id', async (req, res) => {
    console.log("Getting One!")

  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Post 
router.post('/', async (req, res) => {
    console.log("Posting!")
    console.log('Request Body:', req.body);

    const { id, user, cart, pickupTime } = req.body;

    try {
      const newOrder = await Order.create({
        id,
        user, 
        cart,
        pickupTime
      });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Delete a product
router.delete('/:id', async (req, res) => {
    console.log("Deleting!")
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
