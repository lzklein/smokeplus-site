const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes');

require('dotenv').config();

const sequelize = require('./config');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(cors());

// Initialize routes
app.use('/api', initRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
