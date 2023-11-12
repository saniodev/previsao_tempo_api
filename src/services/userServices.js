require("dotenv").config();

const moment = require("moment");

const currentDate = moment().format("YYYY-MM-DD");

const { Users } = require("../database/models");

const createUser = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;

    const objectUser = {
      name: name,
      email: email.toString(),
      password: password,
      created_at: currentDate,
      updated_at: currentDate,
    };

    const createdUser = await Users.create(objectUser);

    return res
      .status(200)
      .json({ user: createdUser, message: "Created User success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res, _next) => {
  try {
    const users = await Users.findAll();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email, password } = req.body;

    const existingUser = await Users.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await existingUser.update({
      name,
      email,
      password,
      updatedAt: currentDate,
    });

    return res.status(200).json({ message: `The User ${name} was successfully update` });

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }

};

const deleteUser = async (req, res) => {

  try {
    const { id } = req.params;

    const existingUser = await Users.findByPk(id);
    
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUserName = existingUser.nome;

    await existingUser.destroy();

    return res.status(200).json({ message: `User with Name ${deletedUserName} was successfully deleted` });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};
