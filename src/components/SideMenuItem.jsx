import { NavLink } from "react-router-dom";

function SideMenuItem({ href = "#", children }) {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex gap-4 items-center py-3 px-5 font-medium transition duration-300 ${
            isActive ? "text-fuchsia-500" : "text-zinc-50 hover:text-fuchsia-400"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default SideMenuItem;