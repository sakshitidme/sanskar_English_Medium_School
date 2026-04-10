import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import schoolLogo from "../assets/images/home/hero/SanskarLogopage.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAboutActive = location.pathname.startsWith('/about');
  const isAdmissionsActive = location.pathname.startsWith('/admissions');

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
    <>
    <header 
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-all duration-500 ease-in-out border-b ${
        scrolled 
          ? "bg-white/40 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_0_rgba(31,38_135,0.07)] py-2" 
          : "bg-blue-100/30 backdrop-blur-md border-transparent py-3" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">

        {/* Logo - School Name in ONE LINE */}
        <NavLink 
          to="/" 
          className="flex items-center gap-2 md:gap-3 group school-name" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <path
                  id="topSemiCircle"
                  d="M 12, 50 A 38, 38 0 0, 1 88, 50"
                />
              </defs>
              <text className="text-[8px] md:text-[8px] font-bold fill-[#0E4D92] uppercase">
                <textPath xlinkHref="#topSemiCircle" startOffset="50%" textAnchor="middle">
                  Reg.No: F12121/NSK
                </textPath>
              </text>
            </svg>

            <img
              src={schoolLogo}
              alt="Sanskar English Medium School Logo"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover bg-white border-2 border-[#FFC107] shadow-sm transition-transform group-hover:scale-105 z-10"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            {/* Smaller registration text */}
            <div className="flex flex-col items-start leading-tight -mt-3">
              <span className="text-[6px] md:text-[6px] font-bold marathi-verse mt-0.5">
                | नही ज्ञानेन सदृशं पवित्रमिह विद्यते |
              </span>
              <span className="text-[10px] md:text-[10px] font-bold opacity-80 mt-0.5">
                <span className="text-red-600">BK</span> <span className="text-black">Educational And Welfare Society's</span>
              </span>
               
            </div>
            {/* School name - Fit on one line for mobile */}
            <span className="font-extrabold text-[12px] sm:text-lg md:text-xl lg:text-2xl text-[#0E4D92] tracking-tighter leading-none group-hover:text-[#E91E63] transition-colors mt-2 whitespace-nowrap">
              Sanskar English Medium School
            </span>
          </div>
        </NavLink>

        {/* RIGHT SIDE - Nav + Button in ONE LINE */}
        <div className="flex items-center gap-3 mt-4">
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
                className={`menu-btn px-3 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1 relative ${(aboutOpen || isAboutActive) ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`}
              >
                <span className="liquid"></span>
                About  
              </span>

              {aboutOpen && (
                <div 
                  className="absolute top-full left-0 pt-4 w-64 z-50"
                >
                    <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl border border-white/40 overflow-hidden py-2 ring-1 ring-black/5">
                      <DropdownItem to="/about/educators" closeMenu={closeAbout} icon="👩‍🏫">Our Educators</DropdownItem>
                      <DropdownItem to="/about/trust" closeMenu={closeAbout} icon="🤝">Trust</DropdownItem>
                      <DropdownItem to="/about/infrastructure" closeMenu={closeAbout} icon="🏫">Infrastructure</DropdownItem>
                      <DropdownItem to="/reviews" closeMenu={closeAbout} icon="💬">Testimonials</DropdownItem>
                    </div>
                </div>
              )}
            </div>

            <NavLink
              to="/events"
              onMouseEnter={closeAbout}
              className={({ isActive }) => 
                `menu-btn px-2 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 relative ${isActive ? 'bg-[#1A4D8D] text-white shadow-md' : 'text-gray-600 hover:text-[#1A4D8D]'}`
              }
            >
              <span className="liquid"></span>
              Events
            </NavLink>

            {/* LEADERSHIP */}
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
                <button className="bg-[#FFC107] text-[#1A4D8D] font-extrabold text-sm md:text-base px-3 py-1.5 rounded-lg shadow-[3px_3px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer">
                  <span>Admissions</span>
                  <span className="text-lg leading-none mt-[-2px]">➜</span>
                </button>
              </NavLink>
          </div>

            {/* MOBILE HAMBURGER */}
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

    </header>
    
    {/* MOBILE MENU - Moved outside header for better stacking context */}
    <div 
      className={`lg:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out ${
        menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
      }`}
    >
      <div className="p-6 h-full flex flex-col overflow-y-auto pt-8">
        {/* Mobile Menu Header */}
        <div className="flex items-start justify-between mb-8 border-b border-gray-100 pb-6">
           <div className="flex items-center gap-3">
             <img src={schoolLogo} alt="Sanskar Logo" className="w-12 h-12 rounded-full border-2 border-[#FFC107] shadow-sm object-cover" />
             <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">BK Society's</span>
               <span className="font-extrabold text-[#0E4D92] leading-tight text-[17px]">Sanskar English</span>
               <span className="font-extrabold text-[#E91E63] leading-tight text-[17px]">Medium School</span>
             </div>
           </div>
           
           <button
             className="text-2xl text-[#1A4D8D] bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors shrink-0"
             onClick={() => setMenuOpen(false)}
           >
             ✕
           </button>
        </div>

        <div className="flex flex-col gap-6">
          <MobileLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>

          <div className="space-y-2">
            <p
              className={`font-extrabold text-xl flex justify-between items-center cursor-pointer border-b border-gray-50 pb-2 ${isAboutActive ? 'text-[#E91E63]' : 'text-[#1A4D8D]'}`}
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About <span className="text-xs transition-transform duration-300" style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </p>

            {aboutOpen && (
              <div className="pl-4 space-y-3 border-l-2 border-[#FFC107] py-1">
                <MobileLink to="/about/educators" onClick={() => setMenuOpen(false)} small>Our Educators</MobileLink>
                <MobileLink to="/about/trust" onClick={() => setMenuOpen(false)} small>Trust</MobileLink>
                <MobileLink to="/about/infrastructure" onClick={() => setMenuOpen(false)} small>Infrastructure</MobileLink>
                <MobileLink to="/reviews" onClick={() => setMenuOpen(false)} small>Testimonials</MobileLink>
              </div>
            )}
          </div>

          <MobileLink to="/events" onClick={() => setMenuOpen(false)}>Events</MobileLink>
          <MobileLink to="/principal-desk" onClick={() => setMenuOpen(false)}>Principal's Desk</MobileLink>

          <MobileLink to="/admissions/cbse" onClick={() => setMenuOpen(false)}>Admissions</MobileLink>

          <MobileLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</MobileLink>
          
          <div className="pt-4">
            <NavLink to="/admission" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-[#FFC107] text-[#1A4D8D] font-extrabold py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] cursor-pointer">
                Admissions ➜
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </>
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
    className={({ isActive }) => 
      `block transition-all duration-300 ${
        small 
          ? `text-slate-500 text-base font-bold py-1 ${isActive ? 'text-[#E91E63] pl-2' : ''}` 
          : `text-xl font-extrabold py-2 ${isActive ? 'text-[#E91E63] translate-x-1' : 'text-[#1A4D8D]'}`
      } hover:text-[#E91E63] hover:translate-x-1`
    }
  >
    {children}
  </NavLink>
);

export default Navbar;
