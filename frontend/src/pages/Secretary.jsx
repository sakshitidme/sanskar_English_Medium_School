import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { BookOpen, Award, GraduationCap, FileText } from "lucide-react";
import bhagwanSir from "../assets/images/trust/bhagwanSir.jpg";

const Secretary = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 px-4 sm:px-6">
      <SEO 
        title="Secretary's Profile - Sanskar English Medium School" 
        description="Profile and academic qualifications of Dr. Adv. Er. Bhagwan Nivrutti Yelmame, Secretary of BK Education And Welfare Society."
      />

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0E4D92] mb-4 drop-shadow-sm font-sans tracking-tight">
          Secretary's Profile
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[2px] w-12 bg-[#FFC107]"></div>
          <h3 className="text-[#0E4D92] font-bold md:text-lg tracking-wide">
            Academic & Professional Qualifications
          </h3>
          <div className="h-[2px] w-12 bg-[#FFC107]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Photo Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/4 xl:w-1/4 shrink-0 bg-white p-4 rounded-xl shadow-[0_0_30px_rgba(255,193,7,0.3)] border border-gray-100 flex flex-col items-center sticky top-32"
        >
          <div className="w-full overflow-hidden rounded-xl bg-gray-100 mb-6 relative group">
            <img 
              src={bhagwanSir} 
              alt="Dr. Adv. Bhagwan Nivrutti Yelmame" 
              className="w-full h-auto object-cover object-top aspect-[4/5] transform group-hover:scale-105 transition-transform duration-700" 
            />
            {/* Subtle overlay glaze */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h2 className="text-[#0E4D92] text-xl font-black text-center leading-tight mb-2 px-2">
            Dr. Adv. Er. Bhagwan Nivrutti Yelmame
          </h2>
          <p className="text-[#E91E63] font-bold text-xs tracking-widest uppercase mb-4">
            SECRETARY
          </p>
        </motion.div>

        {/* Right Column: Qualifications Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Box 1: Master's Degrees */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-[#0E4D92] hover:shadow-md transition-shadow relative">
             <div className="relative z-10">
                <h4 className="flex items-center gap-2 text-[#E91E63] font-black text-sm uppercase tracking-wider mb-5">
                <BookOpen size={18} className="text-[#E91E63]" /> MASTER'S DEGREES
                </h4>
                <ul className="space-y-3">
                {[
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
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                    <span className="text-[#FFC107] mr-2 mt-0.5 font-bold">•</span>
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
             </div>
          </motion.div>

          {/* Box 2: NET/SET */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-[#0E4D92] hover:shadow-md transition-shadow relative">
             <div className="relative z-10">
                <h4 className="flex items-center gap-2 text-[#E91E63] font-black text-sm uppercase tracking-wider mb-5">
                <Award size={18} className="text-[#E91E63]" /> NET / SET (UGC)
                </h4>
                <ul className="space-y-3">
                {[
                    "UGC-NET (Public Administration)",
                    "UGC-NET (Law)",
                    "UGC-NET (Commerce)",
                    "UGC-NET (Economics)",
                    "UGC-NET (Library and Information Science)",
                    "UGC-SET (Management)",
                    "UGC-SET (Journalism & Mass Communication)"
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                    <span className="text-[#FFC107] mr-2 mt-0.5 font-bold">•</span>
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
             </div>
          </motion.div>

          {/* Box 3: Bachelor's Degrees */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-[#0E4D92] hover:shadow-md transition-shadow relative">
             <div className="relative z-10">
                <h4 className="flex items-center gap-2 text-[#E91E63] font-black text-sm uppercase tracking-wider mb-5">
                <FileText size={18} className="text-[#E91E63]" /> BACHELOR'S DEGREES & DIPLOMAS
                </h4>
                <ul className="space-y-3">
                {[
                    "LL.B – Bachelor of Laws",
                    "B.Com – Costing",
                    "B.Lib & I.Sc – Bachelor of Library & Information Sci.",
                    "GDC&A – Government Diploma in Cooperation & A/c",
                    "DTL – Diploma in Taxation Laws",
                    "DME – Diploma in Mechanical Engineering"
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                    <span className="text-[#FFC107] mr-2 mt-0.5 font-bold">•</span>
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
            </div>
          </motion.div>

          {/* Box 4: Doctoral Degrees */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-[#0E4D92] hover:shadow-md transition-shadow relative">
             <div className="relative z-10">
                <h4 className="flex items-center gap-2 text-[#E91E63] font-black text-sm uppercase tracking-wider mb-5">
                <GraduationCap size={18} className="text-[#E91E63]" /> DOCTORAL DEGREES
                </h4>
                <ul className="space-y-3">
                {[
                    "Ph.D. (Management) – Completed",
                    "Ph.D. (Law) – Pursuing"
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                    <span className="text-[#FFC107] mr-2 mt-0.5 font-bold">•</span>
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Secretary;
