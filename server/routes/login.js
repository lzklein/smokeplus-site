// routes/login.js
const express = require('express');
const router = express.Router();

// Mock user data (replace with MongoDB logic later)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Login route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the mock data (replace with MongoDB logic later)
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
