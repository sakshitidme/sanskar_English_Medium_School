import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  MessageCircle,
  Users,
  Clock,
  ShieldCheck,
  Building,
  Info,
  ClipboardCheck
} from "lucide-react";
import { api } from "../services/api";
import schoolLogo from "../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [totalViews, setTotalViews] = React.useState(0);

  React.useEffect(() => {
    const fetchViews = async () => {
      try {
        const data = await api.getTotalViews();
        setTotalViews(data.total || 0);
      } catch (err) {
        console.error("Error fetching views:", err);
      }
    };
    fetchViews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative bg-[#0A192F] text-white pt-16 pb-12 overflow-hidden border-t border-white/5">



      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Brand Card */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-white p-2.5 rounded-2xl shadow-xl transition-transform duration-500 group-hover:rotate-12">
                <img src={schoolLogo} alt="Sanskar Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#FFC107] md:text-2xl tracking-tight leading-tight">Sanskar English Medium School</span>
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck size={14} className="text-green-400" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Registration No.:F12121/NSK</span>
                </div>
              </div>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="h-px flex-1 bg-white/10"></div>
                 <span className="text-[10px] text-[#FFC107] font-black uppercase tracking-[0.2em]">Our Motto</span>
                 <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed opacity-90 text-center italic font-medium">
                "Empowering students with knowledge, integrity, and innovation. We build leaders for tomorrow through holistic and values-based education."
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              {[
                { icon: MessageCircle, color: "bg-green-500", shadow: "shadow-green-500/30", link: "https://wa.me/919850798962" },
                { icon: Facebook, color: "bg-blue-600", shadow: "shadow-blue-500/30", link: "#" },
                { icon: Instagram, color: "bg-pink-600", shadow: "shadow-pink-500/30", link: "#" },
                { icon: Youtube, color: "bg-red-600", shadow: "shadow-red-500/30", link: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  target={social.icon === MessageCircle ? "_blank" : undefined}
                  rel={social.icon === MessageCircle ? "noopener noreferrer" : undefined}
                  className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:${social.shadow} hover:-translate-y-1`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Card */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] flex flex-col">
            <h4 className="font-extrabold text-[#FFC107] text-xl mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FFC107] rounded-full"></span>
              Explore
            </h4>
            <ul className="space-y-4 flex-grow">
              {[
                { name: 'About School', path: '/about', icon: Info },
                { name: 'Our Educators', path: '/about/educators', icon: Users },
                { name: 'Infrastructure', path: '/about/infrastructure', icon: Building },
                { name: 'Admissions', path: '/admission', icon: ClipboardCheck }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center gap-3 transition-all duration-300 text-slate-300 hover:text-white font-semibold"
                  >
                    <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#FFC107] group-hover:text-[#0A192F] transition-all duration-300">
                      <item.icon size={16} />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    <ArrowRight size={14} className="ml-auto text-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Working Hours Section for visual balance */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-[#FFC107] mb-3">
                <Clock size={18} />
                <span className="font-bold text-sm uppercase tracking-wider">Working Hours</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mon - Fri:</span>
                  <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Saturday:</span>
                  <span className="text-white font-medium">9:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem]">
            <h4 className="font-extrabold text-[#FFC107] text-xl mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FFC107] rounded-full"></span>
              Get In Touch
            </h4>
            <ul className="space-y-5">
              {[
                { 
                  icon: MapPin, 
                  color: "text-blue-400", 
                  title: "Location", 
                  content: ["Vitthal Park, Kranti Nagar, Makhmalabad Road, Panchavati", "Nashik - 422003"],
                  link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sanskar English Medium School Vitthal Park Kranti Nagar Makhmalabad Road Panchavati Nashik")}`
                },
                { 
                  icon: Phone, 
                  color: "text-green-400", 
                  title: "Call Now", 
                  content: [" 98507 98962","98906 33962"," 0253-2313162" ] 
                },
                { 
                  icon: Mail, 
                  color: "text-yellow-400", 
                  title: "Email Us", 
                  content: ["officialsanskarschool@gmail.com"] 
                }
              ].map((info, i) => {
                const mainContent = info.content[0].trim();
                let mainHref = "";
                if (info.title === "Location") mainHref = info.link;
                if (info.title === "Call Now") mainHref = `tel:${mainContent.replace(/[\s-]/g, "")}`;
                if (info.title === "Email Us") mainHref = `mailto:${mainContent}`;

                return (
                  <li key={i}>
                    <a 
                      href={mainHref}
                      target={info.title === "Location" ? "_blank" : undefined}
                      rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                      className="flex gap-4 group items-start p-3 -m-3 rounded-2xl hover:bg-white/5 transition-all duration-300 pointer-events-auto"
                    >
                      <div className={`w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <info.icon size={20} />
                      </div>
                      <div className="text-sm">
                        <p className="font-bold text-white mb-1 group-hover:text-[#FFC107] transition-colors">{info.title}</p>
                        <div className="space-y-1">
                          {info.content.map((text, j) => (
                            <span 
                              key={j} 
                              className={`block text-slate-400 opacity-80 group-hover:opacity-100 transition-all font-medium ${info.title === "Email Us" ? "group-hover:text-[#FFC107] group-hover:underline" : ""}`}
                            >
                              {text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* --- BOTTOM BAR --- */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} Sanskar English Medium School. Crafted with ❤️ for our Students.</p>
          
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner">
            <Users size={14} className="text-[#FFC107]" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Visitors: <span className="text-white font-black">{totalViews.toLocaleString()}</span>
            </span>
          </div>

          <div className="flex gap-6 uppercase tracking-widest font-bold">
             <Link to="/privacy-policy" className="hover:text-[#FFC107] transition-colors">Privacy</Link>
             <Link to="/terms" className="hover:text-[#FFC107] transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
