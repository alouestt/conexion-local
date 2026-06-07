// Modelo de producto: pertenece a un Negocio via negocioId (FK)
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define("Producto", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Producto;
