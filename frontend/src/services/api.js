// Cliente HTTP centralizado usando Axios.
// En producción usa VITE_API_URL (backend en Render); en desarrollo cae a "/api",
// que el proxy de vite.config.js redirige a http://localhost:3000.
// El interceptor adjunta automáticamente el token JWT en cada petición protegida.
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("cl_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
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
