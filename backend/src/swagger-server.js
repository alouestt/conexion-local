// Servidor separado para Swagger UI
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Servir Swagger UI
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
