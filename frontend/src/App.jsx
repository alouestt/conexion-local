import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CrearNegocio from "./pages/CrearNegocio";
import CrearProducto from "./pages/CrearProducto";
import MapaNegocios from "./pages/MapaNegocios";
import Negocios from "./pages/Negocios";
import EditarNegocio from "./pages/EditarNegocio";
import Productos from "./pages/Productos";
import EditarProducto from "./pages/EditarProducto";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<Register />} />
                        <Route path="/mapa" element={<MapaNegocios />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/negocios/nuevo"
                            element={
                                <ProtectedRoute>
                                    <CrearNegocio />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/productos/nuevo"
                            element={
                                <ProtectedRoute>
                                    <CrearProducto />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/negocios" element={<Negocios />} />
                        <Route
                            path="/negocios/:id/editar"
                            element={
                                <ProtectedRoute>
                                    <EditarNegocio />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/productos" element={<Productos />} />
                        <Route
                            path="/productos/:id/editar"
                            element={
                                <ProtectedRoute>
                                    <EditarProducto />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
