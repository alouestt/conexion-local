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
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM("comprador", "vendedor", "admin"),
        allowNull: false,
        defaultValue: "comprador",
    },
});

module.exports = User;
