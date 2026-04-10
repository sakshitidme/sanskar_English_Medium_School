import React, { useState } from 'react';
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Import all gallery images
// ... (imports remain the same)
import tripGroup from "../assets/images/programs/tripdroup.jpg";
import staff from "../assets/images/home/staff.jpg";
import greenDay from "../assets/images/programs/green day.JPG";
import staff2 from "../assets/images/home/staff2.jpg";
import army from "../assets/images/home/army.jpg";
import fruits from "../assets/images/programs/fruits.jpg";
import graph from "../assets/images/home/graph.jpg";
import jcb from "../assets/images/home/jcb.jpg";
import police from "../assets/images/home/police.jpg";
import signal from "../assets/images/home/signal.jpg";
import strawberry from "../assets/images/home/strawberry.jpg";
import ashadi from "../assets/images/programs/ashadi ekadhashi.JPG";
import ashadiBoys from "../assets/images/programs/ashadiekadshiboys.JPG";
import bharatmata from "../assets/images/programs/bharatmata.JPG";

const galleryImages = [
  { src: tripGroup, alt: "Trip Group Photo" },
  { src: army, alt: "Army Day Celebration" },
  { src: greenDay, alt: "Green Day Celebration" },
  { src: ashadi, alt: "Ashadi Ekadashi" },
  { src: ashadiBoys, alt: "Ashadi Ekadashi Boys" },
  { src: bharatmata, alt: "Bharatmata Celebration" },
  { src: fruits, alt: "Fruits Day" },
  { src: strawberry, alt: "Strawberry Day" },
  { src: police, alt: "Police Interaction" },
  { src: signal, alt: "Traffic Signal Awareness" },
  { src: jcb, alt: "JCB Demonstration" },
  { src: graph, alt: "Learning Graphs" },
  { src: staff, alt: "Our Dedicated Staff" }, 
  { src: staff2, alt: "Staff Members" },
];

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
        src={image.src}
        alt={image.alt}
        className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/10"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-[#F0F9FF] min-h-screen pt-24 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
      <SEO 
        title="Our Gallery"
        description="A glimpse into the vibrant life at Sanskar English Medium School. Events, celebrations, and learning moments."
        keywords="school gallery, event photos, student activities, celebration photos, sanskar school photos"
      />

      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#E91E63] font-bold tracking-wider uppercase text-xs sm:text-sm">Memories & Moments</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E4D92] mt-2 font-hand leading-tight">
            Life at <span className="text-[#FFC107]">Sanskar</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg px-2">
            Capturing the joy of learning, the spirit of celebration, and the growth of our students.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg cursor-zoom-in"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index % 3 * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white font-bold text-lg text-center font-hand tracking-wide">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery;
