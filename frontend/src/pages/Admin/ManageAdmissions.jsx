import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, ChevronLeft, ChevronRight, User, Wallet, FileText, X, Phone, MapPin, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { generateAdmissionPDF } from "../../utils/pdfGenerator";

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

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  useEffect(() => {
    if (selectedAdmission) {
      const { transactionId, phone, email } = selectedAdmission;
      fetchPaymentDetails(transactionId, phone, email);
    } else {
      setPaymentDetails(null);
    }
  }, [selectedAdmission]);

  const fetchPaymentDetails = async (txnId, phone, email) => {
    setPaymentLoading(true);
    setPaymentDetails(null);
    try {
      // 1. Try fetching by Transaction ID first if available
      if (txnId) {
        const data = await api.getPaymentDetails(txnId);
        if (data.success) {
          setPaymentDetails(data.payment);
          setPaymentLoading(false);
          return;
        }
      }

      // 2. Fallback: Search by Phone or Email if no txnId or fetch failed
      if (phone || email) {
        const searchData = await api.searchPayments({ phone, email });
        if (searchData.success && searchData.payments.length > 0) {
          // Use the latest payment found
          setPaymentDetails({
            ...searchData.payments[0],
            isAutoLinked: true // Flag for UI
          });
        }
      }
    } catch (err) {
      console.error("Payment Fetch/Search Error:", err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const data = await api.getAdmissions();
      setAdmissions(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (admissions.length === 0) return;
    
    const headers = ["ID", "Date", "Student Name", "Grade", "Phone", "Email", "Status"];
    const rows = admissions.map(a => [
      a.id,
      new Date(a.createdAt || a.created_at).toLocaleDateString(),
      `${a.student_first_name} ${a.student_surname}`,
      a.grade,
      a.phone,
      a.email,
      a.status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `admissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAdmissions = admissions.filter(a => 
    `${a.student_first_name} ${a.student_surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.phone?.includes(searchTerm)
  );

  return (
    <>
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Search & Actions Bar */}
      <div className="p-4 lg:p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 shrink-0">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 lg:py-4 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-xs lg:text-sm placeholder:text-slate-300"
          />
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button 
            onClick={exportToCSV}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#0E4D92] text-white px-5 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest hover:bg-[#0b2a4a] transition-all shadow-lg active:scale-95"
          >
            <Download size={16} className="lg:w-[18px]" /> <span className="hidden xs:inline">Export CSV</span><span className="xs:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto flex-grow custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Reg No</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Student Name</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Grade</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Contact Info</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Date</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-8 py-12 text-center text-slate-400 font-bold">Loading records...</td>
              </tr>
            ) : filteredAdmissions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-8 py-12 text-center text-slate-400 font-bold">No records found.</td>
              </tr>
            ) : (
              filteredAdmissions.map((a) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={a.id} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <span className="font-black text-[#0E4D92] text-xs bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                      {a.reg_no ? <HighlightText text={a.reg_no} highlight={searchTerm} /> : 'NOT ASSIGNED'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div 
                      onClick={() => setSelectedAdmission(a)}
                      className="flex items-center gap-4 cursor-pointer group/name hover:scale-105 transition-transform origin-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 group-hover/name:border-[#0E4D92] group-hover/name:ring-4 group-hover/name:ring-blue-100 transition-all">
                        {a.form_data?.childPhotoUrl ? (
                          <img src={a.form_data.childPhotoUrl} alt="Student" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <User size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm tracking-tight group-hover/name:text-[#0E4D92] transition-colors">
                          <HighlightText text={`${a.student_first_name} ${a.student_surname}`} highlight={searchTerm} />
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{a.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-[#0E4D92] text-sm">{a.grade}</td>
                  <td className="px-8 py-6">
                    <a href={`tel:${a.phone}`} className="font-bold text-slate-700 text-xs hover:text-[#0E4D92] transition-colors">{a.phone}</a>
                    <a href={`mailto:${a.email}`} className="block text-[10px] text-slate-400 uppercase font-black tracking-tight hover:text-[#0E4D92] transition-colors">{a.email}</a>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">
                    {new Date(a.createdAt || a.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      a.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      <Link 
                        to={`/admin/fees/${a.id}`}
                        className="p-2 border border-blue-200 rounded-xl text-[#0E4D92] hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-2 group/btn"
                        title="Manage Fees"
                      >
                        <Wallet size={18} />
                        <span className="text-[10px] font-black uppercase hidden group-hover/btn:inline">Fees</span>
                      </Link>
                      <button 
                        onClick={() => setSelectedAdmission(a)}
                        className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-[#0E4D92] hover:border-[#0E4D92] hover:bg-blue-50 transition-all"
                        title="View Details"
                      >
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-8 bg-slate-50/50 flex justify-between items-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900">{filteredAdmissions.length}</span> of <span className="text-slate-900">{admissions.length}</span> records
        </p>
        <div className="flex gap-2">
          <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50" disabled>
            <ChevronLeft size={18} />
          </button>
          <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50" disabled>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>

    {/* Details Modal */}
    <AnimatePresence>
        {selectedAdmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAdmission(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#0E4D92] p-8 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                    {selectedAdmission.form_data?.childPhotoUrl ? (
                      <img src={selectedAdmission.form_data.childPhotoUrl} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">{selectedAdmission.student_first_name} {selectedAdmission.student_surname}</h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-blue-100 text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Reg No: {selectedAdmission.reg_no || 'Pending'}</span>
                      <span className="text-blue-100 text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">{selectedAdmission.grade}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedAdmission(null)} className="p-3 hover:bg-white/10 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Left Column: Personal Info */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <User size={14} className="text-[#0E4D92]" /> Personal Information
                      </h4>
                      <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                          <p className="font-bold text-slate-900 text-sm">{selectedAdmission.student_first_name} {selectedAdmission.student_middle_name} {selectedAdmission.student_surname}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</p>
                          <p className="font-bold text-slate-900 text-sm">{selectedAdmission.dob}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                          <p className="font-bold text-slate-900 text-sm">{selectedAdmission.category}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Applying for Grade</p>
                          <p className="font-bold text-[#0E4D92] text-sm uppercase">{selectedAdmission.grade}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <Phone size={14} className="text-[#0E4D92]" /> Contact Details
                      </h4>
                      <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                          <a href={`tel:${selectedAdmission.phone}`} className="font-bold text-[#0E4D92] text-sm hover:underline">{selectedAdmission.phone}</a>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                          <a href={`mailto:${selectedAdmission.email}`} className="font-bold text-[#0E4D92] text-xs truncate block hover:underline">{selectedAdmission.email}</a>
                        </div>
                        <div className="col-span-2 border-t border-slate-200 pt-4">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <MapPin size={8} /> Residential Address
                          </p>
                          <p className="font-bold text-slate-700 text-xs mt-1 leading-relaxed">
                            {selectedAdmission.form_data?.address}, {selectedAdmission.form_data?.pincode}
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <CreditCard size={14} className="text-[#0E4D92]" /> Registration Payment
                      </h4>
                      <div className={`p-6 rounded-3xl border ${selectedAdmission.transactionId ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-inherit">Status</p>
                              <p className={`font-black text-xs uppercase tracking-widest ${
                                (selectedAdmission.transactionId || paymentDetails) ? 'text-green-700' : 'text-yellow-700'
                              }`}>
                                {(selectedAdmission.transactionId || paymentDetails) ? (
                                  paymentDetails?.isAutoLinked ? 'Fee Paid (Smart Linked)' : 'Registration Fee Paid'
                                ) : 'Payment Pending'}
                              </p>
                            </div>
                            {(selectedAdmission.transactionId || paymentDetails?.razorpay_payment_id) && (
                              <div className={`text-right ${paymentDetails?.isAutoLinked ? 'text-blue-600' : 'text-green-700'}`}>
                                <p className="text-[8px] font-black opacity-60 uppercase tracking-widest">
                                  {paymentDetails?.isAutoLinked ? 'Found Txn ID' : 'Txn ID'}
                                </p>
                                <p className="font-black text-[10px]">{selectedAdmission.transactionId || paymentDetails.razorpay_payment_id}</p>
                              </div>
                            )}
                          </div>

                          {paymentLoading && (
                            <div className="animate-pulse flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase">
                              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Fetching Secure Details...
                            </div>
                          )}

                          {paymentDetails && !paymentLoading && (
                            <div className="pt-4 border-t border-green-100 mt-2 space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[8px] font-black text-green-600/50 uppercase tracking-widest">Bank / Method</p>
                                  <p className="font-bold text-green-800 text-xs">
                                    {paymentDetails.bank !== 'N/A' ? paymentDetails.bank : ''} 
                                    {paymentDetails.method.toUpperCase()}
                                    {paymentDetails.bank_account !== 'N/A' && ` (${paymentDetails.bank_account})`}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[8px] font-black text-green-600/50 uppercase tracking-widest">UPI ID (VPA)</p>
                                  <p className="font-bold text-green-800 text-xs truncate">{paymentDetails.vpa}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[8px] font-black text-green-600/50 uppercase tracking-widest">Card Details</p>
                                  <p className="font-bold text-green-800 text-xs">
                                    {paymentDetails.card ? `${paymentDetails.card.network} •••• ${paymentDetails.card.last4}` : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[8px] font-black text-green-600/50 uppercase tracking-widest">Payment Time</p>
                                  <p className="font-bold text-green-800 text-[10px]">
                                    {new Date(paymentDetails.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="pt-2 border-t border-green-100/50">
                                 <p className="text-[8px] font-black text-green-600/50 uppercase tracking-widest">Payer Name</p>
                                 <p className="font-bold text-green-800 text-xs truncate">{paymentDetails.name}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right Column: Family & Documents */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Family Information</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                            <img src={selectedAdmission.form_data?.fatherPhotoUrl || "https://via.placeholder.com/80"} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Father</p>
                            <p className="font-bold text-slate-900 text-sm truncate">{selectedAdmission.form_data?.fatherFirstName} {selectedAdmission.form_data?.fatherSurname}</p>
                            <p className="text-[9px] font-bold text-slate-400 italic uppercase truncate">{selectedAdmission.form_data?.fatherEducation}</p>
                          </div>
                          <div className="w-14 h-10 border border-slate-200 rounded-lg p-1 bg-white">
                             <img src={selectedAdmission.form_data?.fatherSignatureUrl} className="w-full h-full object-contain" title="Father Signature" />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                            <img src={selectedAdmission.form_data?.motherPhotoUrl || "https://via.placeholder.com/80"} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Mother</p>
                            <p className="font-bold text-slate-900 text-sm truncate">{selectedAdmission.form_data?.motherFirstName} {selectedAdmission.form_data?.motherSurname}</p>
                            <p className="text-[9px] font-bold text-slate-400 italic uppercase truncate">{selectedAdmission.form_data?.motherEducation}</p>
                          </div>
                          <div className="w-14 h-10 border border-slate-200 rounded-lg p-1 bg-white">
                             <img src={selectedAdmission.form_data?.motherSignatureUrl} className="w-full h-full object-contain" title="Mother Signature" />
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    {/* Documents / All photos in a grid */}
                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Uploaded Documents</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { url: selectedAdmission.form_data?.childPhotoUrl, label: "Child" },
                          { url: selectedAdmission.form_data?.fatherPhotoUrl, label: "Father" },
                          { url: selectedAdmission.form_data?.motherPhotoUrl, label: "Mother" },
                          { url: selectedAdmission.form_data?.fatherSignatureUrl, label: "F Signature" },
                          { url: selectedAdmission.form_data?.motherSignatureUrl, label: "M Signature" }
                        ].filter(doc => doc.url).map((doc, idx) => (
                          <div key={idx} className="group relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-square">
                            <img src={doc.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <a href={doc.url} target="_blank" rel="noreferrer" className="text-white text-[8px] font-black uppercase tracking-widest bg-blue-600 px-3 py-1.5 rounded-full">View</a>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-1.5 text-center pointer-events-none">
                              <p className="text-[8px] font-black text-slate-600 uppercase tracking-tighter truncate">{doc.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-8 bg-slate-50 flex justify-end gap-4 shrink-0">
                <Link 
                  to={`/admin/fees/${selectedAdmission.id}`}
                  onClick={() => setSelectedAdmission(null)}
                  className="flex items-center gap-3 bg-[#FFC107] text-[#0b2a4a] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#FFB300] transition-all shadow-xl active:scale-95"
                >
                  <Wallet size={18} /> Manage Fees
                </Link>
                <button 
                  onClick={async () => {
                    setDownloading(true);
                    await generateAdmissionPDF(selectedAdmission);
                    setDownloading(false);
                  }}
                  disabled={downloading}
                  className="flex items-center gap-3 bg-[#0E4D92] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0b2a4a] transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  <Download size={18} /> {downloading ? 'Generating...' : 'Download PDF'}
                </button>
                <button 
                  onClick={() => setSelectedAdmission(null)}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
    </AnimatePresence>
    </>
  );
};

export default ManageAdmissions;
