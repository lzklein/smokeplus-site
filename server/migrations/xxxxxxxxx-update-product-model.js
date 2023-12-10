'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'sizes', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Products', 'flavors', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'sizes');
    await queryInterface.removeColumn('Products', 'flavors');
  },
};
