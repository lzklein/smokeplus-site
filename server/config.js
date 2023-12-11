// config.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './mydatabase.db'
});

// Export the sequelize instance
module.exports = sequelize;
