import SideMenuItem from "./SideMenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMicrophone,
  faCompactDisc,
  faCircleInfo,
  faListUl,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { href: "/",                        label: "Inicio",               icon: faHouse },
    { href: "/search",                    label: "Explorar",                icon: faSearch },
  { href: "/artista",                  label: "Artista",              icon: faMicrophone },
  { href: "/album",                    label: "Album",                icon: faCompactDisc },
  { href: "/nosotros",                 label: "Sobre Nosotros",       icon: faCircleInfo },
  { href: "/lista-de-reproduccion",    label: "Lista de ReproducciÃ³n",icon: faListUl },
];

function Aside({ onItemClick }) {
  return (
    <aside className="hidden md:flex flex-col
                      bg-linear-to-b from-purple-950/40 to-black/40
                      border-r border-purple-500/10
                      w-full h-full overflow-y-auto">
      <nav aria-label="NavegaciÃ³n principal" className="flex flex-col flex-1 p-2 pt-4">
        <ul className="flex flex-col space-y-1">
          {menuItems.map(({ href, label, icon }) => (
            <SideMenuItem key={href} href={href} onClick={onItemClick}>
              <FontAwesomeIcon
                icon={icon}
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{label}</span>
            </SideMenuItem>
          ))}

          {/* 🛠️ FAVORITOS (Separado de Playlists) */}
          <SideMenuItem href="/favoritos" onClick={onItemClick}>
            <FontAwesomeIcon
              icon={faHeart}
              className="w-4 h-4 shrink-0 text-red-500"
              aria-hidden="true"
            />
            <span className="truncate">Favoritos</span>
          </SideMenuItem>

          {/* 🛠️ SECCIÓN DINÁMICA: TUS PLAYLISTS */}
          <div className="pt-6 mt-2 border-t border-white/5">
            <div className="flex items-center justify-between px-4 mb-3">
               <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                Tu Biblioteca
              </p>
              {/* Enlace rápido para ver todas o crear */}
              <a href="/mis-playlists" onClick={onItemClick} className="text-[10px] text-purple-400 hover:text-white">Ver todo</a>
            </div>
            
            <div className="flex flex-col space-y-1">
              {playlists.length > 0 ? (
                playlists.map((pl) => (
                  <SideMenuItem 
                    key={pl._id} 
                    href={`/playlist/${pl._id}`} // 🛠️ Ruta dinámica al detalle
                    onClick={onItemClick}
                  >
                    <FontAwesomeIcon
                      icon={faListUl}
                      className="w-3 h-3 shrink-0 text-gray-400"
                    />
                    <span className="truncate text-sm text-gray-300">{pl.name}</span>
                  </SideMenuItem>
                ))
              ) : (
                <p className="px-4 text-[11px] text-gray-600 italic">No tienes listas aún</p>
              )}
            </div>
          </div>

          {/* SECCIÓN ADMINISTRADOR */}
          {isAdmin && (
            <div className="pt-6 mt-6 border-t border-purple-900/30">
              <p className="px-4 mb-2 text-[10px] uppercase tracking-widest font-bold text-purple-500">
                Administración
              </p>
              <SideMenuItem href="/admin" onClick={onItemClick}>
                <FontAwesomeIcon
                  icon={faLock}
                  className="w-4 h-4 shrink-0 text-fuchsia-500"
                  aria-hidden="true"
                />
                <span className="truncate font-bold text-fuchsia-400">Panel Admin</span>
              </SideMenuItem>
            </div>
          )}

        </ul>
      </nav>
    </aside>
  );
}

export default Aside;