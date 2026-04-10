import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Star, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const WriteReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Parent",
    content: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    setLoading(true);
    try {
      await api.createReview({ 
        name: formData.name, 
        role: formData.role, 
        rating: rating, 
        content: formData.content,
        likes: 0
      });

      setSubmitted(true);
      setTimeout(() => {
          navigate("/reviews");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert("Failed to submit review. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full"
              >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <Send size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0b2a4a] mb-2">Thank You!</h2>
                  <p className="text-gray-600">Your review has been submitted successfully.</p>
              </motion.div>
          </div>
      )
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen pt-32 pb-16 flex items-center">
      <SEO 
        title="Write a Review"
        description="Share your experience with Sanskar English Medium School."
      />
      
      <div className="max-w-2xl mx-auto px-6 w-full">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-[#1A4D8D] p-8 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <h1 className="text-3xl font-extrabold relative z-10">Write a Review</h1>
             <p className="text-blue-100 mt-2 relative z-10">We value your feedback!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
            
            {/* Rating */}
            <div className="text-center mb-8">
                <label className="block text-gray-700 font-bold mb-3">How would you rate your experience?</label>
                <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <Star 
                                key={index}
                                size={40}
                                className={`cursor-pointer transition-all duration-200 ${ratingValue <= (hover || rating) ? "text-yellow-400 fill-current scale-110" : "text-gray-300"}`}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A4D8D] focus:bg-white transition-all" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Relation</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A4D8D] focus:bg-white transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option>Parent</option>
                        <option>Student</option>
                        <option>Alumni</option>
                        <option>Visitor</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
                <textarea 
                    rows="5"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A4D8D] focus:bg-white transition-all resize-none"
                    placeholder="Tell us about your experience..."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
            </div>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-[#E91E63] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#d81557] transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                  <>Submitting... <Loader2 className="animate-spin" size={20} /></>
                ) : (
                  <>Submit Review <Send size={20} /></>
                )}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WriteReview;
