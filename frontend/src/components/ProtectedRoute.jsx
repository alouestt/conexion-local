// Componente de ruta protegida.
// Si el usuario no está autenticado, redirige a /login y reemplaza la entrada
// en el historial (replace) para que el botón "atrás" no regrese a la ruta
// protegida.
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
