// order id, user id, cart [{}], time created, pickup time
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cart: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    },
    pickupTime: {
        type: DataTypes.DATE, 
        allowNull: true, 
    },
},{
    timestamps: false, 
}
);

module.exports = Order;
