import React, { useRef } from "react";
import SEO from "../components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Wifi, Book, FlaskConical, Trophy, Monitor } from "lucide-react";
import schoolInfrastructureVideo from "../assets/videos/kidscones/school_infrastructure.mp4";

// Import Infrastructure Images
import digitalClassroomImg from "../assets/images/programs/infrastructure/digital_classroom.png";
import scienceLabImg from "../assets/images/programs/infrastructure/science_lab.jpg";
import libraryImg from "../assets/images/programs/infrastructure/library.jpg";
import sportsImg from "../assets/images/programs/infrastructure/sports.jpg";
import wifiCampusImg from "../assets/images/programs/infrastructure/wifi_campus.jpg";
import securityImg from "../assets/images/programs/infrastructure/security.jpg";
import schoolLogo from "../assets/images/logo.png";

const Infrastructure = () => {
    const videoRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: videoRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const facilities = [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Infrastructure - Sanskar English Medium School"
        description="Explore the world-class infrastructure at Sanskar English Medium School, designed to provide the best learning environment."
        keywords="school infrastructure, smart classrooms, science labs, school library, sports facilities, nashik school campus"
      />

      {/* Hero Section */}
     

        <div className="bg-slate-50 relative pb-0">
              {/* Header with Dark Blue Background */}
              <div className="bg-[#0E4D92] pt-24 lg:pt-32 pb-6 px-6 relative overflow-hidden text-center mb-0">
                {/* Background Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-7xl mx-auto">
                     <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl md:text-6xl font-extrabold text-white font-hand mb-6"
                    >
                      School  <span className="text-[#FFC107]">Infrastructure</span>
                    </motion.h2>
                  </div>
              </div>
              </div>

       {/* Video Tour Section */}
       <section className="pt-2 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
                <motion.span 
                    className="inline-block bg-[#E3F2FD] text-[#0E4D92] font-bold px-4 py-2 rounded-full border border-[#0E4D92] text-sm tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    CAMPUS TOUR
                </motion.span>
                <motion.h2 
                    className="text-4xl font-bold text-[#0E4D92]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Experience Our Campus
                </motion.h2>
            </div>

            <motion.div 
                ref={videoRef}
                style={{ scale, opacity }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 aspect-video"
            >
                <video 
                    src={schoolInfrastructureVideo}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"></div>
            </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facilities.map((facility, idx) => (
                      <motion.div 
                        key={idx}
                        className="relative h-80 rounded-3xl overflow-hidden shadow-lg group cursor-default"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                          {/* Background Image */}
                          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                              <img 
                                src={facility.image} 
                                alt={facility.title} 
                                className="w-full h-full object-cover"
                              />
                              {/* Dark Overlay for Text Readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/50 transition-colors duration-300"></div>
                          </div>

                          {/* Content */}
                          <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                              {/* School Logo at Top Left */}
                              <div className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/40 p-2 overflow-hidden shadow-sm">
                                  <img src={schoolLogo} alt="School Logo" className="w-full h-full object-contain" />
                              </div>

                              {/* Title & Description at Bottom */}
                              <div className="mb-0 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  <h3 className="text-2xl font-extrabold text-white mb-2 font-hand tracking-wide">{facility.title}</h3>
                                   
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="pt-10 pb-20 px-6 bg-[#0E4D92] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-hand">Come, Visit Us!</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Words and pictures can only say so much. We invite you to visit our campus and experience the vibrant atmosphere yourself.
                </p>
                <motion.a 
                    href="/contact"
                    className="inline-block bg-[#E91E63] text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-[#D81B60] hover:shadow-xl hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Schedule a Visit
                </motion.a>
            </div>
      </section>

    </div>
  );
};

export default Infrastructure;
