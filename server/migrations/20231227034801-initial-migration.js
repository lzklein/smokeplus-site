'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Product table
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categories: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sizes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flavors: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
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
      deals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create Cart table
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
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create Order table
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Cart');
    await queryInterface.dropTable('Orders');
  },
};
