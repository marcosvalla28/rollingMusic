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
                      bg-gradient-to-b from-purple-950/40 to-black/40
                      border-r border-purple-500/10
                      w-full h-full overflow-y-auto">
      <nav aria-label="NavegaciÃ³n principal" className="flex flex-col flex-1 p-2 pt-4">
        <ul className="flex flex-col space-y-1">
          {menuItems.map(({ href, label, icon }) => (
            <SideMenuItem key={href} href={href} onClick={onItemClick}>
              <FontAwesomeIcon
                icon={icon}
                className="w-4 h-4 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{label}</span>
            </SideMenuItem>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;