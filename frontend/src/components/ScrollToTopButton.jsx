import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      
      const totalScroll = scrollHeight - innerHeight;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);

      // Top visibility
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Bottom proximity check (for footer)
      const threshold = scrollHeight - 200;
      setIsNearBottom((currentScroll + innerHeight) > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            bottom: isNearBottom ? "120px" : "32px"
          }}
          exit={{ opacity: 0, scale: 0.5, x: -50, y: -100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, y: -20 }}
          transition={{
            bottom: { type: "spring", stiffness: 300, damping: 25 },
            default: { duration: 0.3 }
          }}
          onClick={scrollToTop}
          className="fixed left-8 z-[100] cursor-pointer group"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Playful Glow Effect */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-black/20 blur-xl rounded-full"
            />

            {/* Progress Orbit Ring */}
            <svg className="absolute -rotate-90 w-20 h-20 overflow-visible">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#eee"
                strokeWidth="6"
                fill="white"
                className="shadow-inner"
              />
              <motion.circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#000000"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1 }}
                strokeLinecap="round"
                className="drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]"
              />
              
              {/* Kids-friendly Particle/Star on the progress tip */}
              {scrollProgress > 1 && (
                 <motion.circle 
                    cx="40"
                    cy="40"
                    r="4"
                    fill="#FF4500"
                    stroke="white"
                    strokeWidth="1"
                    className="drop-shadow-[0_0_8px_#FF4500]"
                    style={{
                        transformOrigin: '40px 40px',
                        rotate: `${(scrollProgress / 100) * 360}deg`,
                        translateY: `-${radius}px`
                    }}
                 />
              )}
            </svg>
            
            {/* Rocket Icon with Fire Animation */}
            <div className="relative z-10 bg-[#FF4500] text-white p-3 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-[#000000] group-hover:text-white">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Rocket size={24} strokeWidth={2.5} />
              </motion.div>
              
              {/* Flame Particles */}
              <motion.div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                 <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ scale: [1, 1.5, 0], y: [0, 10, 20] }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
                        />
                    ))}
                 </div>
              </motion.div>
            </div>

            {/* Kids-friendly bubble tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform origin-bottom">
               <div className="bg-[#0A192F] text-white text-[11px] font-black px-3 py-1.5 rounded-2xl shadow-xl whitespace-nowrap border-2 border-white">
                 LIFT OFF! 🚀
               </div>
               {/* Tiny tail for bubble */}
               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-[#0A192F] border-r-[6px] border-r-transparent mx-auto"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
