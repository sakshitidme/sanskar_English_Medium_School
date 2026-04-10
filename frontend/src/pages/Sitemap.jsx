import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SEO from "../components/SEO";

const Sitemap = () => {
  const links = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Events", path: "/events" },
    { title: "Gallery", path: "/gallery" },
    { title: "Contact Us", path: "/contact" },
    { title: "Admissions", path: "/admission" },
  ];

  const legalLinks = [
    { title: "Privacy Policy", path: "/privacy-policy" },
    { title: "Terms of Use", path: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 lg:px-12">
      <SEO 
        title="Sitemap"
        description="Sitemap for Sanskar English Medium School website. Easy navigation to all pages."
        keywords="sitemap, site structure, navigation, school pages"
      />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.h1 
          className="text-4xl font-bold text-podar-blue mb-8 border-b-4 border-podar-yellow pb-2 inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Sitemap
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Main Navigation */}
          <div>
            <h2 className="text-2xl font-bold text-podar-dark-blue mb-6 border-b border-gray-200 pb-2">Main Navigation</h2>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={link.path} className="flex items-center text-lg text-gray-700 hover:text-podar-blue transition-colors group">
                    <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-podar-blue group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </span>
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal & Other */}
          <div>
            <h2 className="text-2xl font-bold text-podar-dark-blue mb-6 border-b border-gray-200 pb-2">Legal & Information</h2>
            <ul className="space-y-4">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link to={link.path} className="flex items-center text-lg text-gray-700 hover:text-podar-blue transition-colors group">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-gray-600 group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </span>
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sitemap;
