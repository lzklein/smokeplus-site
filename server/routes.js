const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const bannerRoute = require('./routes/banner');
const orderRoute = require('./routes/order');
const taxRoute = require('./routes/tax');

// Mount routes
router.use('/login', loginRoute);
router.use('/products', productRoute);
router.use('/cart', cartRoute);
router.use('/banner', bannerRoute);
router.use('/orders', orderRoute);
router.use('/tax', taxRoute)

module.exports = router;