const getDayOfWeek = (dayIndex) => {
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  return daysOfWeek[dayIndex];
};

const formatWeatherData = (weatherData) => {
  try {
    const { main, weather, wind, sys, name, dt, id } = weatherData;

    const kelvinToCelsius = (temp) => temp - 273.15;

    const msToKmh = (speed) => speed * 3.6;

    const formattedData = {
      city: {
        id: id,
        name: name,
      },
      temperature: {
        current: `${Math.round(kelvinToCelsius(main.temp))}°C`,
        min: `${Math.round(kelvinToCelsius(main.temp_min))}°C`,
        max: `${Math.round(kelvinToCelsius(main.temp_max))}°C`,
      },
      weather: {
        description: weather[0].description,
        icon: weather[0].icon,
      },
      wind: {
        speed: `${Math.round(msToKmh(wind.speed))}km/h`,
        direction: wind.deg,
      },
      humidity: `${main.humidity}%`,
      sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(sys.sunset * 1000).toLocaleTimeString(),
      timestamp: new Date(dt * 1000).toLocaleString(),
      day: getDayOfWeek(new Date(dt * 1000).getDay()),
    };

    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const formatForecastData = (forecastData) => {
  try {
    const { city } = forecastData;

    const weatherForecastData = forecastData.list.reduce((result, forecast) => {
      const { dt, main, weather } = forecast;

      const kelvinToCelsius = (temp) => temp - 273.15;

      const dayOfWeek = getDayOfWeek(new Date(dt * 1000).getDay());
      const hour = new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const existingDay = result.find(entry => entry.day === dayOfWeek);

      if (!existingDay) {
        result.push({
          day: dayOfWeek,
          hour: hour,
          temperature: {
            min: `${Math.round(kelvinToCelsius(main.temp_min))}°C`,
            max: `${Math.round(kelvinToCelsius(main.temp_max))}°C`,
          },
          weather: {
            description: weather[0].description,
            icon: weather[0].icon,
          },
        });
      }

      return result;
    }, []);

    return {
      city: {
        id: city.id,
        name: city.name,
        country: city.country,
      },
      weatherForecastData,
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { formatWeatherData, formatForecastData };
