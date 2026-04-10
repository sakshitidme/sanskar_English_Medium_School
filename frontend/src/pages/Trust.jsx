import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Quote, Target, Heart, BookOpen, User } from "lucide-react";
import bhagwanSir from "../assets/images/trust/bhagwanSir.jpg";
import bkSocietyLogo from "../assets/images/trust/bkeducation$welfare.png";
import bkScienceLogo from "../assets/images/trust/bk_science.png";
import bkSportsLogo from "../assets/images/trust/bksports.png";
import sanskarLogo from "../assets/images/trust/sanskar.png";
import bkTimesLogo from "../assets/images/trust/bk_times.png";
import schoolLogo from "../assets/images/logo.png";

const Trust = () => {
  return (
    <div className="bg-[#F0F9FF] min-h-screen">
      <SEO 
        title="Our Trust - BK Education And Welfare Society" 
        description="Learn about the BK Education And Welfare Society, the driving force behind Sanskar English Medium School."
        keywords="BK Education And Welfare Society, school trust, education society, educational management, sanskar school board"
      />

      {/* Board of Members (Hero Section) */}
      <section className="bg-slate-50 relative pb-16">
        {/* Header with Dark Blue Background */}
        <div className="bg-[#0E4D92] pt-24 lg:pt-32 pb-6 px-6 relative overflow-hidden text-center mb-6">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
               <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-extrabold text-white font-hand mb-6"
              >
                Board of <span className="text-[#FFC107]">Trustees</span>
              </motion.h2>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {[
              { name: "Shri. Kishor Nivrutti Yelmame", role: "President", color: "border-red-500", light: "bg-red-50" },
              { name: "Shri. Nivrutti Maliba Yelmame", role: "Vice President", color: "border-blue-500", light: "bg-blue-50" },
              { name: "Dr. Adv. Bhagwan Nivrutti Yelmame", role: "Secretary", color: "border-yellow-500", light: "bg-yellow-50" },
              { name: "Smt. Nandabai Nivrutti Yelmame", role: "Joint Secretary", color: "border-green-500", light: "bg-green-50" },
              { name: "Smt. Vaishali Bhagwan Yelmame", role: "Treasurer", color: "border-purple-500", light: "bg-purple-50" },
              { name: "Smt. Harshada Kishor Yelmame", role: "Member", color: "border-pink-500", light: "bg-pink-50" },
              { name: "Shri. Bhausaheb Kondaji Bhadange", role: "Member", color: "border-indigo-500", light: "bg-indigo-50" },
              { name: "Shri. Santosh Kondaji Bhadange", role: "Member", color: "border-orange-500", light: "bg-orange-50" },
              { name: "Smt. Sangeeta Anil Bhadange", role: "Member", color: "border-cyan-500", light: "bg-cyan-50" },
              { name: "Shri. Avadhoot Madhukar Gaikwad", role: "Member", color: "border-teal-500", light: "bg-teal-50" },
              { name: "Mr. Nilesh Mohan Revgade", role: "Member", color: "border-rose-500", light: "bg-rose-50" }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${member.color} flex items-center justify-between group hover:shadow-md transition-all cursor-default`}
              >
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-lg font-bold text-[#0E4D92] group-hover:text-[#E91E63] transition-colors leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About The Trust */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
              <motion.div 
                className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border-t-8 border-[#FFC107] relative flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                  <Quote className="text-[#FFC107] w-12 h-12 sm:w-16 sm:h-16 absolute -top-6 -left-4 sm:-top-8 sm:-left-8 bg-white rounded-full p-2 shadow-sm" />
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0E4D92] mb-6 font-hand">Since 2009</h2>
                  
                  <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                      <p>
                          Our journey started with a simple dream: to give every child a chance to succeed. Since <span className="font-bold text-[#E91E63]">2009</span>, the <span className="font-bold text-red-600">BK</span> <span className="font-bold text-black">Education And Welfare Society</span> has grown from a small idea into a large family of schools and academies.
                      </p>
                      <p>
                          We believe that education is not just about passing exams, but about building character and confidence. For more than <span className="font-bold text-[#0E4D92]">15+ years</span>, we have worked hard to help students learn and grow through our different schools.
                      </p>
                      <p>
                          We look beyond just books. We want to create a place where students become smart, strong, and good human beings. Our goal is to provide a safe and happy environment where every student can explore their interests in science, sports, and culture.
                      </p>
                      <p className="border-l-4 border-blue-100 pl-4 italic text-gray-600">
                          We are committed to teaching values that help our children become responsible and kind citizens of tomorrow.
                      </p>
                  </div>
              </motion.div>

              {/* Institutions List with Glassmorphism */}
              <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="space-y-4"
              >
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0E4D92] mb-4 pl-2 border-l-4 border-[#E91E63]">Our Institutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                      { name: "BK Educational And Welfare Society", logo: bkSocietyLogo, color: "bg-blue-50 text-blue-600", link: "https://bkngo.in", display:"bkngo.in" },
                      { name: "BK Science Academy", logo: bkScienceLogo, color: "bg-blue-50 text-blue-600", link: "https://www.bkscience.in", display:"www.bkscience.in" },
                      { name: "Science Career Academy", logo: bkScienceLogo, color: "bg-green-50 text-green-600", link: "https://www.bkcareer.in", display:"www.bkcareer.in" },
                      { name: "BK Sports Academy", logo: bkSportsLogo, color: "bg-orange-50 text-orange-600", link: "https://www.bksports.in/", display:"www.bksports.in" },
                      { name: "BK Times", logo: bkTimesLogo, color: "bg-yellow-50 text-yellow-600", link: "https://www.bktimes.co.in/", display: "www.bktimes.co.in" },
                      { name: "Gurukul Vidya Niketan", logo: sanskarLogo, color: "bg-red-50 text-red-600", link: "https://www.bksports.in/", display: "www.bksports.in" },
                      { name: "Sanskar English Medium School", logo: schoolLogo, color: "bg-purple-50 text-purple-600", link: "#", display: "Coming Soon" }
                  ].map((inst, idx) => (
                      <motion.a 
                        href={inst.link}
                        target={inst.link !== "#" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        key={idx}
                        whileHover={{ 
                            scale: 1.01, 
                            x: 8,
                            backgroundColor: "#F8FBFF",
                        }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-lg flex items-center gap-3 sm:gap-4 border border-gray-100 hover:border-blue-300 transition-all block cursor-pointer group relative overflow-hidden"
                      >
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                          
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center overflow-hidden bg-white p-1 border border-gray-100 shrink-0 group-hover:border-blue-200 group-hover:shadow-inner transition-all`}>
                              <img src={inst.logo} alt={inst.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          
                          <div className="min-w-0 flex-1 relative z-10">
                            <span className="text-base sm:text-lg font-bold text-gray-800 block leading-tight truncate group-hover:text-[#0E4D92] transition-colors">{inst.name}</span>
                            <span className="text-xs sm:text-sm text-blue-500 flex items-center gap-1 truncate font-medium">
                                {inst.display} 
                                {inst.link !== "#" && (
                                    <motion.span 
                                        initial={{ x: 0, opacity: 0.6 }}
                                        whileHover={{ x: 3, opacity: 1 }}
                                        className="text-[10px] sm:text-xs"
                                    >
                                        ↗
                                    </motion.span>
                                )}
                            </span>
                          </div>
                      </motion.a>
                  ))}
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Pillars of the Trust */}
      <section className="pt-0 pb-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                  <span className="inline-block bg-[#E3F2FD] text-[#0E4D92] font-bold px-4 py-2 rounded-full border border-[#0E4D92] text-sm tracking-widest mb-4">CORE VALUES</span>
                  <h2 className="text-4xl font-extrabold text-[#0E4D92] font-hand">Pillars of Our Trust</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: <Target size={40}/>, title: "Visionary Leadership", desc: "Using good planning and future thinking to help our institutions stay updated in education.", color: "#E91E63" },
                      { icon: <Heart size={40}/>, title: "Social Commitment", desc: "Making sure everyone can get education and helping improve the community.", color: "#FFC107" },
                      { icon: <BookOpen size={40}/>, title: "Academic Integrity", desc: "Following strong values like honesty and fairness in everything we do in education.", color: "#00BCD4" }
                  ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="bg-white p-8 rounded-3xl shadow-xl transition-shadow border border-gray-100 border-b-4 hover:shadow-2xl"
                        style={{ borderColor: item.color }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                      >
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md" style={{ backgroundColor: item.color }}>
                              {item.icon}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default Trust;
