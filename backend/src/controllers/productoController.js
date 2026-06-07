// Controlador de productos: operaciones CRUD vinculadas a un Negocio.
const Producto = require("../models/Producto");
const Negocio = require("../models/Negocio");

/**
 * GET /api/productos
 * Retorna todos los productos. Incluye el negocio al que pertenece cada uno.
 */
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({ include: Negocio });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

/**
 * GET /api/productos/:id
 * Retorna un producto por su ID incluyendo el negocio asociado.
 * Retorna 404 si no existe.
 */
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

/**
 * POST /api/productos
 * Crea un nuevo producto. Requiere autenticación (middleware verificarToken).
 * Campos: nombre, precio, negocioId (obligatorios), disponible (por defecto true).
 */
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, negocioId, disponible } = req.body;
        const producto = await Producto.create({
            nombre,
            precio,
            negocioId,
            // Si el cliente no envía disponible, se asume true (producto en stock)
            disponible: disponible !== undefined ? disponible : true,
        });
        res.json({ message: "Producto creado", producto });
    } catch (error) {
        res.status(500).json({ error: "Error al crear producto" });
    }
};

/**
 * PUT /api/productos/:id
 * Actualiza los datos de un producto existente. Requiere autenticación.
 * Permite cambiar el campo disponible para marcar como agotado o disponible.
 * Retorna 404 si el producto no existe.
 */
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
