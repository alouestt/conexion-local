const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const negocioRoutes = require("./routes/negocioRoutes");
const productoRoutes = require("./routes/productoRoutes");

// Permite peticiones desde el frontend en Vercel y localhost
app.use(
    cors({
        origin: [
            "https://conexion-local.vercel.app",
            "http://localhost:5173",
            "http://localhost:3001",
        ],
        credentials: true,
    }),
);

app.use(express.json());

// API routes
app.use("/api", authRoutes);
app.use("/api", negocioRoutes);
app.use("/api", productoRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

module.exports = app;
