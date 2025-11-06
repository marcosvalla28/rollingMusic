import SideMenuItem from "./SideMenuItem";

function Aside({ onItemClick }) {
  return (
    <nav className="flex flex-col flex-1 bg-linear-to-b from-purple-950/40 to-black/40 rounded-lg p-2 text-white">
      <ul className="flex flex-col space-y-2">
        <SideMenuItem href="/" onClick={onItemClick}>Inicio</SideMenuItem>
        <SideMenuItem href="/artista" onClick={onItemClick}>Artista</SideMenuItem>
        <SideMenuItem href="/album" onClick={onItemClick}>Álbum</SideMenuItem>
        <SideMenuItem href="/nosotros" onClick={onItemClick}>Sobre Nosotros</SideMenuItem>
        <SideMenuItem href="/playlist" onClick={onItemClick}>Lista de Reproducción</SideMenuItem>
      </ul>
    </nav>
  );
}

export default Aside;