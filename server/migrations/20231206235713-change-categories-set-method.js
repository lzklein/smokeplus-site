'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'categories', {
      type: Sequelize.STRING,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Add logic to revert the changes in the down method, if needed
  },
};
