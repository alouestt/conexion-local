const Producto = require("../models/Producto");
const Negocio = require("../models/Negocio");

// GET /api/productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({ include: Negocio });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// GET /api/productos/:id
exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id, {
            include: Negocio,
        });
        if (!producto)
            return res.status(404).json({ error: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
};

// POST /api/productos
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, negocioId, disponible } = req.body;
        const producto = await Producto.create({
            nombre,
            precio,
            negocioId,
            disponible: disponible !== undefined ? disponible : true,
        });
        res.json({ message: "Producto creado", producto });
    } catch (error) {
        res.status(500).json({ error: "Error al crear producto" });
    }
};

// PUT /api/productos/:id
exports.editarProducto = async (req, res) => {
    try {
        const { nombre, precio, negocioId, disponible } = req.body;
        const producto = await Producto.findByPk(req.params.id);
        if (!producto)
            return res.status(404).json({ error: "Producto no encontrado" });
        await producto.update({ nombre, precio, negocioId, disponible });
        res.json({ message: "Producto actualizado", producto });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar producto" });
    }
};
