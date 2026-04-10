import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import about1 from "../assets/images/about/about1.jpg";
import tripGroup from "../assets/images/programs/tripdroup.jpg";
import staff from "../assets/images/home/staff.jpg";
import greenDay from "../assets/images/programs/green day.JPG";
import staff2 from "../assets/images/home/staff2.jpg";
import science from "../assets/images/home/graph.jpg"; // substituted science.jpg with graph.jpg
import army from "../assets/images/home/army.jpg";
 

const cards = [
  { title: "School Ground", description: "Spacious playgrounds for sports and activities.", image: tripGroup },
  { title: "Teaching Excellence", description: "Experienced teachers providing quality education.", image: staff },
  { title: "Environment", description: "Green and healthy environment for learning.", image: greenDay },
  { title: "Library", description: "Well-stocked library with modern resources.", image: staff2 },
  { title: "Laboratories", description: "Modern labs for Science, Math and Computers.", image: science }, // keeping variable name science for minimal diff, but mapping to graph.jpg
  { title: "Sports Facilities", description: "Indoor and outdoor sports facilities for all age groups.", image: army },
];

const facilities = [
  { title: "Modern Classrooms", icon: "🏫" },
  { title: "Playgrounds & Sports", icon: "⚽" },
  { title: "Library", icon: "📚" },
  { title: "Digital Learning Tools", icon: "💻" },
  { title: "Safe Campus", icon: "🔒" },
];

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 pt-24 lg:pt-32 pb-16">
      <SEO 
        title="About Us"
        description="Learn about Sanskar English Medium School's holistic approach, history, facilities, and dedicated staff."
        keywords="about sanskar, school history, facilities, infrastructure, teachers, staff, vision, mission"
      />
      {/* New About Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 px-6 ">
          
          {/* Image Side */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="absolute -inset-4 bg-[#FFC107] rounded-3xl rotate-3 opacity-30 blur-lg"></div>
             <img src={about1} alt="About Sanskar School" className="relative rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500" />
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border-l-8 border-[#0E4D92]">
                 <p className="font-extrabold text-[#0E4D92] text-4xl">5+</p>
                 <p className="text-gray-600 font-bold">Years of Excellence</p>
             </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="space-y-6"
          >
              <div>
                 <span className="text-[#E91E63] font-bold tracking-wider uppercase text-sm">About Our School</span>
                 <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b2a4a] mt-2 font-hand leading-tight">
                     Where Learning Meets <span className="text-[#0E4D92]">Innovation</span>
                 </h2>
              </div>
              <Link to="/events" className="group">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                    <h4 className="text-xl font-bold text-[#0E4D92] mb-2 flex items-center justify-between">
                      Our Events <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                    </h4>
                    <p className="text-slate-600">Explore our academic and extracurricular activities from Playgroup to Standard 10.</p>
                  </div>
                </Link>
              <p className="text-gray-600 text-lg leading-relaxed">
                  At <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span>, we believe every child is special and can do great things. Our teaching mixes good values with new ways of learning. We give a caring place where children learn well, make friends, and feel happy and confident.</p>

              <ul className="space-y-4">
                  {[
                      "Experiential Learning Pedagogy", 
                      "State-of-the-Art Infrastructure", 
                      "Focus on Moral Values & Ethics"
                  ].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 font-bold text-[#0b2a4a]"
                      >
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                          {item}
                      </motion.li>
                  ))}
              </ul>
          </motion.div>
      </div>

      
      <div className="text-center">
        <Link to="/admission">
          <motion.button
            className="bg-[#FFC107] text-[#1A4D8D] px-12 py-5 rounded-2xl font-black text-2xl shadow-[6px_6px_0px_0px_#1A4D8D] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] cursor-pointer uppercase tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Admissions ➜
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
