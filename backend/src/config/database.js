// Configuración de la conexión a la base de datos usando Sequelize ORM.
// Las credenciales se leen exclusivamente del archivo .env para no exponerlas
// en el código fuente ni en el repositorio.
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, // "postgres" en producción y tests
    },
);

module.exports = sequelize;
