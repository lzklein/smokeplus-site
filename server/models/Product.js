const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('categories').split(',');
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('categories', value.join(','));
      } else if (typeof value === 'string') {
        this.setDataValue('categories', value);
      } else {
        console.warn('Invalid value type for categories:', typeof value);
      }
    },
  },
  sizes: {
    type: DataTypes.STRING, 
    allowNull: true,
    get() {
      return this.getDataValue('sizes').split(',');
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('sizes', value.join(','));
      } else if (typeof value === 'string') {
        this.setDataValue('sizes', value);
      } else {
        console.warn('Invalid value type for sizes:', typeof value);
      }
    },
  },
  flavors: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return this.getDataValue('flavors').split(',');
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('flavors', value.join(','));
      } else if (typeof value === 'string') {
        this.setDataValue('flavors', value);
      } else {
        console.warn('Invalid value type for flavors:', typeof value);
      }
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // Min value 0
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  deals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product;
