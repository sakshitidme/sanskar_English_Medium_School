import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { api } from "../../services/api";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Star, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Banknote
} from "lucide-react";

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const adminProfile = await api.getAdminProfile();
        if (!adminProfile) {
          navigate("/admin/login");
        } else {
          setUser({ email: adminProfile.email }); // Mock user object
        }
      } catch (err) {
        localStorage.removeItem('adminToken');
        navigate("/admin/login");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem('adminToken');
    navigate("/admin/login");
  };

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Admissions", icon: Users, path: "/admin/admissions" },
    { title: "Fees", icon: Banknote, path: "/admin/fees" },
    { title: "Contacts", icon: MessageSquare, path: "/admin/contacts" },
    { title: "Reviews", icon: Star, path: "/admin/reviews" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden" 
          style={{ cursor: 'pointer' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 h-screen z-50 bg-[#0b2a4a] text-white transition-all duration-300 flex flex-col shadow-2xl lg:shadow-none shrink-0 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-24 overflow-hidden"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex items-center justify-between min-w-[240px]">
          <h1 className={`${sidebarOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} font-black text-xl tracking-tighter transition-all duration-300 origin-left`}>
            PANEL <span className="text-[#FFC107]">CMS</span>
          </h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow mt-6 px-4 space-y-2 min-w-[240px]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth <= 1024 && setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                location.pathname === item.path 
                  ? "bg-[#FFC107] text-[#0b2a4a] shadow-lg shadow-[#FFC107]/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={22} className={location.pathname === item.path ? "text-[#0b2a4a]" : "group-hover:scale-110 transition-transform"} />
              <span className={`font-bold text-sm uppercase tracking-wide whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"
              } transition-opacity duration-300`}>
                {item.title}
              </span>
              {location.pathname === item.path && sidebarOpen && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 min-w-[240px]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
          >
            <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
            <span className={`font-bold text-sm uppercase tracking-wide whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"
            } transition-opacity duration-300`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 bg-slate-50">
        {/* Responsive Header */}
        <header className="bg-white border-b border-slate-100 p-4 lg:p-8 flex items-center justify-between sticky top-0 z-30 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg lg:text-3xl font-black text-slate-900 tracking-tight uppercase line-clamp-1">
                {menuItems.find(i => i.path === location.pathname)?.title || "Dashboard"}
              </h2>
              <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 line-clamp-1">Control Panel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 lg:p-2 rounded-2xl border border-slate-100 pr-4 lg:pr-6 max-w-[200px] lg:max-w-none">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black shrink-0">
              {user.email[0].toUpperCase()}
            </div>
            <div className="hidden xs:block text-right overflow-hidden">
              <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase line-clamp-1">Admin</p>
              <p className="text-[10px] lg:text-xs font-bold text-slate-700 truncate">{user.email}</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content Pane */}
        <main className="flex-grow p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
