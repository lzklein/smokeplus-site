const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const bannerRoute = require('./routes/banner');

// Mount routes
router.use('/login', loginRoute);
router.use('/products', productRoute);
router.use('/cart', cartRoute)
router.use('/banner', bannerRoute)

module.exports = router;
