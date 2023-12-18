'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cart', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
    user: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    product: {
        type: Sequelize.INTEGER,
        allowNull:false,
        // references: {
        //     model: Product,
        //     key: 'id',
        // },
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cart');
  },
};
