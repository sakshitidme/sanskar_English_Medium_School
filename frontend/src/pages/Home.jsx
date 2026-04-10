
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner2 from "../assets/images/banner2.png";
import { Star, Quote, Award, Users, BookOpen, Calendar, Target, Eye } from "lucide-react";
import whyChooseHolistic from "../assets/images/home/whyChoose/holistic.mp4";
import whyChooseInfra from "../assets/images/home/whyChoose/insfra.mp4";
import whyChooseTeaching from "../assets/images/home/whyChoose/teaching.mp4";

import playgroupImg from "../assets/images/home/hero/playgroup.png";
import nurseryImg from "../assets/images/home/hero/nursery.png";
import jrKgImg from "../assets/images/home/hero/jr.kg.png";
import srKgImg from "../assets/images/home/hero/sr.jk.png";
import schoolLogo from "../assets/images/logo.png";

import bg1500 from "../assets/images/home/1500.png";
import bg15Years from "../assets/images/home/15yearsExpreince.png";
import bgAwards from "../assets/images/home/awards.png";
import bgTeachingStaff from "../assets/images/home/teaching_staff.png";

const Home = () => {
  return (
    <div className="bg-[#F0F9FF] min-h-screen">
      <SEO 
        title="Home" 
        description="Welcome to Sanskar English Medium School. Nurturing Potential, Shaping Futures. Admissions Open 2026-27."
        keywords="school, education, ranjangaon, sanskar school, admissions, nursery, playgroup, kindergarten, best school in pune"
      />
      <Hero />
      
     

      {/* STATS SECTION */}
      <section className="bg-[#0E4D92] py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" /></svg>
          </div>
          <div className="max-w-7xl mx-auto px-2 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                      { icon: <Users size={32}/>, num: "5000+", label: "Happy Students", bgImg: bg1500 },
                      { icon: <Award size={32}/>, num: "50+", label: "Awards Won", bgImg: bgAwards },
                      { icon: <BookOpen size={32}/>, num: "45+", label: "Qualified Staff", bgImg: bgTeachingStaff },
                      { icon: <Calendar size={32}/>, num: "15+", label: "Years Experience", bgImg: bg15Years }
                  ].map((stat, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative flex flex-col items-center justify-center aspect-square p-6 rounded-full hover:bg-[#FFC107]/20 transition-all duration-300 group cursor-pointer overflow-hidden"
                      >
                          {/* Hover Background Image */}
                          <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-0"
                              style={{ 
                                  backgroundImage: `url(${stat.bgImg})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat'
                              }}
                          ></div>
                          
                          <div className="relative z-10 w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 text-[#FFC107] group-hover:scale-110 transition-transform">
                            {stat.icon}
                          </div>
                          <h3 className="relative z-10 text-3xl md:text-4xl font-extrabold group-hover:text-[#FFC107] transition-colors">{stat.num}</h3>
                          <p className="relative z-10 text-blue-200 font-medium text-sm md:text-base">{stat.label}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="pt-6 pb-0 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    className="bg-[#F0F9FF] p-10 rounded-3xl border-l-8 border-[#FFC107] shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                      <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-white rounded-full text-[#FFC107] shadow-sm">
                              <Eye size={32} />
                          </div>
                          <h3 className="text-3xl font-extrabold text-[#0E4D92] font-hand">Our Vision</h3>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                          To be a great school that helps children grow into kind, responsible, and confident people. 
                          We dream of a world where every child gets the chance to do their best and become their best.</p>
                  </motion.div>

                  <motion.div 
                    className="bg-[#FFF8E1] p-10 rounded-3xl border-l-8 border-[#0E4D92] shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                      <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-white rounded-full text-[#0E4D92] shadow-sm">
                              <Target size={32} />
                          </div>
                          <h3 className="text-3xl font-extrabold text-[#0E4D92] font-hand">Our Mission</h3>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                To give a safe and happy place where every child is encouraged to try new things, learn well, and grow. 
We focus on good learning, good behavior, and overall growth by teaching values along with modern education.</p>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-12 px-6 relative overflow-hidden">
        {/* Decorative Wave Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
           <svg className="relative block w-[calc(100%+1.3px)] h-[50px] text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
               <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-[#FFFDE7] text-[#FFC107] font-bold px-6 py-3 rounded-full border border-[#FFC107] text-2xl tracking-widest mb-4">Growing Young Minds</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0E4D92] leading-tight font-hand">
                WHY CHOOSE SANSKAR?  <br/>

            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Card 1 - From Left */}
            <motion.div 
              className="relative overflow-hidden bg-white rounded-3xl shadow-xl border-b-8 border-[#E91E63] hover:-translate-y-2 transition-transform duration-300 group h-80 cursor-sports"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 z-0">
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    autoPlay loop muted playsInline
                  >
                    <source src={whyChooseHolistic} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="self-end">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm overflow-hidden p-1">
                        <img src={schoolLogo} alt="Sanskar Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-left drop-shadow-md">Holistic Development</h3>
              </div>
            </motion.div>

            {/* Card 2 - Falling Down */}
            <motion.div 
              className="relative overflow-hidden bg-white rounded-3xl shadow-xl border-b-8 border-[#FFC107] hover:-translate-y-2 transition-transform duration-300 group h-80 cursor-science"
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
               <div className="absolute inset-0 z-0">
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    autoPlay loop muted playsInline
                  >
                    <source src={whyChooseInfra} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                 <div className="self-end">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm overflow-hidden p-1">
                        <img src={schoolLogo} alt="Sanskar Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-left drop-shadow-md">Modern Infrastructure</h3>
              </div>
            </motion.div>

            {/* Card 3 - From Right */}
            <motion.div 
              className="relative overflow-hidden bg-white rounded-3xl shadow-xl border-b-8 border-[#4CAF50] hover:-translate-y-2 transition-transform duration-300 group h-80 cursor-art"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
               <div className="absolute inset-0 z-0">
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    autoPlay loop muted playsInline
                  >
                    <source src={whyChooseTeaching} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="self-end">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm overflow-hidden p-1">
                        <img src={schoolLogo} alt="Sanskar Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-left drop-shadow-md">Expert Educators</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* TESTIMONIALS SECTION */}
      <section className="pt-12 pb-12 px-4 bg-[#F0F9FF] relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-10 ">
            <span className="inline-block bg-[#FFFDE7] text-[#FFC107] font-bold px-6 py-3 rounded-full border border-[#FFC107] text-2xl tracking-widest mb-4">Parent's Love</span>
                 <h2 className="text-4xl md:text-5xl font-extrabold text-[#0E4D92] mt-2 font-hand">Testimonials</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                 {[
                     { name: "Priya Sharma", role: "Parent's of Aarav (Nursery)", quote: "Sanskar School has been a second home for my child. The teachers are incredibly supportive and caring." },
                     { name: "Rahul Patil", role: "Parent's of Siya (Jr. KG)", quote: "The best decision we made for our daughter's education. The infrastructure and curriculum are top-notch." },
                     { name: "Anjali Deshmukh", role: "guardian of Vihaan (Playgroup)", quote: "माझ्या मुलाच्या आत्मविश्वासात खूप वाढ झाली आहे. ॲक्टिव्हिटी-बेस्ड लर्निंग पद्धत खूप छान आहे." }
                 ].map((t, i) => (
                     <motion.div 
                        key={i}
                        className="p-8 rounded-3xl shadow-lg relative border-t-4 border-[#E91E63] transition-all duration-300 bg-blue-100 scale-105 -translate-y-2 md:bg-white md:scale-100 md:translate-y-0 md:hover:bg-blue-100 md:hover:-translate-y-2 md:hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                     >
                         <Quote className="text-[#FFC107] mb-4 w-10 h-10 alpha" />
                         <p className="text-gray-600 mb-6 italic text-xl">"{t.quote}"</p>
                         <div className="flex items-center gap-3">
                             <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">👤</div>
                             <div>
                                 <h4 className="font-bold text-[#0E4D92] text-lg">{t.name}</h4>
                                 <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                             </div>
                         </div>
                     </motion.div>
                 ))}
             </div>

             <motion.div 
               className="flex flex-col sm:flex-row justify-center items-center gap-6"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               viewport={{ once: true }}
             >
                <Link to="/reviews">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#0E4D92" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#1A4D8D] text-white rounded-full font-bold shadow-lg transition-colors flex items-center gap-2"
                  >
                     <Eye size={20} /> Read More Reviews
                  </motion.button>
                </Link>

                <Link to="/write-review">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#D81B60" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#E91E63] text-white rounded-full font-bold shadow-lg transition-colors flex items-center gap-2 border-2 border-[#E91E63]"
                  >
                     <Star size={20} /> Write a Review
                  </motion.button>
                </Link>
             </motion.div>
         </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0E4D92]">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          <motion.div 
            className="max-w-4xl mx-auto text-center relative z-10 text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 font-hand">Admissions Open 2026-27</h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light">
                  Give your child the best start in life. Limited seats available for the upcoming academic year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/admission" className="inline-block bg-[#FFC107] text-[#0E4D92] font-extrabold px-12 py-5 rounded-full shadow-[0_4px_14px_0_rgba(255,193,7,0.39)] hover:scale-105 transition-transform text-lg border-2 border-[#FFC107]">
                      Admissions ➜
                  </Link>
                  <Link to="/contact" className="inline-block bg-transparent text-white font-bold px-12 py-5 rounded-full border-2 border-white hover:bg-white hover:text-[#0E4D92] transition-colors text-lg">
                      Schedule Visit
                  </Link>
              </div>
          </motion.div>
      </section>
    </div>
  );
};

export default Home;
