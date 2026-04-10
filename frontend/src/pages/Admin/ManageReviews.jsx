import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Search, Star, Trash2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const HighlightText = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = String(text).split(regex);
  return (
    <span>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 text-[#0E4D92] px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </span>
  );
};

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await api.getReviews();
      setReviews(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.deleteReview(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      alert("Error deleting review");
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Top Bar */}
      <div className="bg-white p-4 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 lg:py-4 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-xs lg:text-sm"
          />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
           Total: <span className="text-slate-900">{reviews.length} Reviews</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {loading ? (
          <p className="col-span-full text-center py-20 text-slate-400 font-bold">Loading reviews...</p>
        ) : filteredReviews.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-400 font-bold">No reviews found.</p>
        ) : (
          filteredReviews.map((r) => (
            <motion.div 
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-600 font-bold">
                    {new Date(r.createdAt || r.created_at).toLocaleDateString()}
                  </span>
                  <button onClick={() => deleteReview(r.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-grow">
                <p className="text-slate-700 text-sm font-semibold italic mb-6 line-clamp-4 leading-relaxed tracking-wide">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#0E4D92] font-black text-sm">
                  {r.name[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm tracking-tight">
                    <HighlightText text={r.name} highlight={searchTerm} />
                  </h4>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{r.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[8px] font-black text-green-500 uppercase tracking-widest">
                  <CheckCircle size={10} /> Active
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageReviews;
