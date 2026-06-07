// Barra de navegación principal de la aplicación.
// Muestra opciones distintas según si el usuario ha iniciado sesión o no.
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // redirige al inicio tras cerrar sesión
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="navbar-icon">📍</span> ConexiónLocal
            </Link>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/mapa">Mapa</Link>

                {/* Menú autenticado: panel propio y botón de cierre de sesión */}
                {user ? (
                    <>
                        <Link to="/dashboard">Mi panel</Link>
                        <button
                            onClick={handleLogout}
                            className="nav-btn-logout"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    /* Menú público: acceso a login y registro */
                    <>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/registro" className="nav-btn-register">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
