import "./App.css";
import { Routes, Route } from "react-router-dom";
import Aside from "./components/Aside.jsx";
import Player from './components/Player.jsx';
import Home from './pages/Home'
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";}
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <div id="app" className="relative min-h-screen flex flex-col bg-black m-0 p-0 ">
    
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

        <div className="[grid-area:main] flex flex-col justify-end items-start">
          <Footer />
        </div>

        </div>  
  </>
  );    
}

export default App;
