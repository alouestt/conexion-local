// Punto de entrada del servidor: sincroniza la base de datos y levanta Express.
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Base de datos conectada");

        app.listen(PORT, () => {
            console.log(`API corriendo en puerto ${PORT}`);
        });

        // Swagger en puerto separado solo en desarrollo
        if (process.env.NODE_ENV !== "production") {
            const express = require("express");
            const swaggerUi = require("swagger-ui-express");
            const swaggerSpec = require("./config/swagger");

            const swaggerApp = express();
            swaggerApp.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            swaggerApp.listen(3001, () => {
                console.log("Swagger UI disponible en http://localhost:3001");
            });
        }
    })
    .catch((err) => console.log(err));
