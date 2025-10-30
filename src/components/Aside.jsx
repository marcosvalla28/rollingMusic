import SideMenuItem from "./SideMenuItem";
import LibraryIcon from "../icons/LibraryIcon";
import SideMenuCard from "./SideMenuCard";



function Aside() {
  return (
    <nav className="flex flex-col flex-1 gap-2">
      <div className="bg-blue-700 rounded-lg p-2 flex-1">
        <ul>
          <SideMenuItem href="/">
            <LibraryIcon />
            Tu Biblioteca
          </SideMenuItem>
        </ul>
      </div>
    </nav>
  );
}

export default Aside;
