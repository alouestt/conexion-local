import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productoService, negocioService } from "../services/api";
import "../styles/pages.css";

export default function EditarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        negocioId: "",
        disponible: true,
    });
    const [negocios, setNegocios] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        Promise.all([productoService.getById(id), negocioService.getAll()])
            .then(([{ data: producto }, { data: negs }]) => {
                setForm({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    negocioId: producto.negocioId,
                    disponible: producto.disponible !== false,
                });
                setNegocios(negs);
            })
            .catch(() => setError("No se pudieron cargar los datos"))
            .finally(() => setCargando(false));
    }, [id]);

    const handleChange = (e) => {
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
                precio: parseFloat(form.precio),
                negocioId: parseInt(form.negocioId),
                disponible: form.disponible,
            };
            await productoService.editar(id, payload);
            setSuccess("¡Producto actualizado exitosamente!");
            setTimeout(() => navigate("/productos"), 1500);
        } catch (err) {
            setError(
                err.response?.data?.error || "Error al actualizar el producto",
            );
        } finally {
            setLoading(false);
        }
    };

    if (cargando)
        return (
            <div className="form-page">
                <p>Cargando...</p>
            </div>
        );

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Editar producto</h1>
                <p>Modifica los datos del producto #{id}</p>

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
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/productos")}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
