import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

import { api } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentName: "",
    classGrade: "",
    enquiryType: "",
    contactTime: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    
    // Construct WhatsApp message
    const message = `*New School Inquiry - Sanskar English Medium School*

*Parent/Guardian:* ${formData.name}
*Child's Name:* ${formData.studentName || "N/A"}
*Mobile:* ${formData.phone}
*Email:* ${formData.email}

*Enquiry Details:*
- *Type:* ${formData.enquiryType}
- *Class:* ${formData.classGrade || "N/A"}
- *Preferred Time:* ${formData.contactTime || "N/A"}
- *Subject:* ${formData.subject}

*Message:*
${formData.message}`;

    const phoneNumber = "919850798962";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Save to Supabase (for Admin Dashboard)
    const saveToSupabase = async () => {
      try {
        await api.createContact({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          enquiry_type: formData.enquiryType
        });
      } catch (err) {
        console.error("API Contact Error:", err);
      }
    };
    saveToSupabase();

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      studentName: "",
      classGrade: "",
      enquiryType: "",
      contactTime: "",
      subject: "",
      message: "",
    });
    console.log("Form submitted and redirected to WhatsApp with school data");
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-podar-blue" />,
      title: "Our Location",
      details: [
        "Vitthal Park, Kranti Nagar,",
        "Makhmalabad Road, Panchavati,",
        "Nashik - 422003"
      ],
      color: "bg-blue-50",
    },
    {
      icon: <Phone className="w-8 h-8 text-podar-blue" />,
      title: "Contact WhatsApp",
      details: ["+91 98507 98962"],
      label: "Instant + Free",
      color: "bg-green-50",
      isWhatsApp: true
    },
    {
      icon: <Phone className="w-8 h-8 text-podar-blue" />,
      title: "Phone Number",
      details: ["98507 98962","98906 33962","0253-2313162"],
      color: "bg-yellow-50",
    },
    {
      icon: <Mail className="w-8 h-8 text-podar-blue" />,
      title: "Email Address",
      details: ["officialsanskarschool@gmail.com"],
      color: "bg-green-50",
    },
    {
      icon: <Clock className="w-8 h-8 text-podar-blue" />,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 4:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      color: "bg-pink-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO 
        title="Contact Us"
        description="Get in touch with Sanskar English Medium School. Address, Phone, Email, and Location Map."
        keywords="contact school, address, phone number, email, admission inquiry, visit us, location"
      />
      {/* Hero Section */}
    
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              ...contactInfo[0],
              border: "border-b-blue-600",
              lightBg: "bg-blue-50/30"
            },
            {
              ...contactInfo[1],
              border: "border-b-yellow-500",
              lightBg: "bg-yellow-50/30"
            },
            {
              ...contactInfo[2],
              border: "border-b-green-600",
              lightBg: "bg-green-50/30"
            },
            {
              ...contactInfo[3],
              border: "border-b-pink-600",
              lightBg: "bg-pink-50/30"
            }
          ].map((item, index) => {
            const isLocation = item.title === "Our Location";
            const isWhatsApp = item.isWhatsApp;
            const isPhone = item.title === "Phone Number";
            const isEmail = item.title === "Email Address";
            
            let cardHref = "";
            if (isLocation) cardHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sanskar English Medium School Vitthal Park Kranti Nagar Makhmalabad Road Panchavati Nashik")}`;
            else if (isWhatsApp) cardHref = `https://wa.me/919850798962`;
            else if (isPhone) cardHref = `tel:${item.details[0].trim().replace(/[\s-]/g, "")}`;
            else if (isEmail) cardHref = `mailto:${item.details[0].trim()}`;

            return (
              <motion.a
                key={index}
                href={cardHref}
                target={isLocation || isWhatsApp ? "_blank" : undefined}
                rel={isLocation || isWhatsApp ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border-b-8 ${item.border} relative overflow-hidden block group`}
              >
                {item.label && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider animate-pulse">
                    {item.label}
                  </div>
                )}
                <div className={`mb-6 w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-podar-blue transition-colors">
                  {item.title}
                </h3>
                <div className="space-y-3 mt-8">
                  <div className="bg-green-50 text-slate-900 p-4 rounded-2xl border-2 border-green-100 group-hover:border-green-300 group-hover:bg-green-100 transition-all font-bold text-base shadow-sm">
                    {item.details.map((line, i) => (
                      <p 
                        key={i} 
                        className={`${isEmail ? 'text-xs md:text-sm break-all text-blue-600 hover:underline' : 'text-sm md:text-base'} transition-all`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                {isWhatsApp && (
                  <div className="mt-4 w-full bg-[#0E4D92] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 border-white/20 transition-all shadow-md group-hover:bg-blue-700">
                    Chat Now
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-2 border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-podar-blue rounded-xl flex items-center justify-center text-white shadow-lg">
                <Send className="w-6 h-6" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 font-hand">
                Send us a Message
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Your Name (Parent/Guardian)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength="10"
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="10 digit mobile number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Child's full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Class/Grade
                  </label>
                  <select
                    name="classGrade"
                    value={formData.classGrade}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Select Class</option>
                    <option value="Playgroup">Playgroup</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Jr. KG">Jr. KG</option>
                    <option value="Sr. KG">Sr. KG</option>
                    <option value="1st Standard">1st Standard</option>
                    </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Enquiry Type
                  </label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Select Enquiry Type</option>
                    <option value="Admission Enquiry">Admission Enquiry</option>
                    <option value="Fee Information">Fee Information</option>
                    <option value="Academic Query">Academic Query</option>
                    <option value="Transport Facility">Transport Facility</option>
                    <option value="Curriculum Information">Curriculum Information</option>
                    <option value="General Information">General Information</option>
                    <option value="Complaint/Feedback">Complaint/Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Preferred Contact Time
                  </label>
                  <select
                    name="contactTime"
                    value={formData.contactTime}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Any Time</option>
                    <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Brief objective"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-900 font-extrabold text-sm uppercase tracking-wider ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-podar-blue focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none shadow-sm text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#0E4D92] text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition-all tracking-wide border-2 border-white/20"
                style={{ backgroundColor: "#0E4D92" }}
              >
                <Send className="w-6 h-6" /> Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[500px] bg-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white group"
          >
            <div className="absolute inset-0 bg-podar-blue/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
            <iframe
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000.00!2d73.784!3d20.038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddec97f7459395%3A0xc3f6d73539a2b6d1!2sKranti%20Nagar%2C%20Makhmalabad%20Rd%2C%20Nashik%2C%20Maharashtra%20422003!5e0!3m2!1sen!2sin!4v1707050000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
