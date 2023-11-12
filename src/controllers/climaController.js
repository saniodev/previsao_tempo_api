const climaServices = require("../services/climaServices");

const controllerWeatherForecast = async (req, res) => {

    try {
        const dataForecast = await climaServices.weatherForecast(req, res);

        return dataForecast;

    } catch (error) {

        res.status(401).json({ message: error.message });

    }
    
};

const controllerCurrentForecast = async (req, res) => {

    try {
        const dataCurrent = await climaServices.currentForecast(req, res);

        return dataCurrent;

    } catch (error) {

        res.status(401).json({ message: error.message });

    }
    
};

const controllerNameCity = async (req, res) => {

    try {
        const dataCurrent = await climaServices.currentNameCity(req, res);

        return dataCurrent;

    } catch (error) {

        res.status(401).json({ message: error.message });

    }
    
};

module.exports = { controllerWeatherForecast, controllerCurrentForecast, controllerNameCity };