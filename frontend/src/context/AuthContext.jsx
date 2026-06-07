// Contexto de autenticación: provee el usuario activo y las funciones
// login/logout a cualquier componente de la aplicación.
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

/**
 * AuthProvider envuelve la aplicación y mantiene el estado del usuario
 * autenticado. Persiste la sesión en localStorage bajo la clave "cl_user".
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        // El try/catch protege contra datos corruptos en localStorage
        // (por ejemplo, si se guardó "undefined" por un error previo).
        try {
            const stored = localStorage.getItem("cl_user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            localStorage.removeItem("cl_user");
            return null;
        }
    });

    /**
     * Guarda el usuario en el estado y en localStorage para sobrevivir recargas.
     * @param {object} userData - Objeto con id, nombre, correo y rol del usuario.
     */
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("cl_user", JSON.stringify(userData));
    };

    /** Limpia el estado y elimina la sesión guardada. */
    const logout = () => {
        setUser(null);
        localStorage.removeItem("cl_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/** Hook de conveniencia para consumir el contexto de autenticación. */
export function useAuth() {
    return useContext(AuthContext);
}
