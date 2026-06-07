const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const verificarToken = require("../middleware/auth");

router.get("/productos", productoController.obtenerProductos);
router.get("/productos/:id", productoController.obtenerProducto);
router.post("/productos", verificarToken, productoController.crearProducto);
router.put("/productos/:id", verificarToken, productoController.editarProducto);

module.exports = router;
