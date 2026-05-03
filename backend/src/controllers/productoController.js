// Controlador de productos
const Producto = require("../models/Producto");

// POST /api/productos — crea un producto asociado a un negocio via negocioId
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, negocioId } = req.body;

        const producto = await Producto.create({
            nombre,
            precio,
            negocioId,
        });

        res.json({
            message: "Producto creado",
            producto,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear producto",
        });
    }
};
