const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

// Mount routes
router.use('/login', loginRoute);
router.use('/products', productRoute);
router.use('/cart', cartRoute)

module.exports = router;
