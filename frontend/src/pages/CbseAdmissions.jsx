import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Briefcase, FileText, Activity } from "lucide-react";

import playgroupImg from "../assets/images/home/hero/playgroup.png";
import nurseryImg from "../assets/images/home/hero/nursery.png";
import jrKgImg from "../assets/images/home/hero/jr.kg.png";
import srKgImg from "../assets/images/home/hero/sr_kg_new.jpg";

const CbseAdmissions = () => {
  const classesData = [
    {
      title: "Playgroup",
      age: "2-3 Years",
      image: playgroupImg,
      features: ["Sensory Development", "Storytelling & Rhymes", "Social Skills", "Fun Physical Activities"],
    },
    {
      title: "Nursery",
      age: "3-4 Years",
      image: nurseryImg,
      features: ["Alphabet & Numbers", "Motor Skills", "Creative Arts", "Early Language"],
    },
    {
      title: "Jr. KG",
      age: "4-5 Years",
      image: jrKgImg,
      features: ["Reading & Writing", "Simple Math", "Environmental Awareness", "Interactive Learning"],
    },
    {
      title: "Sr. KG",
      age: "5-6 Years",
      image: srKgImg,
      features: ["Advanced Reading", "Logical Math", "Science & Discovery", "1st Standard Prep"],
    },
  ];

  const rules = [
    {
      title: "Attendance",
      desc: "Students must attend school regularly. At least 75% attendance is needed to give exams.",
      icon: "📅",
    },
    {
      title: "School Uniform",
      desc: "Every student must wear the correct and clean school uniform every day.",
      icon: "👕",
    },
    {
      title: "Punctuality",
      desc: "Students should reach school 10 minutes before the bell rings. Late coming is not allowed.",
      icon: "⏰",
    },
    {
      title: "Discipline",
      desc: "Students must be polite and follow the instructions of teachers. Mobile phones are not allowed.",
      icon: "🤝",
    },
    {
      title: "Exams & Tests",
      desc: "We follow the CBSE pattern with regular tests and exams to check student progress.",
      icon: "✍️",
    },
    {
      title: "Homework",
      desc: "Students must complete their daily homework and submit it on time to their teachers.",
      icon: "📚",
    },
  ];

  const materials = [
    { name: "School book set", icon: BookOpen },
    { name: "School bag", icon: Briefcase },
    { name: "School I card", icon: CheckCircle },
    { name: "School file", icon: FileText },
    { name: "School activity material", icon: Activity },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <SEO 
        title="CBSE Admissions - Sanskar English Medium School"
        description="Join the CBSE curriculum at Sanskar English Medium School. Read our simple rules and admission process."
      />

      {/* Hero Section */}
       

      {/* Pre-Primary Classes Section */}
      <section className="pt-32 pb-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {classesData.map((program, idx) => (
                   <motion.div 
                     key={program.title} 
                     className="group relative rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100 flex flex-col bg-slate-50 hover:shadow-2xl transition-shadow duration-300"
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: idx * 0.1 }}
                   >
                     {/* Image Section */}
                     <div className="relative h-48 overflow-hidden">
                        <img 
                          src={program.image} 
                          alt={program.title} 
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-2xl font-black text-white mb-1 drop-shadow-md font-hand tracking-wider">{program.title}</h3>
                            <span className="inline-block bg-[#FFC107] text-[#0b2a4a] text-xs font-bold px-3 py-1 rounded-full shadow-sm">Age: {program.age}</span>
                        </div>
                     </div>

                     {/* Content Section */}
                     <div className="p-6 flex-1 flex flex-col justify-between">
                       <div className="mb-6">
                           <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Key Features</h4>
                           <ul className="space-y-3">
                               {program.features.map((feature, fIdx) => (
                                   <li key={fIdx} className="flex items-start text-sm text-gray-700">
                                       <span className="text-green-500 mr-2 font-bold mt-0.5">✓</span>
                                       <span className="font-medium text-gray-600">{feature}</span>
                                   </li>
                               ))}
                           </ul>
                       </div>
                       
                       <Link to="/admission" className="w-full mt-auto block pb-1">
                          <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-white text-[#0E4D92] font-black py-3 px-6 rounded-xl shadow-[3px_3px_0px_0px_#1A4D8D] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A4D8D] transition-all border-2 border-[#1A4D8D] flex items-center justify-center gap-2 group/btn"
                          >
                              Admissions 
                              <span className="group-hover/btn:translate-x-1 transition-transform">➜</span>
                          </motion.button>
                       </Link>
                     </div>
                   </motion.div>
                 ))}
          </div>
        </div>
      </section>

      {/* Admission Info - Visual Stepper */}
      <div className="max-w-5xl mx-auto">
        <section className="bg-gradient-to-br from-[#1a1c18] via-[#0f110c] to-black p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                 {/* Subtle Glow */}
                 <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#d4c38d]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
                 <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none translate-y-1/2"></div>

                 <div className="relative z-10 text-center">
                   <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">School Admission Process</h2>
                   
                   <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[10px] md:text-sm text-gray-400 mb-10 font-medium">
                     <Link to="/admission" className="hover:text-[#d4c38d] transition-colors">Online Admission Form</Link>
                   <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                   <Link to="/contact" className="hover:text-[#d4c38d] transition-colors">Enquiry Form</Link>
                 </div>

                 {/* Stepper Container */}
                 <div className="relative w-full flex flex-col xl:flex-row justify-between items-center gap-4 xl:gap-0">
                    
                    {/* Horizontal Connection Line */}
                    <div className="hidden xl:block absolute top-1/2 left-[5%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>
                    
                    {/* Vertical Connection Line */}
                    <div className="xl:hidden absolute left-1/2 top-[5%] bottom-[5%] w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 z-0"></div>

                    {[
                      "Get in touch",
                      "Campus visit",
                      "Application form",
                      "Submit documents",
                      "Receive enrolment no."
                    ].map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative z-10 px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold shadow-xl border bg-[#0a0a0a] text-gray-200 border-white/10 hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-300 w-auto text-center cursor-default tracking-wide"
                      >
                        {step}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="relative z-10 px-5 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] bg-[#b91c3f] text-white hover:bg-[#9f1533] transition-all duration-300 flex justify-center items-center gap-2 w-auto mt-4 xl:mt-0 cursor-default tracking-wide"
                    >
                      Yay! <span className="text-base leading-none">🎉</span> Start learning
                    </motion.div>
                 </div>

                 <p className="text-gray-400 text-[13px] md:text-sm mt-12 font-medium">
                   Your child is now ready to start Learning!
                 </p>
               </div>
              </section>
            </div>




      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Included Materials */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                          <h2 className="text-2xl font-bold text-[#1A4D8D] mb-6 flex items-center">
                            <span className="bg-emerald-100 p-2 rounded-full mr-3 text-emerald-600">
                              <CheckCircle size={24} />
                            </span>
                            What's Included in the Fee?
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {materials.map((item, idx) => (
                              <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors duration-300">
                                <item.icon className="text-emerald-500 mr-3" size={20} />
                                <span className="text-gray-700 font-medium capitalize">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

            {/* Admission Info - Visual Stepper */}
          
          {/* Left Column: Rules & Regulations */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl border border-gray-100">⚖️</div>
                <h2 className="text-3xl font-bold text-[#0b2a4a]">Rules and Regulations</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rules.map((rule, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{rule.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1A4D8D] mb-1">{rule.title}</h3>
                        <p className="text-gray-600 text-base leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
             
            {/* Admission Info - Visual Stepper */}
             
          </div>

          {/* Right Column: Key Benefits */}
          
    

        </div>
      </div>
    </main>
  );
};

export default CbseAdmissions;
