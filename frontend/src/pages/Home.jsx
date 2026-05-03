import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const NEGOCIOS_DEMO = [
    {
        id: 1,
        nombre: "Tienda Doña Rosa",
        categoria: "Abarrotes",
        descripcion:
            "Productos frescos del barrio Laureles. Frutas, verduras y más.",
        calificacion: 4.8,
    },
    {
        id: 2,
        nombre: "Artesanías El Poblado",
        categoria: "Artesanías",
        descripcion:
            "Tejidos y artesanías hechas a mano por familias del sector.",
        calificacion: 4.9,
    },
    {
        id: 3,
        nombre: "Panadería La Esperanza",
        categoria: "Panadería",
        descripcion:
            "Pan recién horneado cada mañana. Tradición de más de 20 años.",
        calificacion: 4.7,
    },
];

const PASOS = [
    {
        icono: "🏪",
        titulo: "Registra tu negocio",
        desc: "Crea el perfil digital de tu negocio en minutos, completamente gratis.",
    },
    {
        icono: "📦",
        titulo: "Publica tus productos",
        desc: "Agrega fotos, precios y descripciones para que los clientes te encuentren.",
    },
    {
        icono: "🤝",
        titulo: "Conecta con clientes",
        desc: "Recibe pedidos y reseñas de tu comunidad cercana.",
    },
];

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Descubre el comercio
                        <br />
                        <span>de tu barrio</span>
                    </h1>
                    <p className="hero-subtitle">
                        ConexiónLocal conecta a los pequeños comerciantes de
                        Medellín con sus vecinos. Apoya la economía local y
                        encuentra productos únicos cerca de ti.
                    </p>
                    <div className="hero-actions">
                        <Link to="/mapa" className="btn btn-primary">
                            Explorar negocios
                        </Link>
                        {!user && (
                            <Link to="/registro" className="btn btn-secondary">
                                Publica tu negocio
                            </Link>
                        )}
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-map-placeholder">
                        <span>📍</span>
                        <p>Medellín</p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats">
                <div className="stat">
                    <span className="stat-number">1,500+</span>
                    <span className="stat-label">
                        Microempresas en Medellín
                    </span>
                </div>
                <div className="stat">
                    <span className="stat-number">68%</span>
                    <span className="stat-label">Sin presencia digital</span>
                </div>
                <div className="stat">
                    <span className="stat-number">74%</span>
                    <span className="stat-label">
                        Compran en línea mensualmente
                    </span>
                </div>
            </section>

            {/* Cómo funciona */}
            <section className="como-funciona">
                <div className="container">
                    <h2 className="section-title">¿Cómo funciona?</h2>
                    <p className="section-subtitle">
                        En tres pasos conecta tu negocio con la comunidad
                    </p>
                    <div className="pasos-grid">
                        {PASOS.map((paso, i) => (
                            <div key={i} className="paso-card">
                                <div className="paso-icono">{paso.icono}</div>
                                <h3>{paso.titulo}</h3>
                                <p>{paso.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Negocios destacados */}
            <section className="negocios-destacados">
                <div className="container">
                    <h2 className="section-title">Negocios destacados</h2>
                    <p className="section-subtitle">
                        Conoce algunos de los comercios de tu comunidad
                    </p>
                    <div className="negocios-grid">
                        {NEGOCIOS_DEMO.map((n) => (
                            <div key={n.id} className="negocio-card">
                                <div className="negocio-card-header">
                                    <span className="negocio-categoria">
                                        {n.categoria}
                                    </span>
                                    <span className="negocio-rating">
                                        ⭐ {n.calificacion}
                                    </span>
                                </div>
                                <h3>{n.nombre}</h3>
                                <p>{n.descripcion}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ver-mas">
                        <Link to="/mapa" className="btn btn-accent">
                            Ver todos en el mapa
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            {!user && (
                <section className="cta">
                    <h2>¿Tienes un negocio local?</h2>
                    <p>Únete gratis y llega a más clientes en tu comunidad</p>
                    <Link to="/registro" className="btn btn-primary">
                        Registrarme ahora
                    </Link>
                </section>
            )}
        </div>
    );
}
