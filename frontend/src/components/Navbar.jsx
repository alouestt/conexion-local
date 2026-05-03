import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="navbar-icon">📍</span> ConexiónLocal
            </Link>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/mapa">Mapa</Link>
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
