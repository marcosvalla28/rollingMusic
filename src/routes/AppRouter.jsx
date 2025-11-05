import React from 'react';
// Importamos solo lo necesario para manejar las rutas
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

// Importa las Páginas y Lógica de Rutas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import NotFound from "../pages/NotFound"; 
import ProtectedRoute from '../components/ProtectedRoute';



const AppRouter = () => {
    return (
                <Router>
                <Routes>
                    {/* RUTAS PÚBLICAS */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* RUTAS PROTEGIDAS (Requieren Login) */}
                    <Route element={<ProtectedRoute requiredRole="user" />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    {/* RUTAS DE ADMINISTRADOR (Requieren Rol 'admin') */}
                    <Route element={<ProtectedRoute requiredRole="admin" />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>

                    {/* Ruta de Fallback (404) */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Router>
    );
};

export default AppRouter;