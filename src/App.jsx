import WavePlayer from "./components/WavePlayer";
import "./App.css";
import Aside from "./components/Aside";
import Player from './components/Player'
import Home from './pages/Home'



function App() {
  return (
    <>
      <div id="app" className="relative h-screen p-2 gap-2">
    
        <header className="[grid-area:navbar] flex-col flex overflow-y-auto">
          Navbar
          <Home/>
        </header>
    
        <aside className=" flex-col flex overflow-y-auto">
          <Aside className="[grid-area:aside]"></Aside>
        </aside>
    
        <main className="[grid-area:main] bg-zinc-600"> 
        <slot />
        </main>
    
        <footer className="[grid-area:player] min-h-[100px] bg-black">
          PLAYER
          <Player/>
          <WavePlayer  />
        </footer>
      </div>
  </>
  );    
}

export default App;
