const express = require("express");
const swaggerUi = require('swagger-ui-express');

const swaggerjson = require('../../swagger.json');

const swaggerRouter = express.Router();

swaggerRouter.use('/', swaggerUi.serve);

swaggerRouter.get('/', swaggerUi.setup(swaggerjson));

module.exports = swaggerRouter;