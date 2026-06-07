// Configuración de la aplicación Express: middlewares y rutas.
// Este módulo se exporta por separado de server.js para que los tests
// puedan importarlo sin levantar el servidor real.
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const negocioRoutes = require("./routes/negocioRoutes");
const productoRoutes = require("./routes/productoRoutes");

// Permite leer el body de las peticiones como JSON
app.use(express.json());

// Todas las rutas de la API se agrupan bajo el prefijo /api
app.use("/api", authRoutes);
app.use("/api", negocioRoutes);
app.use("/api", productoRoutes);

// Ruta raíz para verificar que el servidor está activo
app.get("/", (req, res) => {
    res.send("API funcionando");
});

module.exports = app;
