// Controlador de autenticacion: registro e inicio de sesion de usuarios
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/register — crea un usuario nuevo con la contrasena hasheada
exports.register = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

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
            return res
                .status(409)
                .json({ error: "El correo ya está registrado" });
        }
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

// POST /api/login — verifica correo y contraseña, retorna token JWT
exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const user = await User.findOne({ where: { correo } });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

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
