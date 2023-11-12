const express = require("express");

const userController = require("../controllers/userController");

const { auth , middlersToken} = require("../middlewares/index");

const userRouter = express.Router();

userRouter.post(
  "/create",
  auth.authName,
  auth.authEmail,
  auth.authPass,
  userController.createdUser
);

userRouter.get("/list", middlersToken, userController.getAllUsers);

userRouter.put(
  "/update/:id",
  middlersToken,
  auth.authName,
  auth.authEmail,
  auth.authPass,
  userController.updateUserData
);

userRouter.delete("/delete/:id", middlersToken, userController.deleteUserData);

module.exports = userRouter;
