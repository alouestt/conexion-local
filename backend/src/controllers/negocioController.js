// Controlador de negocios: operaciones CRUD con soporte de búsqueda y filtros.
const { Op } = require("sequelize");
const Negocio = require("../models/Negocio");
const Producto = require("../models/Producto");

/**
 * GET /api/negocios
 * Retorna todos los negocios. Acepta query params opcionales:
 *   - nombre    → filtra por nombre (búsqueda parcial, insensible a mayúsculas)
 *   - categoria → filtra por categoría (búsqueda parcial, insensible a mayúsculas)
 * Incluye los productos de cada negocio en la respuesta.
 */
exports.obtenerNegocios = async (req, res) => {
    try {
        const { nombre, categoria } = req.query;
        const where = {};

        // Op.iLike es el operador de ILIKE en PostgreSQL: LIKE insensible a mayúsculas
        if (nombre) where.nombre = { [Op.iLike]: `%${nombre}%` };
        if (categoria) where.categoria = { [Op.iLike]: `%${categoria}%` };

        const negocios = await Negocio.findAll({ where, include: Producto });
        res.json(negocios);
    } catch (error) {
        console.error("Error en obtenerNegocios:", error.name, error.message);
        res.status(500).json({ error: "Error al obtener negocios" });
    }
};

/**
 * GET /api/negocios/:id
 * Retorna un negocio por su ID incluyendo sus productos.
 * Retorna 404 si no existe.
 */
exports.obtenerNegocio = async (req, res) => {
    try {
        const negocio = await Negocio.findByPk(req.params.id, {
            include: Producto,
        });
        if (!negocio)
            return res.status(404).json({ error: "Negocio no encontrado" });
        res.json(negocio);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener negocio" });
    }
};

/**
 * POST /api/negocios
 * Crea un nuevo negocio. Requiere autenticación (middleware verificarToken).
 * Campos: nombre (obligatorio), descripcion, categoria.
 */
exports.crearNegocio = async (req, res) => {
    try {
        const { nombre, descripcion, categoria } = req.body;
        const negocio = await Negocio.create({
            nombre,
            descripcion,
            categoria,
        });
        res.json({ message: "Negocio creado", negocio });
    } catch (error) {
        res.status(500).json({ error: "Error al crear negocio" });
    }
};

/**
 * PUT /api/negocios/:id
 * Actualiza los datos de un negocio existente. Requiere autenticación.
 * Retorna 404 si el negocio no existe.
 */
exports.editarNegocio = async (req, res) => {
    try {
        const { nombre, descripcion, categoria } = req.body;
        const negocio = await Negocio.findByPk(req.params.id);
        if (!negocio)
            return res.status(404).json({ error: "Negocio no encontrado" });
        await negocio.update({ nombre, descripcion, categoria });
        res.json({ message: "Negocio actualizado", negocio });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar negocio" });
    }
};
