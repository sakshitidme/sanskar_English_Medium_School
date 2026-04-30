import React, { useState } from 'react';
import SEO from "../components/SEO";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, Smartphone, Image as ImageIcon, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { generateAdmissionPDF } from '../utils/pdfGenerator';
import { Download } from 'lucide-react';

const Admission = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentSurname: '',
    studentFirstName: '',
    studentMiddleName: '',
    fatherSurname: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherEducation: '',
    motherSurname: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherEducation: '',
    dob: '',
    email: '',
    phone: '',
    grade: '',
    category: '',
    address: '',
    pincode: '',
    childPhoto: null,
    fatherPhoto: null,
    motherPhoto: null,
    fatherSignature: null,
    motherSignature: null
  });

  const [isAutoGrade, setIsAutoGrade] = useState(false);
  
  // Image Upload States
  const [photoPreviews, setPhotoPreviews] = useState({
    childPhoto: null,
    fatherPhoto: null,
    motherPhoto: null,
    fatherSignature: null,
    motherSignature: null
  });
  const [activeDrag, setActiveDrag] = useState(null); // 'childPhoto', 'fatherPhoto', 'motherPhoto', etc.

  // OTP States
  const [feeStatus, setFeeStatus] = useState("unpaid");
  const REGISTRATION_FEE = 100; // ₹100 for admission registration
  const [otpStatus, setOtpStatus] = useState({
    isSent: false,
    isVerified: false,
    input: '',
    timer: 0,
    canResend: true
  });

  const [errors, setErrors] = useState({});
  const [topError, setTopError] = useState(''); // floating top-center error

  const showError = (msg) => {
    setTopError(msg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setTopError(''), 5000);
  };

  // Payment States
  const [paymentStatus, setPaymentStatus] = useState({
    isPaid: false,
    transactionId: null,
    loading: false
  });

  const [savedAdmission, setSavedAdmission] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Razorpay Script Loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // 1. Basic Validation for prefill
    if (!formData.phone || formData.phone.length < 10) {
      showError("Please enter a valid phone number before payment.");
      return;
    }

    setPaymentStatus(prev => ({ ...prev, loading: true }));
    const res = await loadRazorpay();

    if (!res) {
      showError('Razorpay SDK failed to load. Are you online?');
      setPaymentStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      // 2. Create Order on Backend
      const orderData = await api.createPaymentOrder(REGISTRATION_FEE);
      const { order } = orderData;
      const orderId = order.id;

      // 3. Start polling for QR payment status (if QR is used)
      let pollCount = 0;
      const maxPoll = 200; // approx 10 minutes (200 * 3s)
      const pollInterval = setInterval(async () => {
        if (pollCount >= maxPoll) {
          clearInterval(pollInterval);
          setPaymentStatus(prev => ({ ...prev, loading: false }));
          showError('Payment timeout. Please try again.');
          return;
        }
        pollCount++;
        try {
          const statusRes = await api.getPaymentStatus(orderId);
          if (statusRes.paid) {
            clearInterval(pollInterval);
            setPaymentStatus({ isPaid: true, transactionId: statusRes.paymentId, loading: false });
            alert('Payment captured via QR!');
          } else if (statusRes.failed) {
            clearInterval(pollInterval);
            setPaymentStatus(prev => ({ ...prev, loading: false }));
            showError('Payment failed or cancelled. Please try again.');
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 3000);

      const options = {
        key: 'rzp_live_SUYpNkNbUNgC9A', // Live Key provided by user
        amount: order.amount,
        currency: order.currency,
        name: "Sanskar English Medium School",
        description: "Admission Registration Fee",
        image: "/logo.png",
        order_id: orderId,
        // For QR flow, the handler may not be called. It will still work for card/UPI.
        handler: async function (response) {
          try {
            // 4. Verify Payment on Backend
            const verifyData = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: `${formData.studentFirstName} ${formData.studentSurname}`,
              phone: formData.phone,
              email: formData.email
            });

            if (verifyData.success) {
              clearInterval(pollInterval);
              setPaymentStatus({
                isPaid: true,
                transactionId: response.razorpay_payment_id,
                loading: false
              });
              alert("Payment Verified Successfully!");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed. Please contact support.");
            setPaymentStatus(prev => ({ ...prev, loading: false }));
          }
        },
        prefill: {
          name: `${formData.studentFirstName} ${formData.studentSurname}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#1A4D8D"
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus(prev => ({ ...prev, loading: false }));
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Initiation Error:", error);
      alert("Failed to initiate payment. Please try again.");
      setPaymentStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleFile = (file, fieldName) => {
    if (file && file.type.startsWith('image/')) {
      const fileSizeKiloBytes = file.size / 1024;
      if (fileSizeKiloBytes > 1024) {
        alert("File size must not exceed 1MB.");
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews(prev => ({ ...prev, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const onDragOver = (e, fieldName) => {
    e.preventDefault();
    setActiveDrag(fieldName);
  };

  const onDragLeave = () => {
    setActiveDrag(null);
  };

  const onDrop = (e, fieldName) => {
    e.preventDefault();
    setActiveDrag(null);
    const file = e.dataTransfer.files[0];
    handleFile(file, fieldName);
  };

  const handleRemovePhoto = (fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: null }));
    setPhotoPreviews(prev => ({ ...prev, [fieldName]: null }));
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months };
  };

  const validateNames = () => {
    const newErrors = {};
    const { 
      studentSurname, studentFirstName, studentMiddleName,
      fatherSurname, fatherFirstName, fatherMiddleName,
      motherSurname, motherFirstName, motherMiddleName 
    } = formData;

    // 1. All must have the SAME surname
    if (studentSurname || fatherSurname || motherSurname) {
      if (studentSurname !== fatherSurname || studentSurname !== motherSurname) {
        newErrors.surname = "Child, Father, and Mother must ALL have the SAME surname.";
      }
    }

    // 2. First names must ALL be DIFFERENT
    if (studentFirstName && fatherFirstName && motherFirstName) {
      if (studentFirstName === fatherFirstName || studentFirstName === motherFirstName || fatherFirstName === motherFirstName) {
        newErrors.firstName = "First names of Child, Father, and Mother must ALL be DIFFERENT.";
      }
    }

    // 3. Middle name rules
    // - Mother and Child can have SAME middle name
    // - BUT all three must NOT have the SAME middle name
    if (studentMiddleName && fatherMiddleName && motherMiddleName) {
      if (studentMiddleName === fatherMiddleName && studentMiddleName === motherMiddleName) {
        newErrors.middleName = "All three (Child, Father, Mother) must NOT have the SAME middle name.";
      }
    }

    // 4. DOB Year validation (Strict 4-digit YYYY)
    if (formData.dob) {
      const year = formData.dob.split('-')[0];
      if (year.length !== 4 || isNaN(year)) {
        newErrors.dob = "Birth year must be exactly 4 digits (YYYY format).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'dob' && value) {
      // value is typically YYYY-MM-DD from type="date"
      const parts = value.split('-');
      const yearStr = parts[0];
      
      // If year exceeds 4 digits, truncate it (some browsers allow more)
      if (yearStr.length > 4) {
        const truncatedValue = `${yearStr.substring(0, 4)}-${parts[1]}-${parts[2]}`;
        newFormData.dob = truncatedValue;
        newFormData[name] = truncatedValue;
      }

      const currentYear = new Date().getFullYear();
      if (yearStr.length === 4 && !isNaN(yearStr)) {
        const yearInt = parseInt(yearStr);
        // Realistic range: not in future, and not more than 100 years ago
        if (yearInt > currentYear || yearInt < currentYear - 100) {
          newFormData.age = 'Invalid Year';
        } else {
          const { years, months } = calculateAge(value);
          newFormData.age = `${years} Years, ${months} Months`;
          
          // Age-based Grade Suggestions
          let suggestedGrade = '';
          const totalMonths = (years * 12) + months;

          if (totalMonths >= 24 && totalMonths < 36) suggestedGrade = 'Playgroup';
          else if (totalMonths >= 36 && totalMonths < 48) suggestedGrade = 'Nursery';
          else if (totalMonths >= 48 && totalMonths < 60) suggestedGrade = 'Junior KG';
          else if (totalMonths >= 60 && totalMonths < 72) suggestedGrade = 'Senior KG';
          else if (totalMonths >= 72 && totalMonths < 84) suggestedGrade = 'Grade 1';
          else if (totalMonths >= 84 && totalMonths < 96) suggestedGrade = 'Grade 2';
          else if (totalMonths >= 96 && totalMonths < 108) suggestedGrade = 'Grade 3';
          else if (totalMonths >= 108 && totalMonths < 120) suggestedGrade = 'Grade 4';
          else if (totalMonths >= 120) suggestedGrade = 'Grade 5';

          if (suggestedGrade) {
            newFormData.grade = suggestedGrade;
            setIsAutoGrade(true);
            setTimeout(() => setIsAutoGrade(false), 2000);
          }
        }
      } else {
        newFormData.age = ''; // Clear age if year is invalid
      }
    }

    // Reset disability type if disability is set to no
    if (name === 'disability' && value === 'no') {
      newFormData.disabilityType = '';
    }

    setFormData(newFormData);
  };

  const handleSendOtp = async () => {
    // Basic phone number validation for 10 exact digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      await api.sendOTP(formData.phone, formData.studentFirstName);
      
      setOtpStatus({
        ...otpStatus,
        isSent: true,
        timer: 180, // Increased to 3 minutes (180 seconds)
        canResend: false
      });

      const countdown = setInterval(() => {
        setOtpStatus(prev => {
          if (prev.timer <= 1) {
            clearInterval(countdown);
            return { ...prev, timer: 0, canResend: true };
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }, 1000);
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
      console.error("OTP Send Error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await api.verifyOTP(formData.phone, otpStatus.input);
      if (response.success) {
        setOtpStatus({ ...otpStatus, isVerified: true, isSent: false });
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
      console.error("OTP Verify Error:", error);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Removed uploadFileToSupabase since we now use the /api/upload endpoint for all files in one request

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Strict Name Validation
    if (!validateNames()) {
      showError("Form contains validation errors. Please check the highlighted fields.");
      return;
    }

    // 2. Payment Verification Check
    if (!paymentStatus.isPaid) {
      showError("Please complete the Admission Registration Fee payment before submitting the form.");
      return;
    }

    // 3. Comprehensive Mandatory Field Check
    const mandatoryFields = [
      'studentSurname', 'studentFirstName', 'studentMiddleName',
      'fatherSurname', 'fatherFirstName', 'fatherMiddleName', 'fatherEducation',
      'motherSurname', 'motherFirstName', 'motherMiddleName', 'motherEducation',
      'dob', 'grade', 'category', 'phone', 'address', 'pincode',
      'fatherPhoto'
    ];

    const missingFields = mandatoryFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      showError("Please fill in all mandatory fields (marked with *).");
      return;
    }

    if (!otpStatus.isVerified) {
      showError("Please verify your phone number with OTP first.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload Images to custom backend
      const uploadData = new FormData();
      if (formData.childPhoto) uploadData.append('childPhoto', formData.childPhoto);
      if (formData.fatherPhoto) uploadData.append('fatherPhoto', formData.fatherPhoto);
      if (formData.motherPhoto) uploadData.append('motherPhoto', formData.motherPhoto);
      if (formData.fatherSignature) uploadData.append('fatherSignature', formData.fatherSignature);
      if (formData.motherSignature) uploadData.append('motherSignature', formData.motherSignature);

      let urls = {};
      // Upload mandatory and optional files
      const uploadResponse = await api.uploadAdmissionFiles(uploadData);
      urls = uploadResponse.urls;

      // 2. Prepare Final Submission Data (using URLs instead of base64)
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        transactionId: paymentStatus.transactionId,
        ...urls
      };

      // 3. Save to backend APIs
      const saved = await api.createAdmission({
         student_surname: formData.studentSurname,
         student_first_name: formData.studentFirstName,
         student_middle_name: formData.studentMiddleName,
         dob: formData.dob,
         grade: formData.grade,
         phone: formData.phone,
         email: formData.email,
         category: formData.category,
         form_data: submissionData, // JSON containing all details and image URLs
         status: 'pending'
      });

      setSavedAdmission(saved);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Removed immediate redirect to allow download
      // setTimeout(() => navigate('/contact'), 3000);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 pencil-cursor">
      {/* Floating top-center error banner */}
      <AnimatePresence>
        {topError && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md w-[90%] text-sm font-bold"
          >
            <span className="text-xl">⚠️</span>
            <span>{topError}</span>
            <button onClick={() => setTopError('')} className="ml-auto text-white/80 hover:text-white text-lg leading-none">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
      <SEO 
        title="Admission"
        description="Admission open for 2026-27. Apply now for Nursery to Grade 10 at Sanskar English Medium School."
        keywords="admission, school admission, apply online, school fees, enrollment"
      />
      <div className="max-w-[1000px] w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border-t-4 border-[#0E4D92]">
        
        {/* Header Section */}
        <div className="bg-[#1A4D8D] py-8 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#FFC107] tracking-wider uppercase drop-shadow-lg"
          >
             Admission Form
          </motion.h1>
          <p className="text-blue-100 mt-2 text-base md:text-xl font-light italic">Join the Sanskar Family & Build Your Future</p>
        </div>

        {/* Form Section */}
        <div className="p-4 sm:p-8 md:p-12">
          {submitSuccess ? (
            <div className="text-center py-12 space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle size={48} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Application Submitted!</h2>
                <p className="text-gray-500 mt-2 font-bold italic">Thank you for choosing Sanskar English Medium School.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={async () => {
                    setDownloading(true);
                    await generateAdmissionPDF(savedAdmission);
                    setDownloading(false);
                  }}
                  disabled={downloading}
                  className="flex items-center gap-3 bg-[#0E4D92] text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#0b2a4a] transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  <Download size={24} /> {downloading ? 'Generating...' : 'Download Form PDF'}
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                >
                  Go to Contact Page
                </button>
              </div>
              
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-8">
                A copy of your application has been recorded in our system.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Student Name Section */}
            <div className='pb-4'>
              <label className="block text-[#1A4D8D] font-bold text-sm mb-2 text-center underline uppercase">Student's Full Name <span className="text-red-500">*</span></label>
              {errors.surname && <p className="text-red-500 text-[10px] text-center mb-2 font-bold">{errors.surname}</p>}
              {errors.firstName && <p className="text-red-500 text-[10px] text-center mb-2 font-bold">{errors.firstName}</p>}
              {errors.middleName && <p className="text-red-500 text-[10px] text-center mb-2 font-bold">{errors.middleName}</p>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="studentSurname"
                    value={formData.studentSurname}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors text-sm font-bold placeholder:text-gray-400 ${
                      !formData.studentSurname && submitting ? 'border-red-500 bg-red-50' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'
                    }`}
                    placeholder="SURNAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors text-sm font-bold placeholder:text-gray-400 ${
                      !formData.studentFirstName && submitting ? 'border-red-500 bg-red-50' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'
                    }`}
                    placeholder="FIRST NAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="studentMiddleName"
                    value={formData.studentMiddleName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors text-sm font-bold placeholder:text-gray-400 ${
                      !formData.studentMiddleName && submitting ? 'border-red-500 bg-red-50' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'
                    }`}
                    placeholder="MIDDLE NAME"
                  />
                </div>
              </div>
            </div>

            {/* father Name Section */}
            <div className='pb-4'>
              <label className="block text-[#1A4D8D] font-bold text-sm mb-2 text-center underline uppercase">Father's Full Name <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="text"
                    name="fatherSurname"
                    value={formData.fatherSurname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="SURNAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="fatherFirstName"
                    value={formData.fatherFirstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="FIRST NAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="fatherMiddleName"
                    value={formData.fatherMiddleName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="MIDDLE NAME"
                  />
                </div>
                <div>
                  <select
                    name="fatherEducation"
                    value={formData.fatherEducation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold bg-white text-gray-700"
                  >
                    <option value="" disabled>EDUCATION</option>
                    <option value="Primary Education">Primary Education</option>
                    <option value="Secondary Education">Secondary Education</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Illiterate">Illiterate</option>
                  </select>
                </div>
              </div>
            </div>
  

          {/* Mother Name Section */}
            <div className='pb-4'>
              <label className="block text-[#1A4D8D] font-bold text-sm mb-2 text-center underline uppercase">Mother's Full Name <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="text"
                    name="motherSurname"
                    value={formData.motherSurname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="SURNAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="motherFirstName"
                    value={formData.motherFirstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="FIRST NAME"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="motherMiddleName"
                    value={formData.motherMiddleName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold placeholder:text-gray-400"
                    placeholder="MIDDLE NAME"
                  />
                </div>
                <div>
                  <select
                    name="motherEducation"
                    value={formData.motherEducation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors text-sm font-bold bg-white text-gray-700"
                  >
                    <option value="" disabled>EDUCATION</option>
                    <option value="Primary Education">Primary Education</option>
                    <option value="Secondary Education">Secondary Education</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Illiterate">Illiterate</option>
                    <option value="Housewife">Housewife</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DOB and Grade Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              <div>
                <label htmlFor="dob" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-all text-sm font-bold ${errors.dob ? 'border-red-500 ring-red-100' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'}`}
                />
                {errors.dob && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.dob}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight">Auto-calculated Age</label>
                  <input
                    type="text"
                    value={formData.age || ''}
                    readOnly
                    placeholder="Enter DOB first"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-bold text-gray-600 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="grade" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight">
                    Applying For Grade <span className="text-red-500">*</span>
                    {isAutoGrade && <span className="ml-2 text-green-600 text-[10px] animate-pulse">(Auto-filled)</span>}
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-all bg-white text-sm font-bold ${
                      isAutoGrade ? 'border-green-500 ring-2 ring-green-100 shadow-lg' : 'border-blue-200 focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]'
                    }`}
                  >
                    <option value="">Select a grade</option>
                    <option value="Playgroup">Playgroup (2-3 Years)</option>
                    <option value="Nursery">Nursery (3-4 Years)</option>
                    <option value="Junior KG">Junior KG (4-5 Years)</option>
                    <option value="Senior KG">Senior KG (5-6 Years)</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Disability and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              <div>
                <label className="block text-[#1A4D8D] font-bold text-sm mb-2 uppercase tracking-tight">Disability <span className="text-red-500">*</span></label>
                <div className="flex gap-4 items-center h-[42px]">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="disability"
                      value="yes"
                      checked={formData.disability === 'yes'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-[#E91E63] border-blue-200 focus:ring-[#E91E63]"
                    />
                    <span className="ml-2 text-sm font-bold text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="disability"
                      value="no"
                      checked={formData.disability === 'no'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-[#E91E63] border-blue-200 focus:ring-[#E91E63]"
                    />
                    <span className="ml-2 text-sm font-bold text-gray-700">No</span>
                  </label>
                </div>
                {formData.disability === 'yes' && (
                  <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <select
                      name="disabilityType"
                      value={formData.disabilityType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-[#E91E63] focus:outline-none focus:ring-1 focus:ring-[#E91E63] transition-colors bg-white text-sm font-bold"
                    >
                      <option value="">Select Disability Type</option>
                      <option value="Physical disabilities">Physical disabilities</option>
                      <option value="Behavioral Disabilities">Behavioral Disabilities</option>
                      <option value="Developmental Disabilities">Developmental Disabilities</option>
                      <option value="Sensory Disabilities">Sensory Disabilities</option>
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="category" className="block text-[#1A4D8D] font-bold text-sm mb-2 uppercase tracking-tight">Category <span className="text-red-500">*</span></label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none focus:ring-1 focus:ring-[#FFC107] transition-colors bg-white text-sm font-bold"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="NT/DT">VJNT</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>


            {/* Photo Uploads Grid */}
            <div className="pt-10 pb-6 border-t border-blue-50 mt-4">
              <div className="mb-12">
                <label className="block text-[#1A4D8D] font-black text-sm mb-4 uppercase tracking-[0.25em] text-center">
                   1. Passport Size Photos
                </label>
                <div className="grid grid-cols-3 gap-3 md:gap-10 max-w-5xl mx-auto px-2 md:px-4">
                  {[
                    { id: 'childPhoto', label: "Child",required: true },
                    { id: 'fatherPhoto', label: "Father", required: true },
                    { id: 'motherPhoto', label: "Mother",required: true }
                  ].map((upload) => (
                    <div key={upload.id} className="space-y-2 md:space-y-4">
                      <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1 md:gap-2 text-center ${
                        upload.required && !formData[upload.id] && submitting ? 'text-red-500' : 'text-[#1A4D8D]'
                      }`}>
                        <ImageIcon size={12} className={upload.required && !formData[upload.id] && submitting ? 'text-red-400' : 'text-blue-400'} /> {upload.label} {upload.required && <span className="text-red-500">*</span>}
                      </p>
                      
                      <motion.div
                        onDragOver={(e) => onDragOver(e, upload.id)}
                        onDragLeave={onDragLeave}
                        onDrop={(e) => onDrop(e, upload.id)}
                        className={`relative border-2 border-dashed rounded-xl md:rounded-3xl transition-all h-32 md:h-52 flex flex-col items-center justify-center p-2 md:p-6 cursor-pointer overflow-hidden group hover:shadow-xl ${
                          activeDrag === upload.id 
                            ? 'border-[#FFC107] bg-yellow-50 scale-[1.05] shadow-2xl z-50' 
                            : photoPreviews[upload.id] ? 'border-green-400 bg-green-50/30' : 'border-blue-100 bg-slate-50/30 hover:bg-white hover:border-blue-300'
                        }`}
                      >
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFile(e.target.files[0], upload.id)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />

                        {photoPreviews[upload.id] ? (
                          <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 md:gap-3">
                            <img 
                              src={photoPreviews[upload.id]} 
                              alt={`${upload.label} Preview`} 
                              className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-lg md:rounded-2xl shadow-xl border-2 md:border-4 border-white ring-1 ring-black/5" 
                            />
                            <p className="text-[8px] md:text-[10px] font-black text-green-600 flex items-center justify-center gap-1 uppercase tracking-widest bg-white/80 py-0.5 md:py-1 px-2 md:px-3 rounded-full shadow-sm">
                              <CheckCircle size={10} className="md:size-3" /> Verified
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto(upload.id);
                              }}
                              className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-2 bg-white rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-all z-30 border border-gray-100 active:scale-90"
                            >
                              <X size={12} className="md:size-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center group">
                            <motion.div 
                              animate={{ 
                                y: activeDrag === upload.id ? -8 : 0,
                                scale: activeDrag === upload.id ? 1.1 : 1
                              }}
                              className={`mx-auto mb-2 md:mb-4 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                activeDrag === upload.id ? 'bg-[#FFC107] text-white' : 'bg-blue-50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                              }`}
                            >
                              <Upload size={20} className="md:size-7" />
                            </motion.div>
                            <p className="text-[8px] md:text-sm font-black text-gray-700 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">
                              {activeDrag === upload.id ? 'Drop!' : 'Upload'}
                            </p>
                            <p className="hidden md:block text-[10px] text-gray-400 mt-2 font-bold tracking-tight px-4 opacity-70">
                              1 MB
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#1A4D8D] font-black text-sm mb-4 uppercase tracking-[0.25em] text-center">
                   2. Parent Signatures
                </label>
                <div className="grid grid-cols-2 gap-4 md:gap-10 max-w-3xl mx-auto px-2 md:px-4">
                  {[
                    { id: 'fatherSignature', label: "Father's Sign", optional: true },
                    { id: 'motherSignature', label: "Mother's Sign", optional: true }
                  ].map((upload) => (
                    <div key={upload.id} className="space-y-2 md:space-y-4">
                      <div className="flex flex-col items-center">
                        <p className="text-[10px] md:text-xs font-black text-[#1A4D8D] uppercase tracking-widest flex items-center justify-center gap-1 md:gap-2 text-center">
                          <ImageIcon size={12} className="text-blue-400" /> {upload.label} {upload.required && <span className="text-red-500">*</span>}
                        </p>
                        {upload.optional && (
                          <p className="text-[7px] md:text-[9px] text-blue-400 font-bold lowercase italic opacity-80 mt-0.5">
                          optional
                          </p>
                        )}
                      </div>
                      
                      <motion.div
                        onDragOver={(e) => onDragOver(e, upload.id)}
                        onDragLeave={onDragLeave}
                        onDrop={(e) => onDrop(e, upload.id)}
                        className={`relative border-2 border-dashed rounded-xl md:rounded-3xl transition-all h-24 md:h-40 flex flex-col items-center justify-center p-2 md:p-6 cursor-pointer overflow-hidden group hover:shadow-xl ${
                          activeDrag === upload.id 
                            ? 'border-[#FFC107] bg-yellow-50 scale-[1.05] shadow-2xl z-50' 
                            : photoPreviews[upload.id] ? 'border-green-400 bg-green-50/30' : 'border-blue-100 bg-slate-50/30 hover:bg-white hover:border-blue-300'
                        }`}
                      >
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFile(e.target.files[0], upload.id)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />

                        {photoPreviews[upload.id] ? (
                          <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 md:gap-3">
                            <img 
                              src={photoPreviews[upload.id]} 
                              alt={`${upload.label} Preview`} 
                              className="w-full h-12 md:h-24 object-contain rounded-lg md:rounded-xl shadow-lg border-2 border-white bg-white/50" 
                            />
                            <p className="text-[8px] md:text-[10px] font-black text-green-600 flex items-center justify-center gap-1 uppercase tracking-widest bg-white/80 py-0.5 md:py-1 px-2 md:px-3 rounded-full shadow-sm">
                              <CheckCircle size={10} className="md:size-3" /> Added
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto(upload.id);
                              }}
                              className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-2 bg-white rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-all z-30 border border-gray-100 active:scale-90"
                            >
                              <X size={12} className="md:size-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center group">
                            <motion.div 
                              animate={{ 
                                y: activeDrag === upload.id ? -6 : 0,
                                scale: activeDrag === upload.id ? 1.1 : 1
                              }}
                              className={`mx-auto mb-2 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                activeDrag === upload.id ? 'bg-[#FFC107] text-white' : 'bg-blue-50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                              }`}
                            >
                              <Upload size={16} className="md:size-6" />
                            </motion.div>
                            <p className="text-[8px] md:text-xs font-black text-gray-700 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">
                              {activeDrag === upload.id ? 'Drop!' : 'Upload Sign'}
                            </p>
                            <p className="hidden md:block text-[9px] text-gray-400 mt-1 font-bold tracking-tight px-4 opacity-70">
                              1 MB
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Permanent Address & Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-4">
              <div className="md:col-span-3">
                <label htmlFor="address" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight">Full Permanent Address <span className="text-red-500">*</span></label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors text-sm font-bold placeholder:text-gray-400 resize-none ${
                    !formData.address && submitting ? 'border-red-500 bg-red-50' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'
                  }`}
                  placeholder="STREET, CITY, TALUKA, DISTRICT"
                ></textarea>
              </div>
              <div className="md:col-span-1">
                <label htmlFor="pincode" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight">Pincode <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  required
                  maxLength="6"
                  placeholder="422XXX"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors text-sm font-bold ${
                    !formData.pincode && submitting ? 'border-red-500 bg-red-50' : 'border-blue-200 focus:border-[#FFC107] focus:ring-[#FFC107]'
                  }`}
                />
              </div>
            </div>
            {/* Grid for Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
              <div>
                <label htmlFor="email" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight flex flex-col">
                  <span>Email Address <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-100 focus:border-[#FFC107] focus:outline-none focus:ring-2 focus:ring-[#FFC107]/20 transition-all text-sm font-bold shadow-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="phone" className="block text-[#1A4D8D] font-bold text-sm mb-1 uppercase tracking-tight flex items-center gap-2">
                    <Smartphone size={16} /> Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, ''); // Allow only digits
                          if (val.length <= 10) {
                            handleChange({ target: { name: 'phone', value: val } });
                          }
                        }}
                        required
                        maxLength="10"
                        pattern="[0-9]{10}"
                        disabled={otpStatus.isVerified}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all text-sm font-bold pr-10 ${
                          otpStatus.isVerified ? 'border-green-500 bg-green-50 shadow-inner' : 'border-blue-200 focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 shadow-sm'
                        }`}
                        placeholder="10-digit Mobile Number"
                      />
                      {otpStatus.isVerified && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                          <CheckCircle size={20} />
                        </span>
                      )}
                    </div>
                    {!otpStatus.isVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!otpStatus.canResend || !formData.phone || formData.phone.length < 10}
                        className={`px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap min-w-[140px] ${
                          !otpStatus.canResend
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                            : 'bg-[#1A4D8D] text-white hover:bg-[#0E4D92] hover:shadow-lg'
                        }`}
                      >
                        {otpStatus.timer > 0 ? `Resend In ${otpStatus.timer}s` : 'Send OTP'}
                      </button>
                    )}
                  </div>

                  {/* OTP Verification UI Fixes */}
                  <AnimatePresence>
                    {otpStatus.isSent && !otpStatus.isVerified && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-200 backdrop-blur-sm overflow-hidden"
                      >
                         <div className="text-center mb-3">
                          <p className="text-xs md:text-sm text-blue-800 font-bold uppercase tracking-tight break-words px-2 leading-relaxed">
                            Verification SMS Sent to <span className="text-[#0E4D92]">{formData.phone}</span>
                          </p>
                          <p className="text-[10px] text-blue-500 mt-1 font-medium">Please enter the 6-digit code</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            maxLength="6"
                            value={otpStatus.input}
                            onChange={(e) => setOtpStatus({ ...otpStatus, input: e.target.value.replace(/\D/g, '') })}
                            className="flex-1 px-4 py-3 rounded-lg border border-blue-200 focus:border-[#FFC107] focus:outline-none text-center tracking-[0.8em] font-bold text-xl shadow-sm bg-white"
                            placeholder="000000"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="bg-[#FFC107] text-[#1A4D8D] px-4 sm:px-8 py-3 rounded-lg font-black text-xs sm:text-sm hover:bg-[#FFB300] transition-all shadow-md active:scale-95 uppercase flex items-center justify-center min-w-[80px]"
                          >
                            Verify
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Registration Fee Section */}
            <div className="pt-8 border-t border-blue-100">
              <div className="bg-slate-50 rounded-2xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">Admission Registration Fee</h4>
                    <p className="text-sm text-gray-500 font-medium">Secure your admission process by paying the one-time registration fee.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="text-center md:text-right px-4">
                      <span className="text-3xl font-black text-slate-900">₹{REGISTRATION_FEE}.00</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Inclusive of taxes</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={paymentStatus.loading || paymentStatus.isPaid}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                      paymentStatus.isPaid 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-[#FFC107] text-[#1A4D8D] hover:bg-[#FFB300] hover:shadow-lg'
                    }`}
                  >
                    {paymentStatus.loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#1A4D8D] border-t-transparent rounded-full animate-spin"></div>
                        Wait...
                      </div>
                    ) : paymentStatus.isPaid ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} />
                        Fee Paid
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </div>
              </div>
              
              {paymentStatus.isPaid && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center"
                >
                  <p className="text-xs font-bold text-green-700">
                    Payment Successful! Transaction ID: <span className="font-mono">{paymentStatus.transactionId}</span>
                  </p>
                </motion.div>
              )}
            </div>

            <div className="flex justify-center pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={submitting}
                className={`px-12 py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center gap-3 active:scale-95 ${
                  submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1A4D8D] text-white hover:bg-[#0E4D92]'
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Admition Form'
                )}
              </motion.button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admission;
