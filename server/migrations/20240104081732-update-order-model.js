'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'cart', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'cart', {
      type: Sequelize.Array(Sequelize.JSON),
      allowNull: false,
    });  },
};
