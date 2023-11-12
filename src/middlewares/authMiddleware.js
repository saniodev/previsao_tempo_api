const authEmail = (req, res, next) => {
    const { email } = req.body;
    const isValidEmail = (/^\S+@\S+\.\S+$/).test(email);

    if (!email || email.length === 0) {
        return res.status(400).json({ message: 'The email field is mandatory' });
    }

    if (!isValidEmail) {
        return res.status(400).json({ message: 'The email must have the format email@email.com' });
    }
    next();
};

const authPass = (req, res, next) => {
    
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'The "password" field is mandatory' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'The "password" must have at least 6 characters' });
    }

    next();
};

const authName = (req, res, next) => {
    const { name } = req.body;

    const isValidName = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);

    if (!name) {
        return res.status(400).json({ message: 'The name field is required' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'The name field must have at least 3 characters' });
    }

    if (!isValidName) {
        return res.status(400).json({ message: 'The name field must contain only letters and follow the correct format, For example: Lucas Alves Lima.' });
    }


    next();
};

const authLatitudeAndLongitude = (req, res, next) => {
    const { latitude, longitude } = req.body;

    const isValidLatitude = /^-?\d+(\.\d+)?$/.test(latitude);

    const isValidLongitude = /^-?\d+(\.\d+)?$/.test(longitude);

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'The latitude and longitude fields are mandatory' });
    }

    if (!isValidLatitude || !isValidLongitude) {
      return res.status(400).json({ message: 'The latitude and longitude fields must be valid numbers' });
    }

    next();
}

const authNameCity = (req, res, next) => {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: 'The city field is mandatory' });
    }

    next();
}

const authUserId = (req, res, next) => {
    const { userId } = req.body;

    const isValidUser = userId === null || userId === undefined;

    const isValidWithNumber = typeof userId !== 'number' || !Number.isInteger(userId) || userId <= 0;

    if (isValidUser) {
        return res.status(400).json({ message: 'userId is required' });
    }

    if (isValidWithNumber) {
        return res.status(400).json({ message: 'The userId is mandatory and must be a positive integer' });
    }

    next();
};

module.exports = {
    authEmail,
    authPass,
    authName,
    authUserId,
    authNameCity,
    authLatitudeAndLongitude
};