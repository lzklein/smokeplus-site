// routes/login.js
const express = require('express');
const router = express.Router();

// Login route
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const { USERNAME, PASSWORD } = process.env;

  // Compare with the environment variables
  if (username === USERNAME && password === PASSWORD) {
    res.json({ message: 'Login successful', user: { username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
