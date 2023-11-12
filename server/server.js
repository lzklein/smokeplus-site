// server.js
const express = require('express');
const bodyParser = require('body-parser');
const initRoutes = require('./routes/routes');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize routes
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
