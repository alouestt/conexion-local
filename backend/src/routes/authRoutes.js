// Rutas de autenticación: registro e inicio de sesión de usuarios.
// Estas rutas son públicas y no requieren token JWT.
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register); // POST /api/register
router.post("/login", authController.login); // POST /api/login

module.exports = router;
