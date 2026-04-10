import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Briefcase } from "lucide-react";
import principalImage from "../assets/images/principle/kisorsir.jpg";
import secretaryImage from "../assets/images/principle/bhagwansir.jpg";

const SecretarySection = () => {
  const qualifications = [
    { category: "Master's Degrees", items: [
      "MBA (Financial Management)",
      "MBA (Marketing Management)",
      "LL.M – Master of Laws",
      "M.Com – Costing",
      "MA (Economics)",
      "MA (Public Administration)",
      "MA (Rural Development)",
      "MA (Sociology)",
      "M.Lib & I.Sc – Master of Library & Information Sci.",
      "MCJ – Master of Communication & Journalism"
    ], icon: <BookOpen size={20} /> },
    { category: "NET / SET (UGC)", items: [
      "UGC-NET (Public Administration)",
      "UGC-NET (Law)",
      "UGC-NET (Commerce)",
      "UGC-NET (Economics)",
      "UGC-NET (Library and Information Science)",
      "UGC-SET (Management)",
      "UGC-SET (Journalism & Mass Communication)"
    ], icon: <Award size={20} /> },
     
    { category: "Bachelor's Degrees & Diplomas", items: [
      "LL.B – Bachelor of Laws",
      "B.Com – Costing",
      "B.Lib & I.Sc – Bachelor of Library & Information Sci.",
      "GDC&A – Government Diploma in Cooperation & A/c",
      "DTL – Diploma in Taxation Laws",
      "DME – Diploma in Mechanical Engineering"
    ], icon: <Briefcase size={20} /> },
    { category: "Doctoral Degrees", items: ["Ph.D. (Management) – Completed", "Ph.D. (Law) – Pursuing"], icon: <GraduationCap size={20} /> }
  ];

  return (
    <section className="bg-slate-50 pt-30 pb-12 px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Side */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
           <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b2a4a] mt-2 font-hand mb-6">Secretary's Profile</h2>
           <h4 className="text-xl font-bold text-[#0b2a4a] flex items-center justify-center gap-2">
             <span className="w-8 h-1 bg-[#FFC107] rounded-full"></span>
             Academic & Professional Qualifications
             <span className="w-8 h-1 bg-[#FFC107] rounded-full"></span>
           </h4>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
          {/* Profile Card */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0E4D92] to-[#FFC107] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <img 
                  src={secretaryImage} 
                  alt="Dr. Adv. Bhagwan Nivrutti Yelmame" 
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-6 p-4 text-center">
                  <h3 className="text-2xl font-bold text-[#0E4D92]">Dr. Adv. Bhagwan Nivrutti Yelmame</h3>
                  <p className="text-[#E91E63] font-bold text-sm uppercase tracking-widest mt-1">Secretary</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Qualifications Side */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualifications.map((group, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border-t-4 border-[#0E4D92] hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#E91E63] mb-3">
                    {group.icon}
                    <h5 className="font-bold text-sm uppercase tracking-wider">{group.category}</h5>
                  </div>
                  <ul className="space-y-1.5">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-gray-600 text-xs font-semibold flex items-start gap-2">
                        <span className="text-[#FFC107] mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PrincipalDesk = () => {
  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="Leadership Desk - Sanskar English Medium School"
        description="Meet the visionaries behind Sanskar English Medium School. Messages from our Secretary and Principal sharing our commitment to excellence."
      />

      {/* Simplified Header */}
      
      {/* Secretary Section - NEW */}
      <SecretarySection />

      {/* Principal Section - ORIGINAL CONTENT BELOW */}
      <article className="max-w-6xl mx-auto px-6 pt-8 pb-20">
         <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b2a4a] mt-2 font-hand">Principal's Desk</h2>
         </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Professional Image Column */}
          <motion.aside 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#FFC107]/40 rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#0b2a4a]/20 rounded-br-2xl"></div>
              
              <div className="relative z-10 bg-white p-2 shadow-xl rounded-2xl border border-gray-100">
                <img 
                  src={principalImage} 
                  alt="Prof. Kishor Nivrutti Yelmame" 
                  className="w-full h-auto object-cover rounded-xl -scale-x-100"
                />
                <div className="mt-6 p-4 text-center">
                  <h3 className="text-xl font-bold text-[#0b2a4a]">Prof. Kishor Nivrutti Yelmame</h3>
                  <p className="text-[#E91E63] font-semibold text-sm uppercase tracking-wider mt-1">Principal</p>
                  <p className="text-gray-500 text-xs mt-2 italic">15+ Years of Academic Excellence</p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Clean Message Column */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-9xl text-gray-100 font-serif leading-none select-none">“</span>
              
              <div className="relative z-10">
                <blockquote className="text-2xl font-serif italic text-gray-700 mb-10 leading-relaxed border-l-4 border-[#FFC107] pl-8">
                  "Education is not the learning of facts, but the training of the mind to think."
                </blockquote>

                <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                  <p>
                    Greetings to all members of the Sanskar community!
                  </p>
                  
                  <p>
                    I am very happy and proud to welcome you to our school website. At <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span>, we do not only teach subjects from books — we help build a bright future for every child.
                  </p>

                  <p>
                    We believe that every child is special and has great talent inside them. Our school gives a safe and caring environment where students can learn freely, ask questions, try new things, and grow with confidence.
                  </p>

                  <p>
                    In today’s fast-changing world, we focus on the overall development of students. Along with good education, we also teach good values, emotional understanding, creativity, and discipline. Our teachers work hard to create a positive and inspiring learning atmosphere.
                  </p>

                  <p>
                    We invite you to join us on this wonderful journey. Together, we can help our children learn, grow, and succeed in life.
                  </p>

                  <p>
                    Thank you for trusting <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span> with your child’s future.
                  </p>
                </div>

                {/* Formal Signature */}
                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col items-center text-center">
                  <h4 className="text-4xl md:text-5xl font-bold text-[#0E4D92] font-hand mb-2">
                    Prof. Kishor Nivrutti Yelmame 
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="w-8 h-1 bg-[#E91E63] rounded-full opacity-70"></span>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Principal, Sanskar School</p>
                    <span className="w-8 h-1 bg-[#E91E63] rounded-full opacity-70"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </article>

    </main>
  );
};

export default PrincipalDesk;

