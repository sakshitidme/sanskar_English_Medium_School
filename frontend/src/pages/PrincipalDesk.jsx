import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import principalImage from "../assets/images/principle/kisorsir.jpg";

const PrincipalDesk = () => {
  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="Leadership Desk - Sanskar English Medium School"
        description="Meet the visionaries behind Sanskar English Medium School. Messages from our Secretary and Principal sharing our commitment to excellence."
      />

      {/* Principal Section - ORIGINAL CONTENT BELOW */}
      <article className="max-w-6xl mx-auto px-6 pt-32 pb-20">
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

