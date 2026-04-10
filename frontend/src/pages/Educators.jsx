import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import edu1 from "../assets/images/about/educators/edu1.jpeg";
import edu2 from "../assets/images/about/educators/edu2.jpg";
import edu3 from "../assets/images/about/educators/edu3.png";
import edu4 from "../assets/images/about/educators/edu4.png";
import edu5 from "../assets/images/about/educators/edu5.png";
import edu6 from "../assets/images/about/educators/edu6.png";

const Educators = () => {
  const educators = [
      {
        name: "Gayatri Mayur shankhpal",
        role: "Nursery Teacher",
        qualification: "B.Com",
        image: edu1,
      },
      {
        name: "Ananya Vikas Jadhav",
        role: "Jr.Kg Teacher",
        qualification: "M.Com",
        image: edu2,
      },
      {
        name: "Yogita Raju dorkar",
        role: "Nursery Teacher",
        qualification: "BA (Eng)",
        image: edu3,
      },
      {
        name: "Seema Sachin shewale",
        role: "Play Group",
        qualification: "MA (Marathi)",
        image: edu4,
      },
      {
        name: "Neelam Prashanth Pawar",
        role: "SR. Kg Teacher",
        qualification: "BA.Ed (Eng)",
        image: edu5,
      },
      {
        name: "avita Vivek bhamri",
        role: "Primary Teacher",
        qualification: "BA (Eco)",
        image: edu6,
      },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Our Educators - Sanskar English Medium School"
        description="Meet the dedicated and passionate educators at Sanskar English Medium School who shape the future of our students."
        keywords="teachers, faculty, staff, principal, educators, sanskar school nashik"
      />

      {/* Hero Section */}
       
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
                    Our <span className="text-[#FFC107]">Educators</span>
                  </motion.h2>
                </div>
            </div>
    

      {/* Staff Grid */}
      <section className="pb-24 pt-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {educators.map((edu, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="h-80 overflow-hidden relative bg-gray-200">
                <img
                  src={edu.image}
                  alt={edu.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#0E4D92] mb-1">{edu.name}</h3>
                <p className="text-[#E91E63] font-medium text-sm uppercase tracking-wide mb-2">{edu.role}</p>
                <p className="text-gray-500 text-sm">{edu.qualification}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Educators;
