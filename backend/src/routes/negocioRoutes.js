// Rutas de negocios.
// GET es público (cualquier visitante puede consultar el catálogo).
// POST y PUT requieren token JWT (solo usuarios autenticados pueden crear o editar).
const express = require("express");
const router = express.Router();
const negocioController = require("../controllers/negocioController");
const verificarToken = require("../middleware/auth");

router.get("/negocios", negocioController.obtenerNegocios); // público
router.get("/negocios/:id", negocioController.obtenerNegocio); // público
router.post("/negocios", verificarToken, negocioController.crearNegocio); // protegido
router.put("/negocios/:id", verificarToken, negocioController.editarNegocio); // protegido

module.exports = router;
