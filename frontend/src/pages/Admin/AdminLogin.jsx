import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.login({ email, password });
      
      // Store token in localStorage
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminId', response._id);

      // Successful login
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0E4D92] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 font-bold mt-2 text-sm uppercase tracking-widest">Sanskar School EMS</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold placeholder:text-slate-300"
                placeholder="admin@sanskar.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0E4D92] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold placeholder:text-slate-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0E4D92] text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "SIGN IN TO PANEL"}
          </button>
        </form>

        <p className="text-center mt-10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Admin Management System
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
