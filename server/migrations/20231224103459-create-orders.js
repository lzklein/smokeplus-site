'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cart: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
      },
      pickupTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
