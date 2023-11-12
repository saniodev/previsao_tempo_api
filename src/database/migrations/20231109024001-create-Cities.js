'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      city_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cod_api_ext: {
        allowNull: false,
        type:  Sequelize.INTEGER
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      country: {
        type: Sequelize.STRING
      },

      current: {
        allowNull: false,
        type: Sequelize.STRING
      },

      min: {
        allowNull: false,
        type: Sequelize.STRING
      },

      max: {
        allowNull: false,
        type: Sequelize.STRING
      },

      description: {
        type: Sequelize.STRING
      },

      icon: {
        type: Sequelize.STRING
      },

      speed: {
        type: Sequelize.STRING
      },

      direction: {
        type: Sequelize.STRING
      },

      humidity: {
        type: Sequelize.STRING
      },

      day: {
        type: Sequelize.STRING
      },

      hour: {
        type: Sequelize.STRING
      },

      sunrise: {
        allowNull: false,
        type: Sequelize.STRING
      },

      sunset: {
        allowNull: false,
        type: Sequelize.STRING
      },

      user_Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'user_Id'
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Cities');
  }
};
