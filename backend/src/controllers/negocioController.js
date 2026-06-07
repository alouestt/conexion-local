const { Op } = require("sequelize");
const Negocio = require("../models/Negocio");
const Producto = require("../models/Producto");

// GET /api/negocios?nombre=&categoria=
exports.obtenerNegocios = async (req, res) => {
    try {
        const { nombre, categoria } = req.query;
        const where = {};
        if (nombre) where.nombre = { [Op.iLike]: `%${nombre}%` };
        if (categoria) where.categoria = { [Op.iLike]: `%${categoria}%` };
        const negocios = await Negocio.findAll({ where, include: Producto });
        res.json(negocios);
    } catch (error) {
        console.error("Error en obtenerNegocios:", error.name, error.message);
        res.status(500).json({ error: "Error al obtener negocios" });
    }
};

// GET /api/negocios/:id
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

// POST /api/negocios
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

// PUT /api/negocios/:id
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
