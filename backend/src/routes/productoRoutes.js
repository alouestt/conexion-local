const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/productos", productoController.obtenerProductos); // GET  /api/productos
router.get("/productos/:id", productoController.obtenerProducto); // GET  /api/productos/:id
router.post("/productos", productoController.crearProducto); // POST /api/productos
router.put("/productos/:id", productoController.editarProducto); // PUT  /api/productos/:id

module.exports = router;
