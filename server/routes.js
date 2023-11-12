const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');

// Mount routes
router.use('/login', loginRoute);

module.exports = router;
