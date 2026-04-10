import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Search, Download, Clock, Mail, Phone } from "lucide-react";
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

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await api.getContacts();
      setContacts(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (contacts.length === 0) return;
    
    const headers = ["ID", "Date", "Name", "Email", "Phone", "Type", "Subject", "Message"];
    const rows = contacts.map(c => [
      c.id,
      new Date(c.createdAt || c.created_at).toLocaleDateString(),
      c.name,
      c.email,
      c.phone,
      c.enquiry_type,
      c.subject,
      c.message?.replace(/,/g, " ")
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm) ||
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 lg:p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 shrink-0">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 lg:py-4 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-xs lg:text-sm placeholder:text-slate-300"
          />
        </div>
        <button 
          onClick={exportToCSV}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#0E4D92] text-white px-5 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest hover:bg-[#0b2a4a] transition-all shadow-lg active:scale-95"
        >
          <Download size={16} className="lg:w-[18px]" /> Export Contacts
        </button>
      </div>

      <div className="p-4 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 overflow-y-auto flex-grow custom-scrollbar">
        {loading ? (
          <p className="col-span-full text-center py-20 text-slate-400 font-bold">Fetching messages...</p>
        ) : filteredContacts.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-400 font-bold">No messages found.</p>
        ) : (
          filteredContacts.map((c) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-100 text-[#0E4D92] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                  {c.enquiry_type || "General"}
                </span>
                <span className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                  <Clock size={10} /> {new Date(c.createdAt || c.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <h4 className="font-black text-slate-900 text-lg tracking-tight mb-4 group-hover:text-[#0E4D92] transition-colors">
                <HighlightText text={c.name} highlight={searchTerm} />
              </h4>
              
              <div className="space-y-3 mb-6">
                <a 
                  href={`mailto:${c.email}`} 
                  className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0E4D92] transition-colors group/link"
                >
                  <Mail size={14} className="text-slate-500 group-hover/link:text-[#0E4D92]" /> {c.email}
                </a>
                <a 
                  href={`tel:${c.phone}`} 
                  className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0E4D92] transition-colors group/link"
                >
                  <Phone size={14} className="text-slate-500 group-hover/link:text-[#0E4D92]" /> {c.phone}
                </a>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 flex-grow">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">
                  Subject: <HighlightText text={c.subject} highlight={searchTerm} />
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold italic">"{c.message}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-right">
                <button className="text-[10px] font-black text-[#0E4D92] uppercase tracking-[0.2em] hover:text-[#0b2a4a]">
                  Mark as Read ➜
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageContacts;
