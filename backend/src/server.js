// Punto de entrada del servidor: sincroniza la base de datos y levanta Express.
const app = require("./app");
const sequelize = require("./config/database");

const API_PORT = process.env.PORT || 3000;

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Base de datos conectada");

        app.listen(API_PORT, () => {
            console.log(`API corriendo en puerto ${API_PORT}`);
        });

        // Swagger solo en desarrollo
        if (process.env.NODE_ENV !== "production") {
            const swaggerApp = require("./swagger-server");
            swaggerApp.listen(3001, () => {
                console.log(`Swagger UI disponible en http://localhost:3001`);
            });
        }
    })
    .catch((err) => console.log(err));
