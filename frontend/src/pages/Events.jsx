import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Sparkles, GraduationCap, Trophy, Music, Palette } from "lucide-react";

// Import program images
import ashadi1 from "../assets/images/programs/ashadi ekadhashi.JPG";
import ashadi2 from "../assets/images/programs/ashadiekadshiboys.JPG";
import bharatmata from "../assets/images/programs/bharatmata.JPG";
import fruits from "../assets/images/programs/fruits.jpg";
import greendayImg from "../assets/images/programs/green day.JPG";
import trip from "../assets/images/programs/tripdroup.jpg";

// Import Annual Day 2026 Images
import boysgroup from "../assets/images/gathring/boysgroup.JPG";
import falicitation from "../assets/images/gathring/falicitation.JPG";
import girlsgrp from "../assets/images/gathring/girlsgrp.JPG";
import girlsgrp2 from "../assets/images/gathring/girlsgrp2.JPG";
import groupImg from "../assets/images/gathring/group.JPG";
import group1 from "../assets/images/gathring/group1.JPG";
import group2 from "../assets/images/gathring/group2.JPG";
import guest from "../assets/images/gathring/guest.JPG";
import jhoka from "../assets/images/gathring/jhoka.JPG";
import solo from "../assets/images/gathring/solo.JPG";
import sonMother from "../assets/images/gathring/sonMother.JPG";
import trstud from "../assets/images/gathring/trstud.JPG";

// Import program videos
import bhajiVideo from "../assets/videos/bhajiday.mp4";
import ganpatiVideo from "../assets/videos/ganpati.mp4";
import fundayVideo from "../assets/videos/funday.mp4";
import drawingVideo from "../assets/videos/drawing.mp4";
import studyVideo from "../assets/videos/study.mp4";
import girl_performing from "../assets/videos/girl_performing.mp4"
import greendayVideo from "../assets/videos/green day.mp4"
import playtimeVideo from "../assets/videos/playtime.mp4";

const programsData = [
  { src: boysgroup, title: "Boys Group Performance", isImage: true },
  { src: girlsgrp, title: "Girls Group Dance", isImage: true },
  { src: groupImg, title: "Grand Finale", isImage: true },
  { src: guest, title: "Guest of Honor", isImage: true },
  { src: solo, title: "Solo Talent", isImage: true },
  { src: falicitation, title: "Awards & Felicitation", isImage: true },
  { src: sonMother, title: "Cultural Heritage", isImage: true },
  { src: trstud, title: "Teacher-Student Moments", isImage: true }
];

const BigCarousel = ({ items = [], onImageClick }) => {
  const [active, setActive] = useState(0);

  if (!items || items.length === 0) return null;

  const moveNext = () => setActive((prev) => (prev + 1) % items.length);
  const movePrev = () => setActive((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    const timer = setInterval(() => {
      moveNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden px-4 group">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center perspective-1000">
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const offset = (i - active + items.length) % items.length;
            
            let position = "hidden";
            if (offset === 0) position = "active";
            else if (offset === 1 || offset === - (items.length - 1)) position = "right";
            else if (offset === items.length - 1 || offset === -1) position = "left";

            if (position === "hidden") return null;

            const variants = {
              active: { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 },
              right: { x: "60%", scale: 0.7, zIndex: 5, opacity: 0.4, rotateY: -35 },
              left: { x: "-60%", scale: 0.7, zIndex: 5, opacity: 0.4, rotateY: 35 },
            };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={variants[position]}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`absolute w-[320px] md:w-[600px] aspect-video rounded-3xl border border-white/40 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/20 ${position === 'active' ? 'cursor-zoom-in' : ''}`}
                onClick={() => position === 'active' && onImageClick(item.src)}
              >
                <div className="w-full h-full relative group">
                  {item.isImage ? (
                    <img src={item.src} alt={item.title || "Highlight"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  
                  {/* Glassmorphism Title Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 md:p-8 bg-gradient-to-t from-[#0E4D92]/90 via-[#0E4D92]/50 to-transparent flex items-end">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-full sm:w-auto">
                        <h3 className="text-white text-xl md:text-2xl font-bold font-hand tracking-wide mb-1 drop-shadow-md">
                          {item.title || "Special Moment"}
                        </h3>
                        <div className="h-1 w-12 bg-[#FFC107] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 flex gap-6 z-50">
        <button 
          onClick={movePrev} 
          className="p-4 rounded-full bg-white/80 hover:bg-[#FFC107] text-[#0E4D92] hover:text-[#0E4D92] border border-gray-200 hover:border-[#FFC107] transition-all active:scale-90 backdrop-blur-md shadow-lg"
          title="Previous slide"
        >
          <ChevronLeft size={28} className="drop-shadow-sm" />
        </button>
        <button 
          onClick={moveNext} 
          className="p-4 rounded-full bg-white/80 hover:bg-[#FFC107] text-[#0E4D92] hover:text-[#0E4D92] border border-gray-200 hover:border-[#FFC107] transition-all active:scale-90 backdrop-blur-md shadow-lg"
          title="Next slide"
        >
          <ChevronRight size={28} className="drop-shadow-sm" />
        </button>
      </div>
    </div>
  );
};

const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/20 z-[110]"
        onClick={onClose}
      >
        <Sparkles size={24} className="rotate-45" />
      </motion.button>
      
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        src={image}
        className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/10"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const Events = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Our Events"
        description="Explore our events and cultural activities."
        keywords="school events, sports, yoga, cultural events, holistic development"
      />

      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 lg:pt-32 pb-0 bg-white overflow-hidden">
        {/* UNIQUE ANIMATED BACKGROUND LAYER */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          {/* Moving Gradient Mesh */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.05)_0%,rgba(255,193,7,0.03)_50%,transparent_100%)]"
          />
          
          {/* Floating Geometric Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                x: [0, i % 2 === 0 ? 30 : -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
              }}
              className="absolute w-32 h-32 md:w-64 md:h-64 border-2 border-blue-500/5 rounded-full"
            />
          ))}

          {/* Liquid Glass Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-0 relative">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center blur-3xl opacity-30">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  x: [-20, 20, -20]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply"
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                  x: [20, -20, 20]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply"
              />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-[#0E4D92] font-hand mb-0 relative z-10"
            >
              Annual Day <span className="text-[#FFC107]">2026 Highlights</span>
            </motion.h1>
             
          </div>

          {/* New BigCarousel Implementation */}
          <BigCarousel items={programsData} onImageClick={setSelectedImage} />
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="pt-4 pb-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <span className="text-[#E91E63] font-bold uppercase tracking-widest text-sm mb-4">
              Our Visual Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#0E4D92] font-hand text-center">
              Captured <span className="text-[#FFC107]">Moments</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#E91E63] mt-6 rounded-full"></div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {[ashadi1, ashadi2, bharatmata, fruits, greendayImg, trip].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid group relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white hover:border-[#E91E63]/10 transition-all duration-500 cursor-zoom-in"
              >
                <img 
                  src={img} 
                  alt="Gallery Item" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4D92]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                  <h4 className="text-xl font-bold font-hand italic">School Memory</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
