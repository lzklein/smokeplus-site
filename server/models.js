const { Sequelize } = require('sequelize');
const sequelize = require('./config');

// imports
// ! Example
const Product = require('./models/Product');

// relationships
// ! Examples
// Employee.belongsToMany(Shift, { through: Schedule });
// Shift.belongsToMany(Employee, { through: Schedule });

// Schedule.belongsTo(Employee, { foreignKey: 'employee_id' });
// Schedule.belongsTo(Shift, { foreignKey: 'shift_id' });

// Employee.hasMany(TimeOffRequest);
// TimeOffRequest.belongsTo(Employee, { foreignKey: 'employee_id'});

Export
module.exports = { sequelize, Product };
