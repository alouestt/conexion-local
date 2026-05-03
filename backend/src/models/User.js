// Modelo de usuario: representa la tabla Users en la base de datos
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true, // no permite dos usuarios con el mismo correo
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // se almacena ya hasheado con bcrypt
    },
});

module.exports = User;
