// Rutas de productos
const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");

router.post("/productos", productoController.crearProducto); // POST /api/productos

module.exports = router;
