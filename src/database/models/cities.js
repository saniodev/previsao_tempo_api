"use strict";
/**  
* @param {import('sequelize').Sequelize } sequelize
* @param {import('sequelize').DataTypes } DataTypes

*/

module.exports = (sequelize, DataTypes) => {
  const Citie = sequelize.define(
    "Cities",
    {
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      cod_api_ext: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
      },

      current: {
        type: DataTypes.STRING,
      },

      min: {
        type: DataTypes.STRING,
      },

      max: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.STRING,
      },

      icon: {
        type: DataTypes.STRING,
      },

      speed: {
        type: DataTypes.STRING,
      },

      direction: {
        type: DataTypes.INTEGER,
      },

      humidity: {
        type: DataTypes.STRING,
      },

      day: {
        type: DataTypes.STRING,
      },

      hour: {
        type: DataTypes.STRING,
      },

      sunrise: {
        type: DataTypes.STRING,
      },

      sunset: {
        type: DataTypes.STRING,
      },

      user_Id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },{
      tableName: "Cities",
      timestamps: false,
    });

    Citie.associate = (model) => {
      Citie.belongsTo(model.Users, {
        foreignKey: 'user_Id',
        as: 'users'
      });
      
  };

  return Citie;
}