"use strict";
/**  
* @param {import('sequelize').Sequelize } sequelize
* @param {import('sequelize').DataTypes } DataTypes

*/

module.exports = (sequelize, DataTypes) => {
  const Weather_Forecast = sequelize.define(
    "Weather_Forecasts",
    {
      forecast_Id: {
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

      country: {
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
      tableName: "Weather_Forecasts",
      timestamps: false
    });

  Weather_Forecast.associate = (model) => {
    Weather_Forecast.belongsTo(model.Users, {
      foreignKey: 'user_Id',
      as: 'users'
    });
    Weather_Forecast.hasMany(model.Current_Conditions, {
      foreignKey: "forecast_Id",
      as: "Current_Conditions",
    });
  };
  return Weather_Forecast;
}