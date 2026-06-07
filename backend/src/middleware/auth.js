// Middleware de autenticación: verifica el token JWT en cada ruta protegida.
// Se invoca antes del controlador en las rutas que requieren sesión activa.
const jwt = require("jsonwebtoken");

/**
 * Extrae y valida el token Bearer del encabezado Authorization.
 * Si el token es válido, adjunta el payload decodificado en req.user
 * para que el controlador conozca el usuario autenticado.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const verificarToken = (req, res, next) => {
    // El encabezado esperado tiene el formato: "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token requerido" });
    }

    try {
        // jwt.verify lanza excepción si el token está vencido o la firma no coincide
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, rol, iat, exp }
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};

module.exports = verificarToken;
