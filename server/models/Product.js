const { Sequelize } = require('sequelize');
const sequelize = require('./config');

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categories: {
    type: Sequelize.STRING, // ARRAY to STRING
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('categories');
      return rawValue ? rawValue.split(',') : [];
    },
    set(value) {
      this.setDataValue('categories', value.join(','));
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // Min value 0
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0, 
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  deals: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = { sequelize, Product };
