// Página de listado de negocios.
// Permite a cualquier visitante explorar el catálogo con filtros en tiempo real.
// Los usuarios autenticados ven además los botones de gestión (crear, editar).
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { negocioService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/lista.css";

// Categorías disponibles para filtrar. Deben coincidir con las del formulario de creación.
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

export default function Negocios() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("");

    // useCallback memoiza la función para que useEffect pueda usarla como
    // dependencia sin recrearla en cada render
    const cargarNegocios = useCallback(() => {
        setLoading(true);
        const params = {};
        if (busqueda.trim()) params.nombre = busqueda.trim();
        if (categoriaFiltro) params.categoria = categoriaFiltro;
        negocioService
            .getAll(params)
            .then(({ data }) => setNegocios(data))
            .catch(() => setError("No se pudieron cargar los negocios"))
            .finally(() => setLoading(false));
    }, [busqueda, categoriaFiltro]);

    useEffect(() => {
        // Debounce de 300 ms: espera a que el usuario deje de escribir antes
        // de enviar la petición al backend, evitando llamadas en cada tecla
        const timer = setTimeout(cargarNegocios, 300);
        return () => clearTimeout(timer); // limpia el timer si el efecto se re-ejecuta
    }, [cargarNegocios]);

    return (
        <div className="lista-page">
            <div className="lista-header">
                <div>
                    <h1>Negocios</h1>
                    <p>Listado de todos los negocios registrados</p>
                </div>
                {/* Solo usuarios autenticados pueden crear negocios */}
                {user && (
                    <Link to="/negocios/nuevo" className="btn btn-primary">
                        + Nuevo negocio
                    </Link>
                )}
            </div>

            {/* Barra de filtros: búsqueda por texto y por categoría */}
            <div className="lista-filtros">
                <input
                    type="text"
                    className="filtro-input"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select
                    className="filtro-select"
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {CATEGORIAS.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                {/* Botón "Limpiar" visible solo si hay algún filtro activo */}
                {(busqueda || categoriaFiltro) && (
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setBusqueda("");
                            setCategoriaFiltro("");
                        }}
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="lista-loading">Cargando...</div>
            ) : negocios.length === 0 ? (
                <div className="lista-empty">
                    <span>🏪</span>
                    <p>
                        {busqueda || categoriaFiltro
                            ? "No se encontraron negocios con esos filtros."
                            : "No hay negocios registrados aún."}
                    </p>
                    {user && !busqueda && !categoriaFiltro && (
                        <Link to="/negocios/nuevo" className="btn btn-accent">
                            Registrar el primero
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
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Productos</th>
                                {/* Columna de acciones visible solo para usuarios autenticados */}
                                {user && <th>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {negocios.map((n) => (
                                <tr key={n.id}>
                                    <td className="td-id">#{n.id}</td>
                                    <td className="td-nombre">{n.nombre}</td>
                                    <td>
                                        {n.categoria ? (
                                            <span className="badge">
                                                {n.categoria}
                                            </span>
                                        ) : (
                                            <span className="sin-dato">—</span>
                                        )}
                                    </td>
                                    <td className="td-desc">
                                        {n.descripcion || (
                                            <span className="sin-dato">—</span>
                                        )}
                                    </td>
                                    <td className="td-badge">
                                        {/* n.Productos viene del include de Sequelize */}
                                        <span className="badge">
                                            {n.Productos?.length ?? 0}
                                        </span>
                                    </td>
                                    {user && (
                                        <td>
                                            <Link
                                                to={`/negocios/${n.id}/editar`}
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

            {/* Invitación a registrarse visible solo para visitantes anónimos */}
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
                    para gestionar tu negocio.
                </p>
            )}
        </div>
    );
}
