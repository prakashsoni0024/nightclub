"use client";

import { useState } from "react";
import { loginAdmin } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter credentials");
      return;
    }

    try {
      setLoading(true);

      const data = await loginAdmin({ email, password });

      localStorage.setItem("token", data.token);

      toast.success("Welcome Admin 🔥");

      setTimeout(() => {
        router.push("/admin");
      }, 700);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black overflow-hidden relative">

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      {/* 🌈 Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-pink-500/30 blur-[160px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 blur-[160px] rounded-full bottom-[-200px] right-[-200px] animate-pulse" />
        <div className="absolute w-full h-full opacity-[0.05] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* LEFT SIDE - BRAND */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center"
        >
          <h1 className="text-7xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            NOIR
          </h1>

          <p className="text-gray-400 mt-6 tracking-[0.3em] uppercase text-sm">
            Nightclub Control System
          </p>

          <div className="mt-10 text-gray-500 text-sm space-y-2">
            <p>✦ VIP Management</p>
            <p>✦ Event Control</p>
            <p>✦ Live Analytics</p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - LOGIN */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative"
        >

          {/* floating glow frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-[40px]" />

          <div className="relative z-10 backdrop-blur-2xl bg-black/40 border border-white/10 rounded-[40px] p-10">

            <h2 className="text-4xl font-black uppercase tracking-[0.2em] mb-2">
              Admin
            </h2>

            <p className="text-gray-400 text-sm mb-8">
              Secure Access Panel
            </p>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full p-4 mb-4
              bg-black/50
              border border-white/10
              rounded-2xl
              outline-none
              focus:border-pink-500
              transition
              "
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full p-4 mb-6
              bg-black/50
              border border-white/10
              rounded-2xl
              outline-none
              focus:border-cyan-500
              transition
              "
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full py-4 rounded-2xl
              font-bold uppercase tracking-[0.15em]
              bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
              text-black
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              <span className="flex items-center justify-center gap-3">
                {loading && (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Authenticating..." : "Enter Dashboard"}
              </span>
            </button>

          </div>
        </motion.form>
      </div>
    </div>
  );
}