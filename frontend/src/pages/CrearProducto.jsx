import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productoService, negocioService } from "../services/api";
import "../styles/pages.css";

export default function CrearProducto() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: "", precio: "", negocioId: "" });
    const [negocios, setNegocios] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        negocioService
            .getAll()
            .then(({ data }) => setNegocios(data))
            .catch(() => setError("No se pudieron cargar los negocios"));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const payload = {
                nombre: form.nombre,
                precio: parseFloat(form.precio),
                negocioId: parseInt(form.negocioId),
            };
            const { data } = await productoService.crear(payload);
            setSuccess(
                `¡Producto "${data.producto.nombre}" agregado exitosamente!`,
            );
            setForm({ nombre: "", precio: "", negocioId: "" });
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
