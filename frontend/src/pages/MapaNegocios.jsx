import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../styles/MapaNegocios.css";

// Fix para el ícono por defecto de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const MEDELLIN_CENTER = [6.2442, -75.5812];

const NEGOCIOS_DEMO = [
    {
        id: 1,
        nombre: "Tienda Doña Rosa",
        descripcion: "Abarrotes y productos frescos",
        categoria: "Abarrotes",
        coords: [6.2478, -75.5742],
    },
    {
        id: 2,
        nombre: "Artesanías El Poblado",
        descripcion: "Tejidos y artesanías hechas a mano",
        categoria: "Artesanías",
        coords: [6.2087, -75.5694],
    },
    {
        id: 3,
        nombre: "Panadería La Esperanza",
        descripcion: "Pan recién horneado cada mañana",
        categoria: "Panadería",
        coords: [6.2631, -75.5958],
    },
    {
        id: 4,
        nombre: "Frutas y Verduras Don Carlos",
        descripcion: "Productos del campo directo al consumidor",
        categoria: "Frutas",
        coords: [6.2385, -75.5674],
    },
];

export default function MapaNegocios() {
    return (
        <div className="mapa-page">
            <div className="mapa-sidebar">
                <h2>Negocios cercanos</h2>
                <p className="mapa-subtitle">Medellín, Antioquia</p>
                <div className="mapa-lista">
                    {NEGOCIOS_DEMO.map((n) => (
                        <div key={n.id} className="mapa-negocio-item">
                            <div className="mapa-negocio-icon">📍</div>
                            <div>
                                <h4>{n.nombre}</h4>
                                <span className="mapa-categoria">
                                    {n.categoria}
                                </span>
                                <p>{n.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mapa-container">
                <MapContainer
                    center={MEDELLIN_CENTER}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {NEGOCIOS_DEMO.map((n) => (
                        <Marker key={n.id} position={n.coords}>
                            <Popup>
                                <strong>{n.nombre}</strong>
                                <br />
                                <span
                                    style={{
                                        color: "#5a7a6a",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {n.categoria}
                                </span>
                                <br />
                                {n.descripcion}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
