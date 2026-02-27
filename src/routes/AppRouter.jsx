import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Home from "../pages/Home";
import About from "../pages/About";
import SongDetail from "../pages/SongDetail";
import Search from "../pages/Search";
import Favorites from "../components/Favorites";
import MyPlaylists from "../pages/MyPlaylists";
import PlayList from "../pages/PlayList";
import Admin from "../pages/Admin";
import Album from "../pages/Album";
import Artist from "../pages/Artist";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* RUTAS CON LAYOUT */}
        <Route element={<MainLayout />}>
          {/* USER */}
          <Route element={<ProtectedRoute requiredRole="user" />}>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<About />} />
            <Route path="songdetail" element={<SongDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="mis-playlists" element={<MyPlaylists />} />
            <Route path="playlist/:id" element={<PlayList />} />
            <Route path="album" element={<Album />} />
            <Route path="artist" element={<Artist />} />
          </Route>

          {/* ADMIN */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;