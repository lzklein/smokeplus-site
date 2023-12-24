const { Sequelize } = require('sequelize');
const sequelize = require('./config');

// imports
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// relationships
Cart.belongsTo(Product, { foreignKey: 'product' });

// Export
module.exports = { sequelize, Product, Cart, Order };
