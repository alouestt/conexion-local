// Punto de entrada de la aplicación React.
// leaflet.css debe importarse aquí (antes de los estilos propios) para que
// las reglas del mapa puedan sobrescribirse sin usar !important.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
