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
import SongDetail from '../pages/SongDetail';
import About from '../pages/About';
import PlayList from '../pages/PlayList';
import MyPlaylists from '../pages/MyPlaylists';
import Search from '../pages/Search';
import Favorites from '../components/Favorites';
import VerifyEmail from '../pages/VerifyEmail';




const AppRouter = () => {
    return (
                <Router>
                <Routes>
                    {/* RUTAS PÚBLICAS */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />     {/* verificacion de email */}
                    
                    {/* RUTAS PROTEGIDAS (Requieren Login) */}
                    <Route element={<ProtectedRoute requiredRole="user" />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/nosotros" element={<About/>}/>
                        <Route path="/songdetail" element={<SongDetail />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favoritos" element={<Favorites />} />
                        <Route path="/mis-playlists" element={<MyPlaylists />} /> 
                        <Route path="/playlist/:id" element={<PlayList />} />
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