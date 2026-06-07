// Rutas de autenticación: registro e inicio de sesión de usuarios.
// Estas rutas son públicas y no requieren token JWT.
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, correo, password]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: María Alejandra
 *               correo:
 *                 type: string
 *                 example: maria@test.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       409:
 *         description: El correo ya está registrado
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [correo, password]
 *             properties:
 *               correo:
 *                 type: string
 *                 example: maria@test.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token JWT
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/login", authController.login);

module.exports = router;
