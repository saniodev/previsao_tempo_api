const { Users } = require('../database/models');
const { createJwt } = require('../helpers/token');

const postLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email, password } });

        if (!user) return res.status(400).json({ message: 'Invalid fields' });

        const token = createJwt({ id: user.user_id, email: user.email });

        return res.status(200).json({ usuario: user.name, email: user.email, token: token });

    } catch (error) {

        res.status(401).json({ message: error.message });

    }

};

module.exports = { postLogin };