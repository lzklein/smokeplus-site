const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
    user: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    },    
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'Cart', 
  });

module.exports = Cart;
