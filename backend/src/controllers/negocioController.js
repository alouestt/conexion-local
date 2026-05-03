const Negocio = require("../models/Negocio");
const Producto = require("../models/Producto");

// GET /api/negocios
exports.obtenerNegocios = async (req, res) => {
    try {
        const negocios = await Negocio.findAll({ include: Producto });
        res.json(negocios);
    } catch (error) {
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
        const { nombre, descripcion } = req.body;
        const negocio = await Negocio.create({ nombre, descripcion });
        res.json({ message: "Negocio creado", negocio });
    } catch (error) {
        res.status(500).json({ error: "Error al crear negocio" });
    }
};

// PUT /api/negocios/:id
exports.editarNegocio = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const negocio = await Negocio.findByPk(req.params.id);
        if (!negocio)
            return res.status(404).json({ error: "Negocio no encontrado" });
        await negocio.update({ nombre, descripcion });
        res.json({ message: "Negocio actualizado", negocio });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar negocio" });
    }
};
