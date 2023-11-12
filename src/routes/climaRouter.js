const express = require("express");

const climaController = require("../controllers/climaController");

const { auth, middlersToken } = require("../middlewares/index");

const weatherForecastRouter = express.Router();

weatherForecastRouter.post(
  "/weather/:id",
  auth.authLatitudeAndLongitude,
  climaController.controllerWeatherForecast
);

weatherForecastRouter.post(
  "/current/:id",
  auth.authLatitudeAndLongitude,
  climaController.controllerCurrentForecast
);

weatherForecastRouter.post(
  "/city/:id",
  auth.authNameCity,
  climaController.controllerNameCity
);

module.exports = weatherForecastRouter;
