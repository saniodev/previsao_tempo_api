"use strict";
/**  
* @param {import('sequelize').Sequelize } sequelize
* @param {import('sequelize').DataTypes } DataTypes

*/

module.exports = (sequelize, DataTypes) => {
  const Current_Condition = sequelize.define(
    "Current_Conditions",
    {
      condition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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

      day: {
        type: DataTypes.STRING,
      },

      hour: {
        type: DataTypes.STRING,
      },

      forecast_Id: {
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
      tableName: "Current_Conditions",
      timestamps: false
    });

  Current_Condition.associate = (models) => {
    Current_Condition.belongsTo(models.Weather_Forecasts, {
      foreignKey: 'forecast_Id',
      as: 'Weather_Forecasts'
    });
  };

  return Current_Condition;
}