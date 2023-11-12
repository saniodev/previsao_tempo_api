const express = require("express");

const loginRoute = require("./loginRouter");
const userRouter = require("./userRouter");
const swaggerRouter = require("./swaggerRouter");
const weatherForecastRouter = require("./climaRouter");
const { auth, middlersToken } = require("../middlewares/index");

const router = express.Router();

router.use("/login", auth.authEmail, auth.authPass, loginRoute);

router.use("/swagger", swaggerRouter);

router.use(
  "/user",
  userRouter
);

router.use(
  "/clima",
  middlersToken,
  weatherForecastRouter
);


module.exports = router;
