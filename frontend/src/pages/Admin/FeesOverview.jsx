import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Search, Wallet, ChevronRight, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
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

const FeesOverview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, pending, collected

  useEffect(() => {
    fetchFees();
  }, []);

  // Currently, the fees overview join logic is complex and might not perfectly map 
  // to the simpler backend endpoints we created. We will mock the join logic for now
  // or use the existing getAdmissions and getFees if they provide enough data.
  // For now, let's just fetch all fees and admissions and merge them if needed,
  // or fetch admissions which might need to handle fees relation in backend.
  // Since we haven't implemented relational joins in the backend yet, we'll fetch fees separately.
  const fetchFees = async () => {
    setLoading(true);
    try {
      const feesData = await api.getFees();
      const admissionsData = await api.getAdmissions();

      // Merge data (mocking the join)
      const mergedData = admissionsData.map(student => {
          const studentFees = feesData.filter(f => f.admission_id === student.id);
          return {
              ...student,
              fees: studentFees
          };
      });

      setStudents(mergedData);
    } catch (err) {
      console.error("Fetch Fees Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = `${s.student_first_name} ${s.student_surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.reg_no?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const fee = s.fees?.[0] || { pending_amount: 0, paid_amount: 0 };
    if (filterType === 'pending') return matchesSearch && fee.pending_amount > 0;
    if (filterType === 'collected') return matchesSearch && fee.pending_amount === 0 && fee.paid_amount > 0;
    return matchesSearch;
  });

  const stats = {
    totalExpected: students.reduce((acc, s) => acc + (s.fees?.[0]?.total_fees || 0), 0),
    totalCollected: students.reduce((acc, s) => acc + (s.fees?.[0]?.paid_amount || 0), 0),
    totalPending: students.reduce((acc, s) => acc + (s.fees?.[0]?.pending_amount || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilterType('all')}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
            filterType === 'all' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${filterType === 'all' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#0E4D92]'}`}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filterType === 'all' ? 'text-blue-100' : 'text-slate-400'}`}>Total Expected</p>
              <h4 className="text-2xl font-black">₹{stats.totalExpected}</h4>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilterType('collected')}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
            filterType === 'collected' ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${filterType === 'collected' ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filterType === 'collected' ? 'text-green-100' : 'text-slate-400'}`}>Total Collected</p>
              <h4 className="text-2xl font-black">₹{stats.totalCollected}</h4>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilterType('pending')}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
            filterType === 'pending' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${filterType === 'pending' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'}`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filterType === 'pending' ? 'text-orange-100' : 'text-slate-400'}`}>Total Pending</p>
              <h4 className="text-2xl font-black">₹{stats.totalPending}</h4>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
        {/* Search Bar */}
        <div className="p-8 border-b border-slate-50">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or reg no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-6 text-[10px] font-black   uppercase tracking-widest border-b border-slate-100">Reg No</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Student Name</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Grade</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Total Fees</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Paid</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Pending</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-8 py-12 text-center text-slate-400 font-bold">Loading fee records...</td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-8 py-12 text-center text-slate-400 font-bold">No records found.</td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const fee = s.fees?.[0] || { total_fees: 0, paid_amount: 0, pending_amount: 0 };
                  return (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={s.id} 
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <span className="font-black text-[#0E4D92] text-[10px] bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                          <HighlightText text={s.reg_no || 'N/A'} highlight={searchTerm} />
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-900 text-sm tracking-tight">
                          <HighlightText text={`${s.student_first_name} ${s.student_surname}`} highlight={searchTerm} />
                        </p>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-500 text-xs uppercase">{s.grade}</td>
                      <td className="px-8 py-6 font-black text-slate-900 text-sm">₹{fee.total_fees}</td>
                      <td className="px-8 py-6 font-black text-green-600 text-sm">₹{fee.paid_amount}</td>
                      <td className="px-8 py-6">
                        <span className={`font-black text-sm ${fee.pending_amount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          ₹{fee.pending_amount}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <Link 
                          to={`/admin/fees/${s.id}`}
                          className="flex items-center gap-2 text-[10px] font-black text-[#0E4D92] uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-xl hover:bg-[#0E4D92] hover:text-white transition-all w-fit"
                        >
                          Details <ChevronRight size={14} />
                        </Link>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesOverview;
