import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productoService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/lista.css";

export default function Productos() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        productoService
            .getAll()
            .then(({ data }) => setProductos(data))
            .catch(() => setError("No se pudieron cargar los productos"))
            .finally(() => setLoading(false));
    }, []);

    const formatPrecio = (precio) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(precio);

    return (
        <div className="lista-page">
            <div className="lista-header">
                <div>
                    <h1>Productos</h1>
                    <p>Listado de todos los productos publicados</p>
                </div>
                {user && (
                    <Link to="/productos/nuevo" className="btn btn-primary">
                        + Nuevo producto
                    </Link>
                )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="lista-loading">Cargando...</div>
            ) : productos.length === 0 ? (
                <div className="lista-empty">
                    <span>📦</span>
                    <p>No hay productos registrados aún.</p>
                    {user && (
                        <Link to="/productos/nuevo" className="btn btn-accent">
                            Agregar el primero
                        </Link>
                    )}
                </div>
            ) : (
                <div className="lista-tabla-wrapper">
                    <table className="lista-tabla">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Negocio</th>
                                <th>Disponibilidad</th>
                                {user && <th>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => (
                                <tr key={p.id}>
                                    <td className="td-id">#{p.id}</td>
                                    <td className="td-nombre">{p.nombre}</td>
                                    <td className="td-precio">
                                        {formatPrecio(p.precio)}
                                    </td>
                                    <td>
                                        {p.Negocio ? (
                                            <span className="negocio-tag">
                                                {p.Negocio.nombre}
                                            </span>
                                        ) : (
                                            <span className="sin-dato">—</span>
                                        )}
                                    </td>
                                    <td>
                                        {p.disponible === false ? (
                                            <span className="badge-agotado">
                                                Agotado
                                            </span>
                                        ) : (
                                            <span className="badge-disponible">
                                                Disponible
                                            </span>
                                        )}
                                    </td>
                                    {user && (
                                        <td>
                                            <Link
                                                to={`/productos/${p.id}/editar`}
                                                className="btn-accion"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!user && (
                <p className="lista-nota">
                    ¿Eres vendedor?{" "}
                    <button
                        className="link-btn"
                        onClick={() => navigate("/registro")}
                    >
                        Regístrate
                    </button>{" "}
                    o{" "}
                    <button
                        className="link-btn"
                        onClick={() => navigate("/login")}
                    >
                        inicia sesión
                    </button>{" "}
                    para publicar y gestionar productos.
                </p>
            )}
        </div>
    );
}
