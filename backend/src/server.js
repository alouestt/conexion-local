// Punto de entrada del servidor: sincroniza la base de datos y levanta Express.
const app = require("./app");
const sequelize = require("./config/database");

const PORT = 3000;

// sync({ alter: true }) añade columnas nuevas a tablas existentes sin borrar datos.
// Se usa en desarrollo; en producción se reemplazaría por migraciones.
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Base de datos conectada");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
