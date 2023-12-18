// use product.id from Products in cart
// basic id, user(sessionId), 
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
        allowNull:false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = Cart;
