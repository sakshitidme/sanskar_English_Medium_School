import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const menuItems = [
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <span className="bg-yellow w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg animate-bounce">
            G
          </span>
          <p className="school-name text-yellow-400 font-bold text-lg md:text-3xl">
            Gurukul English Medium School
          </p>
        </NavLink>

        {/* Menu */}
        <nav className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="relative px-2 py-2 font-small text-white rounded-lg menu-btn"
            >
              {item.name}
              <span className="liquid"></span>
            </NavLink>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="hidden md:flex gap-3">
          <span className="w-8 h-8 bg-yellow rounded-md shadow-md"></span>
          <span className="w-8 h-8 bg-yellow rounded-md shadow-md"></span>
          <span className="w-8 h-8 bg-yellow rounded-md shadow-md"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
