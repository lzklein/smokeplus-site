const express = require('express');
const loginRouter = express.Router();

// Login route
loginRouter.post('/', (req, res) => {
  console.log("Login route triggered");
  
  const { username, password } = req.body;
  const { USERNAME, PASSWORD } = process.env;

  // Compare with the environment variables
  if (username === USERNAME && password === PASSWORD) {
    res.json({ message: 'Login successful', user: { username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = loginRouter;
