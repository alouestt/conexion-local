// Controlador de autenticación: registro e inicio de sesión de usuarios.
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * POST /api/register
 * Crea un nuevo usuario con la contraseña hasheada.
 * Retorna 409 si el correo ya está registrado (restricción UNIQUE en BD).
 */
exports.register = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        // bcrypt con factor 10 es el estándar para hashear contraseñas de forma segura
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            correo,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Usuario registrado",
            id: user.id,
        });
    } catch (error) {
        console.error("Error en register:", error.name, error.message);
        if (error.name === "SequelizeUniqueConstraintError") {
            // El correo ya existe en la tabla Users (columna UNIQUE)
            return res
                .status(409)
                .json({ error: "El correo ya está registrado" });
        }
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

/**
 * POST /api/login
 * Verifica correo y contraseña. Si son válidos, genera y retorna un token JWT.
 * Retorna 404 si el usuario no existe y 401 si la contraseña es incorrecta.
 */
exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const user = await User.findOne({ where: { correo } });

        if (!user) {
            // Se distingue usuario no encontrado (404) de contraseña incorrecta (401)
            // para facilitar mensajes de error claros al usuario final
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // bcrypt.compare compara el texto plano con el hash almacenado
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // El token incluye id y rol para que el middleware pueda verificar permisos
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
        );

        res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                rol: user.rol,
            },
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en login" });
    }
};
