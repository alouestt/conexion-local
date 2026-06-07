const express = require("express");
const router = express.Router();
const negocioController = require("../controllers/negocioController");
const verificarToken = require("../middleware/auth");

router.get("/negocios", negocioController.obtenerNegocios);
router.get("/negocios/:id", negocioController.obtenerNegocio);
router.post("/negocios", verificarToken, negocioController.crearNegocio);
router.put("/negocios/:id", verificarToken, negocioController.editarNegocio);

module.exports = router;
