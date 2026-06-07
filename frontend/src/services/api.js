import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});

export const authService = {
    register: (data) => api.post("/register", data),
    login: (data) => api.post("/login", data),
};

export const negocioService = {
    getAll: (params) => api.get("/negocios", { params }),
    getById: (id) => api.get(`/negocios/${id}`),
    crear: (data) => api.post("/negocios", data),
    editar: (id, data) => api.put(`/negocios/${id}`, data),
};

export const productoService = {
    getAll: () => api.get("/productos"),
    getById: (id) => api.get(`/productos/${id}`),
    crear: (data) => api.post("/productos", data),
    editar: (id, data) => api.put(`/productos/${id}`, data),
};

export default api;
