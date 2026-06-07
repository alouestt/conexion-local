// Punto de entrada del servidor: sincroniza la BD y luego levanta Express
const app = require("./app");
const sequelize = require("./config/database");

const PORT = 3000;

// sequelize.sync() crea las tablas si no existen antes de aceptar peticiones
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Base de datos conectada");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
