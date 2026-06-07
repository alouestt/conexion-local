// Rutas de negocios.
// GET es público (cualquier visitante puede consultar el catálogo).
// POST y PUT requieren token JWT (solo usuarios autenticados pueden crear o editar).
const express = require("express");
const router = express.Router();
const negocioController = require("../controllers/negocioController");
const verificarToken = require("../middleware/auth");

/**
 * @swagger
 * /api/negocios:
 *   get:
 *     summary: Listar negocios (público)
 *     tags: [Negocios]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *     responses:
 *       200:
 *         description: Lista de negocios
 */
router.get("/negocios", negocioController.obtenerNegocios);

/**
 * @swagger
 * /api/negocios/{id}:
 *   get:
 *     summary: Obtener negocio por ID (público)
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Negocio encontrado
 *       404:
 *         description: Negocio no encontrado
 */
router.get("/negocios/:id", negocioController.obtenerNegocio);

/**
 * @swagger
 * /api/negocios:
 *   post:
 *     summary: Crear negocio (requiere autenticación)
 *     tags: [Negocios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Negocio creado exitosamente
 *       401:
 *         description: Token requerido
 */
router.post("/negocios", verificarToken, negocioController.crearNegocio);

/**
 * @swagger
 * /api/negocios/{id}:
 *   put:
 *     summary: Editar negocio (requiere autenticación)
 *     tags: [Negocios]
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
 *               descripcion:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Negocio actualizado
 *       401:
 *         description: Token requerido
 */
router.put("/negocios/:id", verificarToken, negocioController.editarNegocio);

module.exports = router;
