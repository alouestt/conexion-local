// Configuracion de la aplicacion Express: middlewares y rutas
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const negocioRoutes = require("./routes/negocioRoutes");
const productoRoutes = require("./routes/productoRoutes");

// Permite recibir JSON en el body de las peticiones
app.use(express.json());

// Todas las rutas de la API se agrupan bajo el prefijo /api
app.use("/api", authRoutes);
app.use("/api", negocioRoutes);
app.use("/api", productoRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

module.exports = app;
