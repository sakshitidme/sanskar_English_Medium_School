import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chhotaBheemGif from "../assets/images/home/hello-chhota-bheem.gif";

const WhatsAppMascot = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 200; // 200px from bottom
      setIsNearBottom(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919850798962", "_blank");
  };

  return (
    <motion.div 
      className="fixed right-6 z-50 flex items-end flex-col gap-2 pointer-events-none"
      animate={{ 
        bottom: isNearBottom ? "120px" : "24px" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg border-2 border-[#1A4D8D] mb-[-10px] mr-8 relative pointer-events-auto cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={handleWhatsAppClick}
          >
            <p className="text-[#1A4D8D] font-bold text-sm whitespace-nowrap">
              Ask me! 👋
            </p>
            {/* Triangle for speech bubble */}
            <div className="absolute -bottom-[8px] right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#1A4D8D] border-r-[0px] border-r-transparent"></div>
            <div className="absolute -bottom-[5px] right-[2px] w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white border-r-[0px] border-r-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Image */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer pointer-events-auto filter drop-shadow-xl"
        onClick={handleWhatsAppClick}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <img 
          src={chhotaBheemGif} 
          alt="WhatsApp Assistant" 
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
          style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppMascot;
