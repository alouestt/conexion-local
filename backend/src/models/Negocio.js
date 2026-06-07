// Modelo de negocio: un negocio puede tener muchos productos
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Negocio = sequelize.define("Negocio", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.STRING,
    },
});

const Producto = require("./Producto");

// Relacion 1:N — Negocio tiene muchos Productos, cada Producto pertenece a un Negocio
Negocio.hasMany(Producto, {
    foreignKey: "negocioId",
});

Producto.belongsTo(Negocio, {
    foreignKey: "negocioId",
});

module.exports = Negocio;
