const express = require("express");
const router = express.Router();
const negocioController = require("../controllers/negocioController");

router.get("/negocios", negocioController.obtenerNegocios); // GET  /api/negocios
router.get("/negocios/:id", negocioController.obtenerNegocio); // GET  /api/negocios/:id
router.post("/negocios", negocioController.crearNegocio); // POST /api/negocios
router.put("/negocios/:id", negocioController.editarNegocio); // PUT  /api/negocios/:id

module.exports = router;
