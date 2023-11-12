const apiKey = process.env.API_TOKEN;
const urlBase = process.env.BASE_URL;
const axios = require("axios");
const moment = require("moment");
const currentDate = moment().format("YYYY-MM-DD");
const { Cities, Weather_Forecasts, Current_Conditions } = require("../database/models");

const { formatWeatherData, formatForecastData } = require("../helpers/formatWeather");

const currentForecast = async (req, res) => {
  try {
    const { id } = req.params;

    const { latitude, longitude } = req.body;

    const apiUrl = `${urlBase}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: response.message });
    }

    const currentData = response.data;

    const formattedData = await formatWeatherData(currentData);

    const existingCity = await Cities.findOne({
      where: { cod_api_ext: formattedData.city.id },
    });

    if (existingCity) {
      return res.status(200).json({ city: existingCity, message: "City already exists in the database" });
    }

    const objectCities = {
      cod_api_ext: formattedData.city.id,
      name: formattedData.city.name,
      current: formattedData.temperature.current,
      min: formattedData.temperature.min,
      max: formattedData.temperature.max,
      description: formattedData.weather.description,
      icon: formattedData.weather.icon,
      speed: formattedData.wind.speed,
      direction: formattedData.wind.direction,
      humidity: formattedData.humidity,
      day: formattedData.day,
      hour: formattedData.timestamp,
      sunrise: formattedData.sunrise,
      sunset: formattedData.sunset,
      user_Id: id,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const createdCity = await Cities.create(objectCities);

    return res
      .status(200)
      .json({ city: createdCity, message: "Created city successfully" });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: error.message });
  }
};

const weatherForecast = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const apiUrl = `${urlBase}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: response.message });
    }

    const weatherData = response.data;

    const formattedData = await formatForecastData(weatherData);

    const existingWeatherForecast = await Weather_Forecasts.findOne({
      where: { cod_api_ext: formattedData.city.id },
      include: [
        {
          model: Current_Conditions,
          as: "Current_Conditions",
        },
      ],
    });

    if (existingWeatherForecast) {
      return res.status(200).json({ weatherForecast: existingWeatherForecast, message: "Weather forecast already exists in the database" });
    }

    const createdWeatherForecast = await Weather_Forecasts.create({
      cod_api_ext: formattedData.city.id,
      name: formattedData.city.name,
      country: formattedData.city.country,
      user_Id: id,
      created_at: currentDate,
      updated_at: currentDate,
    });

    for (const formattedCondition of formattedData.weatherForecastData) {
      await Current_Conditions.create({
        min: formattedCondition.temperature.min,
        max: formattedCondition.temperature.max,
        description: formattedCondition.weather.description,
        icon: formattedCondition.weather.icon,
        day: formattedCondition.day,
        hour: formattedCondition.hour,
        forecast_Id: createdWeatherForecast.forecast_Id,
        created_at: currentDate,
        updated_at: currentDate,
      });
    }

    return res.status(200).json({ formattedData, message: "Weather data saved successfully" });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: error.message });
  }
};

const currentNameCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;

    const apiUrl = `${urlBase}/forecast?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: response.message });
    }

    const currentData = response.data;

    const formattedData = await formatForecastData(currentData);

    const existingWeatherForecast = await Weather_Forecasts.findOne({
      where: { cod_api_ext: formattedData.city.id },
      include: [
        {
          model: Current_Conditions,
          as: "Current_Conditions",
        },
      ],
    });

    if (existingWeatherForecast) {
      return res.status(200).json({ weatherForecast: existingWeatherForecast, message: "Weather forecast already exists in the database" });
    }

    const createdWeatherForecast = await Weather_Forecasts.create({
      cod_api_ext: formattedData.city.id,
      name: formattedData.city.name,
      country: formattedData.city.country,
      user_Id: id,
      created_at: currentDate,
      updated_at: currentDate,
    });

    for (const formattedCondition of formattedData.weatherForecastData) {
      await Current_Conditions.create({
        min: formattedCondition.temperature.min,
        max: formattedCondition.temperature.max,
        description: formattedCondition.weather.description,
        icon: formattedCondition.weather.icon,
        day: formattedCondition.day,
        hour: formattedCondition.hour,
        forecast_Id: createdWeatherForecast.forecast_Id,
        created_at: currentDate,
        updated_at: currentDate,
      });
    }

    return res.status(200).json({ formattedData, message: "Weather data saved successfully" });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: error.message });
  }
};


module.exports = { weatherForecast, currentForecast, currentNameCity };
