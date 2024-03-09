const express = require('express');
const router = express.Router();
const validator = require('validator');

// Login route
router.post('/', (req, res) => {
  console.log("Login route triggered");
  
  const { username, password } = req.body;
  const { LOGIN, PASSWORD } = process.env;

  const min = 1;
  const max = 20;

  // Validate username
  if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min, max })) {
    return res.status(400).json({ error: 'Invalid username format' });
  }

  // Validate password
  if (!validator.isAlphanumeric(password) || !validator.isLength(password, { min, max })) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  // Check credentials
  if (username === LOGIN && password === PASSWORD) {
    return res.json({ message: 'Login successful', user: { username } });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
