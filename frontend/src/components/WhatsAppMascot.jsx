import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chhotaBheemGif from "../assets/images/home/hello-chhota-bheem.gif";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "919850798962";

const CLASSES = [
  "Playgroup", "Nursery", "Junior KG", "Senior KG",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
];

const ENQUIRY_TYPES = [
  "Admission Enquiry",
  "Fee Structure",
  "School Timings",
  "Transport Facility",
  "Other",
];

const CONTACT_TIMES = [
  "Any Time",
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 3pm)",
  "Evening (3pm - 6pm)",
];

const initialForm = {
  parentName: "",
  phone: "",
  studentName: "",
  grade: "",
  enquiryType: "",
  contactTime: "Any Time",
  email: "",
  subject: "",
  message: "",
};

const WhatsAppMascot = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 200;
      setIsNearBottom(scrollPosition > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => {
    setShowBubble(false);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, phone: digits }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const msg =
      `Enquiry from Sanskar School Website\n\n` +
      `Parent Name: ${form.parentName}\n` +
      `Phone: ${form.phone}\n` +
      `Student Name: ${form.studentName}\n` +
      `Class/Grade: ${form.grade || "Not specified"}\n` +
      `Enquiry Type: ${form.enquiryType || "Not specified"}\n` +
      `Preferred Contact Time: ${form.contactTime}\n` +
      `Email: ${form.email || "Not provided"}\n` +
      `Subject: ${form.subject || "Not provided"}\n` +
      `Message: ${form.message || "-"}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setShowForm(false);
    setForm(initialForm);
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#25D366] text-sm font-medium bg-white transition-colors";
  const labelCls = "block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide";

  return (
    <>
      {/* Enquiry Popup Form */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[998] backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            {/* Form Panel */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="fixed bottom-6 right-6 z-[999] w-[340px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100"
            >
              {/* Header */}
              <div className="bg-[#25D366] px-5 py-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <p className="text-white font-black text-sm">Quick Enquiry</p>
                    <p className="text-white/80 text-[10px]">We'll reply on WhatsApp</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSend} className="p-5 space-y-3">
                {/* Parent Name */}
                <div>
                  <label className={labelCls}>Your Name (Parent/Guardian) <span className="text-red-500">*</span></label>
                  <input
                    name="parentName"
                    value={form.parentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className={inputCls}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelCls}>Phone Number <span className="text-red-500">*</span></label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="10 digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={inputCls}
                  />
                </div>

                {/* Student Name */}
                <div>
                  <label className={labelCls}>Student Name <span className="text-red-500">*</span></label>
                  <input
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
                    required
                    placeholder="Child's full name"
                    className={inputCls}
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className={labelCls}>Class / Grade</label>
                  <select name="grade" value={form.grade} onChange={handleChange} className={inputCls}>
                    <option value="">Select Class</option>
                    {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className={labelCls}>Enquiry Type</label>
                  <select name="enquiryType" value={form.enquiryType} onChange={handleChange} className={inputCls}>
                    <option value="">Select Enquiry Type</option>
                    {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Contact Time */}
                <div>
                  <label className={labelCls}>Preferred Contact Time</label>
                  <select name="contactTime" value={form.contactTime} onChange={handleChange} className={inputCls}>
                    {CONTACT_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputCls}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className={labelCls}>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief objective"
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us more about your inquiry..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Send Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-colors shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Mascot */}
      <motion.div
        className="fixed right-6 z-50 flex items-end flex-col gap-2 pointer-events-none"
        animate={{ bottom: isNearBottom ? "120px" : "24px" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg border-2 border-[#1A4D8D] mb-[-10px] mr-8 relative pointer-events-auto cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={handleOpen}
            >
              <p className="text-[#1A4D8D] font-bold text-sm whitespace-nowrap">Ask me! 👋</p>
              <div className="absolute -bottom-[8px] right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#1A4D8D]" />
              <div className="absolute -bottom-[5px] right-[2px] w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Image */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer pointer-events-auto filter drop-shadow-xl"
          onClick={handleOpen}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img
            src={chhotaBheemGif}
            alt="WhatsApp Assistant"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default WhatsAppMascot;
