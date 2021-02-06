'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shape', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shape: {
        type: Sequelize.ENUM('square', 'rectangle', 'triangle', 'circle')
      },
      area: {
        type: Sequelize.DECIMAL(13, 2)
      },
      dimensions: {
        type: Sequelize.JSON,
        defaultValue: {}
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shape');
  }
};
