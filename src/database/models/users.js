"use strict";

/**  
* @param {import('sequelize').Sequelize } sequelize
* @param {import('sequelize').DataTypes } DataTypes 

*/

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      user_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );

  User.associate = (model) => {
    User.hasMany(model.Cities, {
      foreignKey: "user_Id",
      as: "Cities",
    });

    User.hasMany(model.Weather_Forecasts, {
      foreignKey: "forecast_Id",
      as: "Weather_Forecasts",
    });
  };
  return User;
};
