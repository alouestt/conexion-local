// Panel principal del usuario autenticado.
// Muestra un saludo personalizado y accesos directos a las secciones principales.
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

// Acciones disponibles desde el panel; se renderizan como tarjetas de navegación
const ACCIONES = [
    {
        icono: "🏪",
        titulo: "Mis negocios",
        desc: "Consulta, registra y edita los negocios de tu cuenta.",
        href: "/negocios",
        color: "#e8f5e9",
    },
    {
        icono: "📦",
        titulo: "Mis productos",
        desc: "Consulta, agrega y edita los productos publicados.",
        href: "/productos",
        color: "#e3f2fd",
    },
    {
        icono: "🗺️",
        titulo: "Ver mapa",
        desc: "Explora los negocios cercanos en el mapa interactivo.",
        href: "/mapa",
        color: "#fff8e1",
    },
];

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="container">
                    {/* user?.nombre usa optional chaining porque el contexto
                        puede tardar un ciclo en hidratarse desde localStorage */}
                    <h1>¡Hola, {user?.nombre}! 👋</h1>
                    <p>Bienvenido a tu panel de ConexiónLocal</p>
                </div>
            </div>

            <div className="container dashboard-body">
                {/* Tarjeta de información del usuario */}
                <div className="user-info-card card">
                    <div className="user-avatar">
                        {user?.nombre?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <h3>{user?.nombre}</h3>
                        <p>{user?.correo}</p>
                    </div>
                </div>

                <h2 className="acciones-titulo">¿Qué deseas hacer?</h2>
                <div className="acciones-grid">
                    {ACCIONES.map((a) => (
                        <Link
                            key={a.href}
                            to={a.href}
                            className="accion-card"
                            style={{ background: a.color }}
                        >
                            <span className="accion-icono">{a.icono}</span>
                            <h3>{a.titulo}</h3>
                            <p>{a.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
