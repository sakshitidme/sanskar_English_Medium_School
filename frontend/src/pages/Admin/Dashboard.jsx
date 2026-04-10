import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { 
  Users, 
  MessageSquare, 
  Star, 
  Eye, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color, trend, delay, to }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="h-full"
  >
    <Link 
      to={to} 
      className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full block"
    >
      <div className="flex justify-between items-start mb-4 lg:mb-6">
        <div className={`w-12 h-12 lg:w-14 lg:h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
          <Icon size={24} className="lg:w-7 lg:h-7" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-black ${trend > 0 ? "text-green-500" : "text-blue-500"}`}>
            {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-[0.2em] mb-1">{title}</h3>
      <p className="text-4xl font-black text-slate-900 tracking-tight">{value}</p>
      
      <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
        View Details <ArrowUpRight size={12} />
      </div>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    admissions: 0,
    contacts: 0,
    reviews: 0,
    views: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [admissions, contacts, reviews, viewData] = await Promise.all([
          api.getAdmissions(),
          api.getContacts(),
          api.getReviews(),
          api.getTotalViews()
        ]);

        setStats({
          admissions: admissions.length || 0,
          contacts: contacts.length || 0,
          reviews: reviews.length || 0,
          views: viewData.total || 0
        });

      } catch (err) {
        console.error("Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 lg:space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <StatCard 
          title="Total Admissions" 
          value={stats.admissions} 
          icon={Users} 
          color="bg-blue-600" 
          trend={12} 
          delay={0.1}
          to="/admin/admissions"
        />
        <StatCard 
          title="Contact Queries" 
          value={stats.contacts} 
          icon={MessageSquare} 
          color="bg-green-500" 
          trend={5} 
          delay={0.2}
          to="/admin/contacts"
        />
        <StatCard 
          title="User Reviews" 
          value={stats.reviews} 
          icon={Star} 
          color="bg-yellow-500" 
          trend={-2} 
          delay={0.3}
          to="/admin/reviews"
        />
        <StatCard 
          title="Website Views" 
          value={stats.views} 
          icon={Eye} 
          color="bg-purple-500" 
          trend={24} 
          delay={0.4}
          to="/admin/dashboard"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-10 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 text-lg lg:text-xl tracking-tight uppercase">Recent Admissions</h3>
            <span className="text-blue-600 font-bold text-[10px] lg:text-xs uppercase tracking-widest hover:underline cursor-pointer">View All</span>
          </div>
          <div className="space-y-6 text-center py-8 lg:py-12">
            <Clock className="mx-auto text-slate-200 w-10 h-10 lg:w-12 lg:h-12" />
            <p className="text-slate-400 font-bold text-xs lg:text-sm uppercase tracking-widest">Real-time update logic coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
