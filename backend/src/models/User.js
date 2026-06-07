// Modelo User: representa la tabla "Users" en la base de datos.
// Almacena las cuentas de usuario con su rol dentro del sistema.
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true, // restricción de unicidad a nivel de BD
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // se almacena el hash generado por bcrypt, nunca el texto plano
    },
    rol: {
        type: DataTypes.ENUM("comprador", "vendedor", "admin"),
        allowNull: false,
        defaultValue: "comprador", // todo usuario nuevo es comprador por defecto
    },
});

module.exports = User;
