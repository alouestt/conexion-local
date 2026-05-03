// Rutas de negocios
const express = require("express");
const router = express.Router();

const negocioController = require("../controllers/negocioController");

router.post("/negocios", negocioController.crearNegocio); // POST /api/negocios

module.exports = router;
