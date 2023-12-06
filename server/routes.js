const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');
const productRoute = require('./routes/product');

// Mount routes
router.use('/login', loginRoute);
router.use('/products', productRoute);

module.exports = router;
