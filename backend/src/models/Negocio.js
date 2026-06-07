// Modelo Negocio: representa la tabla "Negocios" en la base de datos.
// Un negocio puede tener muchos productos (relación 1:N).
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
        type: DataTypes.STRING, // valores libres; el frontend los restringe con un select
    },
});

// Producto se importa aquí (después de definir Negocio) para evitar
// referencias circulares, ya que Producto.js no importa a Negocio.
const Producto = require("./Producto");

// Relación 1:N: Negocio.hasMany permite acceder a n.Productos en las consultas.
// Producto.belongsTo añade la clave foránea negocioId en la tabla Productos.
Negocio.hasMany(Producto, { foreignKey: "negocioId" });
Producto.belongsTo(Negocio, { foreignKey: "negocioId" });

module.exports = Negocio;
