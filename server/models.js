const { Sequelize } = require('sequelize');
const sequelize = require('./config');

// imports

const Product = require('./models/Product');


// Export
module.exports = { sequelize, Product };
