import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { 
  ChevronLeft, 
  Wallet, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Banknote,
  Navigation,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";

const ManageFees = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [feeData, setFeeData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isEditingReg, setIsEditingReg] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  // Form State
  const [newPayment, setNewPayment] = useState({
    amount: "",
    payment_mode: "Cash",
    online_mode: "",
    notes: ""
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  // Temporarily mocking complex join logic for Manage Fees since we don't have
  // dedicated payment endpoints yet in the node.js backend. We'll add this later if needed.
  const fetchData = async () => {
    setLoading(false);
  };

  const handleUpdateReg = async () => {
    try {
      await api.updateAdmissionStatus(id, { reg_no: regNo });
      setStudent({ ...student, reg_no: regNo });
      setIsEditingReg(false);
    } catch (err) {
      alert("Error updating registration number: " + err.message);
    }
  };

  const handleUpdateTotalFees = async (newTotal) => {
    try {
      await api.updateFee(feeData.id, { total_fees: newTotal });
      setFeeData({ ...feeData, total_fees: newTotal });
    } catch (err) {
      alert("Error updating total fees");
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!newPayment.amount || parseFloat(newPayment.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  };

  if (!student) return null;

  if (loading) return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E4D92]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/admin/admissions" className="flex items-center gap-2 text-slate-500 hover:text-[#0E4D92] font-bold text-sm uppercase tracking-widest transition-all">
          <ArrowLeft size={18} /> Back to Admissions
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => setShowAddPayment(true)}
             className="flex items-center gap-2 bg-[#0E4D92] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0b2a4a] transition-all shadow-lg active:scale-95"
           >
             <Plus size={18} /> Add Payment
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0E4D92] font-black text-2xl border border-blue-100 shadow-sm">
                {student.student_first_name[0]}{student.student_surname[0]}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight">{student.student_first_name} {student.student_surname}</h3>
                <p className="text-[10px] font-black text-[#0E4D92] uppercase tracking-[0.2em]">{student.grade}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration Number</label>
                {isEditingReg ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-[#0E4D92] outline-none"
                    />
                    <button onClick={handleUpdateReg} className="p-2 bg-green-500 text-white rounded-xl shadow-sm"><Save size={18} /></button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between group">
                    <span className="font-bold text-slate-700">{student.reg_no || 'Not Assigned'}</span>
                    <button onClick={() => setIsEditingReg(true)} className="p-1.5 text-slate-300 hover:text-[#0E4D92] hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Edit3 size={14} /></button>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</label>
                <p className="font-bold text-slate-700">{student.phone}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Fees (₹)</label>
                <div className="flex gap-2 mt-1">
                  <input 
                    type="number" 
                    value={feeData.total_fees}
                    onChange={(e) => setFeeData({...feeData, total_fees: e.target.value})}
                    onBlur={(e) => handleUpdateTotalFees(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-lg font-black text-[#0E4D92] focus:border-[#0E4D92] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fee Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#0E4D92] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-1">Paid Amount</p>
                 <h4 className="text-4xl font-black">₹{feeData.paid_amount}</h4>
               </div>
               <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12" />
            </div>
            <div className={`p-8 rounded-[2rem] shadow-sm border ${feeData.total_fees - feeData.paid_amount > 0 ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'} transition-colors`}>
               <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${feeData.total_fees - feeData.paid_amount > 0 ? 'text-orange-600/60' : 'text-green-600/60'}`}>Pending Amount</p>
               <h4 className={`text-4xl font-black ${feeData.total_fees - feeData.paid_amount > 0 ? 'text-orange-600' : 'text-green-600'}`}>₹{feeData.total_fees - feeData.paid_amount}</h4>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-3">
                <Clock className="text-[#0E4D92]" /> Payment History
              </h3>
            </div>
            
            <div className="overflow-x-auto flex-grow custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Method</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-12 text-center text-slate-400 font-bold">No payment history found.</td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-8 py-6 text-sm font-bold text-slate-600">
                          {new Date(p.payment_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 font-black text-slate-900">₹{p.amount}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            {p.payment_mode === "Online" ? <CreditCard size={14} className="text-blue-500" /> : <Banknote size={14} className="text-green-500" />}
                            <span className={`text-[10px] font-black uppercase tracking-widest ${p.payment_mode === "Online" ? 'text-blue-600' : 'text-green-600'}`}>
                              {p.payment_mode} {p.online_mode && `• ${p.online_mode}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-1">{p.notes || "-"}</p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      <AnimatePresence>
        {showAddPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddPayment(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-[#0E4D92] p-8 text-white relative">
                 <h3 className="text-2xl font-black uppercase tracking-tight">Add New Payment</h3>
                 <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">Recording payment for {student.student_first_name}</p>
              </div>

              <form onSubmit={handleAddPayment} className="p-10 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
                  <input 
                    type="number" 
                    required
                    autoFocus
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    placeholder="Enter amount"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xl font-black text-slate-900 focus:border-[#0E4D92] outline-none transition-all placeholder:text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Mode</label>
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 gap-1">
                      <button
                        type="button"
                        onClick={() => setNewPayment({...newPayment, payment_mode: "Cash"})}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${newPayment.payment_mode === "Cash" ? 'bg-white text-[#0E4D92] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Cash
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPayment({...newPayment, payment_mode: "Online"})}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${newPayment.payment_mode === "Online" ? 'bg-white text-[#0E4D92] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Online
                      </button>
                    </div>
                  </div>
                  
                  {newPayment.payment_mode === "Online" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Online Method</label>
                      <select 
                        required
                        value={newPayment.online_mode}
                        onChange={(e) => setNewPayment({...newPayment, online_mode: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold font-black text-slate-900 focus:border-[#0E4D92] outline-none transition-all"
                      >
                        <option value="">Select Method</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes (Optional)</label>
                  <textarea 
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                    placeholder="Ex: First Term Fees..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-900 focus:border-[#0E4D92] outline-none transition-all h-24 resize-none placeholder:text-slate-200"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 px-8 py-5 rounded-2xl text-slate-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[1.5] bg-[#0E4D92] text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#0b2a4a] transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center justify-center gap-3"
                  >
                    Record Payment <CheckCircle2 size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageFees;
