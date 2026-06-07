// Página para agregar un nuevo producto.
// Carga la lista de negocios al montar para poblar el selector de negocio.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productoService, negocioService } from "../services/api";
import "../styles/pages.css";

export default function CrearProducto() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        negocioId: "",
        disponible: true, // los productos se crean como disponibles por defecto
    });
    const [negocios, setNegocios] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Carga todos los negocios para que el usuario pueda seleccionar a cuál pertenece
        negocioService
            .getAll()
            .then(({ data }) => setNegocios(data))
            .catch(() => setError("No se pudieron cargar los negocios"));
    }, []);

    const handleChange = (e) => {
        // Los checkboxes usan e.target.checked en lugar de e.target.value
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const payload = {
                nombre: form.nombre,
                precio: parseFloat(form.precio), // convierte string a número
                negocioId: parseInt(form.negocioId), // convierte string a entero
                disponible: form.disponible,
            };
            const { data } = await productoService.crear(payload);
            setSuccess(
                `¡Producto "${data.producto.nombre}" agregado exitosamente!`,
            );
            setForm({
                nombre: "",
                precio: "",
                negocioId: "",
                disponible: true,
            });
            setTimeout(() => navigate("/productos"), 1500);
        } catch (err) {
            setError(err.response?.data?.error || "Error al crear el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Agregar producto</h1>
                <p>Publica un nuevo producto en tu negocio</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del producto</label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Bolsa de café orgánico 500g"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio (COP)</label>
                        <input
                            id="precio"
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            placeholder="Ej: 12000"
                            min="0"
                            step="100"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="negocioId">Negocio</label>
                        <select
                            id="negocioId"
                            name="negocioId"
                            value={form.negocioId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un negocio</option>
                            {negocios.map((n) => (
                                <option key={n.id} value={n.id}>
                                    {n.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group form-group-check">
                        <label className="check-label">
                            <input
                                type="checkbox"
                                name="disponible"
                                checked={form.disponible}
                                onChange={handleChange}
                            />
                            <span>Producto disponible</span>
                        </label>
                        <p className="check-hint">
                            Desmarca si el producto está agotado
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Agregar producto"}
                    </button>
                </form>
            </div>
        </div>
    );
}
