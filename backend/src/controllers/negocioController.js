// Controlador de negocios
const Negocio = require("../models/Negocio");

// POST /api/negocios — crea un negocio nuevo
exports.crearNegocio = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const negocio = await Negocio.create({
            nombre,
            descripcion,
        });

        res.json({
            message: "Negocio creado",
            negocio,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear negocio",
        });
    }
};
