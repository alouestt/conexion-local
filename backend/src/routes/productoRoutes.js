// Rutas de productos.
// GET es público (cualquier visitante puede ver el catálogo de productos).
// POST y PUT requieren token JWT (solo usuarios autenticados pueden crear o editar).
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const verificarToken = require("../middleware/auth");

router.get("/productos", productoController.obtenerProductos); // público
router.get("/productos/:id", productoController.obtenerProducto); // público
router.post("/productos", verificarToken, productoController.crearProducto); // protegido
router.put("/productos/:id", verificarToken, productoController.editarProducto); // protegido

module.exports = router;
