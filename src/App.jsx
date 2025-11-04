
import React from "react";
import SongCard from "./components/SongCard";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Aside from "./components/Aside.jsx";
import Player from './components/Player.jsx';
import Home from './pages/Home'
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>

    <About/>


{/*       <div id="app" className="relative min-h-screen flex flex-col bg-black m-0 p-0 ">
    
        <header className="[grid-area:navbar] flex-col flex overflow-y-auto">
          <Navbar/>
        </header>
    
        <aside className=" flex-col flex overflow-y-auto ">
          <Aside />
        </aside>
    
        <main className="[grid-area:main] bg-black"> 
                <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
    
        <footer className="[grid-area:player] bg-linear-to-b from-purple-950/40">
          <Player  />
        </footer>
        </div>   */}
  </>
  );    
}

export default App;
