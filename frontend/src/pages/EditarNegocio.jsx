// Página para editar un negocio existente.
// Carga los datos actuales del negocio al montar el componente y los precarga en el formulario.
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { negocioService } from "../services/api";
import "../styles/pages.css";

const CATEGORIAS = [
    "Alimentos y bebidas",
    "Ropa y accesorios",
    "Artesanías",
    "Servicios",
    "Tecnología",
    "Salud y belleza",
    "Hogar y jardín",
    "Otro",
];

export default function EditarNegocio() {
    const { id } = useParams(); // ID del negocio obtenido desde la URL (/negocios/:id/editar)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(true); // estado de carga inicial del negocio

    useEffect(() => {
        // Obtiene los datos actuales del negocio para precargar el formulario
        negocioService
            .getById(id)
            .then(({ data }) =>
                setForm({
                    nombre: data.nombre,
                    descripcion: data.descripcion || "",
                    categoria: data.categoria || "", // puede venir null desde la BD
                }),
            )
            .catch(() => setError("No se pudo cargar el negocio"))
            .finally(() => setCargando(false));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await negocioService.editar(id, form);
            setSuccess("¡Negocio actualizado exitosamente!");
            setTimeout(() => navigate("/negocios"), 1500);
        } catch (err) {
            setError(
                err.response?.data?.error || "Error al actualizar el negocio",
            );
        } finally {
            setLoading(false);
        }
    };

    // Muestra un estado de carga mientras se obtienen los datos del negocio
    if (cargando)
        return (
            <div className="form-page">
                <p>Cargando...</p>
            </div>
        );

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Editar negocio</h1>
                <p>Modifica los datos del negocio #{id}</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del negocio</label>
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
                        <label htmlFor="categoria">Categoría</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={form.categoria}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            {CATEGORIAS.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/negocios")}
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
