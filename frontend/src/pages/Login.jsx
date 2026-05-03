import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await authService.login(form);
            login(data.user);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Bienvenido de nuevo</h1>
                <p>Ingresa a tu cuenta de ConexiónLocal</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="correo">Correo electrónico</label>
                        <input
                            id="correo"
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>

                <div className="auth-footer">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
}
