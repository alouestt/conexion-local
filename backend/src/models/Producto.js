// Modelo Producto: representa la tabla "Productos" en la base de datos.
// Pertenece a un Negocio a través de la clave foránea negocioId.
// La asociación hasMany/belongsTo se declara en Negocio.js para evitar
// importaciones circulares.
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
        defaultValue: true, // un producto recién creado se considera disponible
    },
});

module.exports = Producto;
