import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { negocioService } from "../services/api";
import "../styles/pages.css";

export default function CrearNegocio() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: "", descripcion: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const { data } = await negocioService.crear(form);
            setSuccess(
                `¡Negocio "${data.negocio.nombre}" creado exitosamente!`,
            );
            setForm({ nombre: "", descripcion: "" });
            setTimeout(() => navigate("/negocios"), 1500);
        } catch (err) {
            setError(err.response?.data?.error || "Error al crear el negocio");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Registrar negocio</h1>
                <p>Crea el perfil digital de tu negocio en ConexiónLocal</p>

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
                            placeholder="Ej: Tienda Doña Rosa"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Describe brevemente tu negocio y los productos o servicios que ofreces..."
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrar negocio"}
                    </button>
                </form>
            </div>
        </div>
    );
}
