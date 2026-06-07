// Controlador de autenticacion: registro e inicio de sesion de usuarios
const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST /api/register — crea un usuario nuevo con la contrasena hasheada
exports.register = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        // El 10 es el numero de salt rounds; mas alto = mas seguro pero mas lento
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            correo,
            password: hashedPassword,
        });

        res.json({
            message: "Usuario registrado",
            user,
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

// POST /api/login — verifica correo y contraseña, responde con los datos del usuario
exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const user = await User.findOne({ where: { correo } });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // bcrypt.compare compara el texto plano contra el hash almacenado
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.json({
            message: "Login exitoso",
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error en login",
        });
    }
};
