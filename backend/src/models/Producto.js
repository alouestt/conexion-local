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
});

module.exports = Producto;
