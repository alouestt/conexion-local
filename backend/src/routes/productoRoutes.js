// Rutas de productos.
// GET es público (cualquier visitante puede ver el catálogo de productos).
// POST y PUT requieren token JWT (solo usuarios autenticados pueden crear o editar).
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const verificarToken = require("../middleware/auth");

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Listar productos (público)
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/productos", productoController.obtenerProductos);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener producto por ID (público)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/productos/:id", productoController.obtenerProducto);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear producto (requiere autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, precio, negocioId]
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               negocioId:
 *                 type: integer
 *               disponible:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *       401:
 *         description: Token requerido
 */
router.post("/productos", verificarToken, productoController.crearProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Editar producto (requiere autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       401:
 *         description: Token requerido
 */
router.put("/productos/:id", verificarToken, productoController.editarProducto);

module.exports = router;
