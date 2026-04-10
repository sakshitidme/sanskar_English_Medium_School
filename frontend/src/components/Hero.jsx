import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import kidsBanner from '/src/assets/images/home/home1.png'; 

const HeroSection = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setOffset({
        x: (e.clientX / window.innerWidth) * 15,
        y: (e.clientY / window.innerHeight) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-[82vh] lg:min-h-[60vh] bg-white flex items-center lg:items-start pt-24 lg:pt-32 overflow-hidden font-sans"
    >
      {/* 1. Abstract Playground Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0E4D92 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* Floating Blobs (Podar Colors) */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-pink-100/50 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

        {/* Playful Doodles (Parallax) */}
        <div className="absolute inset-0" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
           {/* Yellow Zigzag */}
           <svg className="absolute top-32 left-10 w-16 h-16 text-[#FFC107] animate-float-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
              <path d="M10 50 L 30 20 L 50 80 L 70 20 L 90 50" />
           </svg>
           {/* Pink Circle */}
           <div className="absolute top-20 right-1/4 w-8 h-8 border-4 border-[#E91E63] rounded-full animate-float-medium"></div>
           {/* Blue Triangle */}
           <svg className="absolute bottom-32 left-1/4 w-12 h-12 text-[#00BCD4] animate-spin-slow opacity-60" viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,15 90,85 10,85" />
           </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-0 pb-6">
        
        {/* Left Content: Bold & Clean */}
        <div className="order-2 lg:order-1 relative">
          <div className="bg-white/20 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] space-y-8 text-center lg:text-left relative overflow-hidden">
            {/* Added glossy reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
            <h1 className="font-extrabold text-[#1A4D8D] leading-tight mb-8">
               <span className="block text-5xl md:text-6xl lg:text-7xl mb-2">
                 Future Ready
               </span>
               <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#FF9800] relative pb-2 lg:pb-3">
                 Creative Minds
                 {/* Underline squiggly */}
                 <svg className="absolute -bottom-4 left-0 w-full h-4 text-[#FFC107]" viewBox="0 0 200 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 10 10 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5" fill="none" stroke="currentColor" strokeWidth="4" />
                 </svg>
               </span>
            </h1>

            <p className="text-gray-600 text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Every child is a unique genius. We provide the colors, they paint the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link to="/admission">
                <button className="relative bg-[#FFC107] text-[#1A4D8D] px-8 py-4 rounded-xl font-extrabold text-xl shadow-[4px_4px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] cursor-pointer">
                   Admissions ➜
                </button>
              </Link>
              <Link to="/events">
                <button className="relative bg-white/30 backdrop-blur-md text-[#0E4D92] border border-white/50 shadow-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/50 transition-all">
                   Explore Events
                </button>
              </Link>
            </div>
          </div>
        </div>
        </div>

        {/* Right Image: Sticker Style */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
           {/* Blob Background for Sticker */}
           <div className="absolute top-10 right-10 w-[90%] h-[90%] bg-[#FFC107] rounded-[3rem] transform rotate-6 animate-pulse-slow opacity-20"></div>
           <div className="absolute -bottom-5 -left-5 w-[90%] h-[90%] bg-[#00BCD4] rounded-[3rem] transform -rotate-3 animate-pulse-slow delay-1000 opacity-20"></div>

           {/* The Image as a Sticker */}
           <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
             <div className="bg-white/20 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border border-white/30 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent pointer-events-none rounded-[2.5rem]"></div>
                <img 
                  src={kidsBanner} 
                  alt="Happy Kids Sticker" 
                  className="w-full max-w-lg h-auto rounded-[2rem] object-cover border border-white/50 relative z-10"
                />
                
                {/* Floating Badge on Image */}
                <div className="absolute -right-4 top-10 bg-white/60 backdrop-blur-md border border-white/40 p-3 rounded-2xl shadow-xl transform rotate-12 bounce-hover z-20">
                   <div className="bg-[#E91E63] text-white text-xs font-bold px-3 py-1 rounded-full text-center shadow-sm">
                     Creative
                   </div>
                   <div className="text-xl mt-1 text-center">🎨</div>
                </div>

                <div className="absolute -left-6 bottom-10 bg-white/60 backdrop-blur-md border border-white/40 p-3 rounded-2xl shadow-xl transform -rotate-6 bounce-hover animation-delay-500 z-20">
                   <div className="bg-[#00BCD4] text-white text-xs font-bold px-3 py-1 rounded-full text-center shadow-sm">
                     Smart
                   </div>
                   <div className="text-lg mt-1 text-center">🧠</div>
                </div>

                {/* Animated Letters & Numbers - Positioned INSIDE the image */}
                 
                 
                 
                 
                 
                 
                
             </div>
           </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 5s infinite ease-in-out; }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-medium { animation: float-medium 3s infinite ease-in-out; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .bounce-hover:hover {
           animation: bounce 1s infinite;
        }

        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
        .delay-1500 { animation-delay: 1500ms; }
        .delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </section>
  );
};

export default HeroSection;