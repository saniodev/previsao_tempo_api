'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Current_Conditions', {
      condition_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      min: {
        type: Sequelize.STRING,
      },

      max: {
        type: Sequelize.STRING,
      },

      description: {
        type:Sequelize.STRING,
      },

      icon: {
        type: Sequelize.STRING,
      },

      day: {
        type: Sequelize.STRING,
      },

      hour: {
        type: Sequelize.STRING,
      },

      forecast_Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Weather_Forecasts',
          key: 'forecast_Id'
        },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Current_Conditions');
  }
};