import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Star, User, Quote, ThumbsUp, Loader2 } from "lucide-react";
import { api } from "../services/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await api.getReviews();
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id, currentLikes) => {
      try {
          await api.likeReview(id);
          
          // Optimistic update
          setReviews(reviews.map(r => r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r));
      } catch (error) {
          console.error("Error liking review:", error.message);
      }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <section className="bg-gray-50 min-h-screen pb-16 pt-0">
      <SEO 
        title="What People Say"
        description="Read reviews and testimonials from parents and students of Sanskar English Medium School."
      />
      
     <div className="bg-slate-50 relative pb-0">
                   {/* Header with Dark Blue Background */}
                   <div className="bg-[#0E4D92] pt-24 lg:pt-32 pb-10 relative overflow-hidden text-center mb-0">
                     {/* Background Decorative Pattern */}
                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                     <div className="relative z-10 max-w-7xl mx-auto">
                          <motion.h2 
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           className="text-4xl md:text-6xl font-extrabold text-white font-hand mb-2"
                         >
                           Parents <span className="text-[#FFC107]"> Reviews</span>
                         </motion.h2>
                       </div>
                   </div>
                    

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#1A4D8D] mb-4" size={48} />
            <p className="text-gray-500 font-medium">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No reviews yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1200px] px-4 md:px-8 max-w-7xl mx-auto mt-12">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -150 : 150,
                  rotateY: index % 2 === 0 ? 35 : -35,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  rotateY: 0,
                  scale: 1
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  delay: index * 0.1,
                  duration: 0.8
                }}
                viewport={{ once: false, amount: 0.2 }}
                className="p-8 rounded-2xl transition-all duration-300 border border-gray-100 relative group bg-blue-100 scale-105 -translate-y-2 shadow-2xl md:bg-white md:scale-100 md:translate-y-0 md:shadow-lg md:hover:bg-blue-100 md:hover:-translate-y-2 md:hover:scale-105 md:hover:shadow-2xl"
              >
                <div className="absolute top-6 right-8 text-gray-200 group-hover:text-blue-100 transition-colors">
                  <Quote size={60} fill="currentColor" />
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-[#1A4D8D]">
                    <User size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#0b2a4a]">{review.name}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{review.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed mb-6 relative z-10 text-lg">
                  "{review.content}"
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-4">
                  <span>{review.createdAt || review.created_at ? formatDate(review.createdAt || review.created_at) : 'Recently'}</span>
                  <span 
                    onClick={() => handleLike(review.id, review.likes)}
                    className="flex items-center gap-1 hover:text-[#E91E63] cursor-pointer transition-colors"
                  >
                     <ThumbsUp size={16} /> {review.likes || 0} Helpful
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center pb-12">
            <h3 className="text-2xl font-bold text-[#0b2a4a] mb-6">Have an experience to share?</h3>
             <motion.a 
                href="/write-review"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-[#1A4D8D] text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-[#0b2a4a] transition-colors"
             >
                Write a Review
             </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
