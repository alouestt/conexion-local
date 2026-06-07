const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ConexiónLocal API",
            version: "1.0.0",
            description:
                "API REST para la plataforma de marketplace hiperlocal ConexiónLocal",
        },
        servers: [
            {
                url: "https://conexionlocal-backend.onrender.com",
                description: "Servidor de producción",
            },
            {
                url: "http://localhost:3000",
                description: "Servidor de desarrollo",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        path.join(__dirname, "../routes/authRoutes.js"),
        path.join(__dirname, "../routes/negocioRoutes.js"),
        path.join(__dirname, "../routes/productoRoutes.js"),
    ],
};

module.exports = swaggerJsdoc(options);
