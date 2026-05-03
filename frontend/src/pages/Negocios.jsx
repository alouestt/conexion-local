import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { negocioService } from "../services/api";
import "../styles/lista.css";

export default function Negocios() {
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        negocioService
            .getAll()
            .then(({ data }) => setNegocios(data))
            .catch(() => setError("No se pudieron cargar los negocios"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="lista-page">
            <div className="lista-header">
                <div>
                    <h1>Negocios</h1>
                    <p>Listado de todos los negocios registrados</p>
                </div>
                <Link to="/negocios/nuevo" className="btn btn-primary">
                    + Nuevo negocio
                </Link>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="lista-loading">Cargando...</div>
            ) : negocios.length === 0 ? (
                <div className="lista-empty">
                    <span>🏪</span>
                    <p>No hay negocios registrados aún.</p>
                    <Link to="/negocios/nuevo" className="btn btn-accent">
                        Registrar el primero
                    </Link>
                </div>
            ) : (
                <div className="lista-tabla-wrapper">
                    <table className="lista-tabla">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Productos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {negocios.map((n) => (
                                <tr key={n.id}>
                                    <td className="td-id">#{n.id}</td>
                                    <td className="td-nombre">{n.nombre}</td>
                                    <td className="td-desc">
                                        {n.descripcion || (
                                            <span className="sin-dato">—</span>
                                        )}
                                    </td>
                                    <td className="td-badge">
                                        <span className="badge">
                                            {n.Productos?.length ?? 0}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/negocios/${n.id}/editar`}
                                            className="btn-accion"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
