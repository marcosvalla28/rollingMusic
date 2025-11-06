import SideMenuItem from "./SideMenuItem";

function Aside() {
  return (
    <nav className="flex flex-col flex-1 bg-linear-to-b from-purple-950/40 to-black/40 rounded-lg p-2 text-white">
      <ul className="flex flex-col space-y-2">
        <SideMenuItem href="/">Inicio</SideMenuItem>
        <SideMenuItem href="/artista">Artista</SideMenuItem>
        <SideMenuItem href="/album">Álbum</SideMenuItem>
        <SideMenuItem href="/nosotros">Sobre Nosotros</SideMenuItem>
        <SideMenuItem href="/lista-de-reproduccion">Lista de Reproducción</SideMenuItem>
      </ul>
    </nav>
  );
}

export default Aside;
