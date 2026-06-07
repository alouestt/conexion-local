// Cliente HTTP centralizado usando Axios.
// baseURL "/api" funciona gracias al proxy configurado en vite.config.js,
// que redirige las peticiones a http://localhost:3000 durante el desarrollo.
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});

/** Servicios de autenticación */
export const authService = {
    register: (data) => api.post("/register", data),
    login: (data) => api.post("/login", data),
};

/** Servicios de negocios. getAll acepta params opcionales (nombre, categoria) */
export const negocioService = {
    getAll: (params) => api.get("/negocios", { params }),
    getById: (id) => api.get(`/negocios/${id}`),
    crear: (data) => api.post("/negocios", data),
    editar: (id, data) => api.put(`/negocios/${id}`, data),
};

/** Servicios de productos */
export const productoService = {
    getAll: () => api.get("/productos"),
    getById: (id) => api.get(`/productos/${id}`),
    crear: (data) => api.post("/productos", data),
    editar: (id, data) => api.put(`/productos/${id}`, data),
};

export default api;
