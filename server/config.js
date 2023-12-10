// config.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './mydatabase.db'
});

// Test the connection
(async () => {
  try {
    console.log('Attempting to authenticate...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the models with the database
    await sequelize.sync({ alter: true });
    console.log('Models have been synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
