import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import schoolLogo from "src\assets\images\home\hero\SanskarLogopage.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeAbout = () => {
    setAboutOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 left-0 w-full z-50 font-sans transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-md py-2" 
          : "bg-blue-100/80 py-3" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">

        {/* Logo - School Name in ONE LINE */}
        <NavLink 
          to="/" 
          className="flex items-center gap-3 group school-name" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={schoolLogo}
            alt="Sanskar English Medium School Logo"
            className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col items-start justify-center">
            {/* Smaller registration text */}
            <div className="flex items-center gap-2 leading-none">
              <span className="text-[8px] font-semibold text-[#1A4D8D] opacity-70">
                Reg.No: F12121/NSK
              </span>
              <span className="text-[8px] font-semibold text-[#1A4D8D] opacity-70">
                BK Educational And Welfare Society's
              </span>
            </div>
            {/* School name */}
            <span className="font-extrabold text-xl text-[#1A4D8D] tracking-tight leading-tight group-hover:text-[#E91E63] transition-colors whitespace-nowrap mt-0.5">
              Sanskar English Medium School
            </span>
          </div>
        </NavLink>

        {/* RIGHT SIDE - Nav + Button in ONE LINE */}
        <div className="flex items-center gap-3">
          {/* DESKTOP MENU - All in one line */}
          <nav className="hidden lg:flex gap-1 items-center">

            <NavLink
              to="/"
              onMouseEnter={closeAbout}
              className={({ isActive }) => 
                `menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 relative ${isActive ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`
              }
            >
              <span className="liquid"></span>
              Home
            </NavLink>

            {/* ABOUT DROPDOWN */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <span 
                className={`menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1 relative ${aboutOpen ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`}
              >
                <span className="liquid"></span>
                About  
              </span>

              {aboutOpen && (
                <div 
                  className="absolute top-full left-0 pt-4 w-64 z-50"
                >
                    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden py-2 ring-1 ring-black/5">
                      <DropdownItem to="/about" closeMenu={closeAbout}>About School</DropdownItem>
                      <DropdownItem to="/about/educators" closeMenu={closeAbout} icon="👩‍🏫">Our Educators</DropdownItem>
                      <DropdownItem to="/about/trust" closeMenu={closeAbout} icon="🤝">Trust</DropdownItem>
                      <DropdownItem to="/about/infrastructure" closeMenu={closeAbout} icon="🏫">Infrastructure</DropdownItem>
                      <DropdownItem to="/reviews" closeMenu={closeAbout} icon="💬">Testimonials</DropdownItem>
                    </div>
                </div>
              )}
            </div>

            {/* PRINCIPAL'S DESK */}
            <NavLink
              to="/principal-desk"
              onMouseEnter={closeAbout}
              className={({ isActive }) => 
                `menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 relative ${isActive ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`
              }
            >
              <span className="liquid"></span>
              Principal's Desk
            </NavLink>

            {/* ADMISSIONS DIRECT LINK */}
            <NavLink
              to="/admissions/cbse"
              onMouseEnter={closeAbout}
              className={({ isActive }) => 
                `menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 relative ${isActive ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`
              }
            >
              <span className="liquid"></span>
              Admissions
            </NavLink>

            <NavLink
              to="/contact"
              onMouseEnter={closeAbout}
              className={({ isActive }) => 
                `menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 relative ${isActive ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`
              }
            >
              <span className="liquid"></span>
              Contact Us
            </NavLink>
          </nav>

          {/* CTA Button - Smaller box, larger font */}
          <div className="hidden md:block">
              <NavLink to="/admission">
                <button className="bg-[#FFC107] text-[#1A4D8D] font-extrabold text-lg px-4 py-1.5 rounded-lg shadow-[3px_3px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] cursor-pointer">
                  Admissions ➜
                </button>
              </NavLink>
          </div>

          <button
            className="lg:hidden text-3xl text-[#1A4D8D]"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAboutOpen(false);
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl fixed inset-0 top-[70px] z-40 p-6 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <MobileLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>

            <div>
              <p
                className="font-bold text-xl text-[#1A4D8D] flex justify-between items-center cursor-pointer"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                About <span className="text-sm transition-transform duration-300" style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </p>

              {aboutOpen && (
                <div className="pl-4 mt-3 space-y-3 border-l-4 border-[#FFC107] ml-2">
                  <MobileLink to="/about" onClick={() => setMenuOpen(false)} small>About School</MobileLink>
                  <MobileLink to="/about/educators" onClick={() => setMenuOpen(false)} small>Our Educators</MobileLink>
                  <MobileLink to="/about/trust" onClick={() => setMenuOpen(false)} small>Trust</MobileLink>
                  <MobileLink to="/about/infrastructure" onClick={() => setMenuOpen(false)} small>Infrastructure</MobileLink>
                  <MobileLink to="/reviews" onClick={() => setMenuOpen(false)} small>Testimonials</MobileLink>
                </div>
              )}
            </div>

            <MobileLink to="/principal-desk" onClick={() => setMenuOpen(false)}>Principal's Desk</MobileLink>

             <MobileLink to="/admissions/cbse" onClick={() => setMenuOpen(false)}>Admissions</MobileLink>

            <MobileLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</MobileLink>
            
            <NavLink to="/admission" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-[#FFC107] text-[#1A4D8D] font-extrabold py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] cursor-pointer">
                 Admissions ➜
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const DropdownItem = ({ to, children, closeMenu, icon }) => (
  <NavLink
    to={to}
    onClick={closeMenu}
    className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#1A4D8D] transition-all font-bold group"
  >
    {icon && <span className="group-hover:scale-125 transition-transform">{icon}</span>}
    {children}
  </NavLink>
);

const MobileLink = ({ to, children, onClick, small }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={`block ${small ? 'text-gray-500 text-lg font-medium' : 'text-[#1A4D8D] text-2xl font-extrabold'} hover:text-[#E91E63] transition-colors`}
  >
    {children}
  </NavLink>
);

export default Navbar;
