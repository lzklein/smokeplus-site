// bring together all routes here at end
const express = require('express');
const router = express.Router();

// Import route files
const loginRoute = require('./routes/login');


// Mount routes
router.use(loginRoute);
// router.delete('/reset', resetController.resetData);

module.exports = router;
