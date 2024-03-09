const express = require('express');
const { sequelize, Order } = require('../models'); 
const validator = require('validator');

const router = express.Router();
// Import the io object
const { test } = require('../server');
console.log(test)
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
  console.log("Getting one order!")

  const orderId = req.params.id;

  // Validate order number
  if (!validator.isAlphanumeric(orderId)) {
    return res.status(400).json({ error: 'Invalid order number format' });
  }

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
