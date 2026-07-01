"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateProfile } from "@/services/authService";

export default function AccountSettings() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword) {
      return toast.error("Current password is required");
    }

    if (form.newPassword && form.newPassword.length < 8) {
      return toast.error("New password must be at least 8 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!form.newEmail && !form.newPassword) {
      return toast.error("Update your email or password.");
    }

    try {
      setLoading(true);

      const res = await updateProfile({
        currentPassword: form.currentPassword,
        newEmail: form.newEmail,
        newPassword: form.newPassword,
      });

      toast.success(res.message);

      localStorage.removeItem("token");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Settings" className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 rounded-full bg-gradient-to-b from-pink-500 to-cyan-400" />

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-pink-400">
            Security
          </p>

          <h2 className="text-3xl font-black uppercase">Account Settings</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full p-4 pr-14 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-pink-500 transition"
          />

          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <input
          type="email"
          name="newEmail"
          placeholder="New Email"
          value={form.newEmail}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 outline-none"
        />

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full p-4 pr-14 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-pink-500 transition"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-4 pr-14 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-pink-500 transition"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="
    px-8
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-pink-500
    to-cyan-400
    text-black
    font-bold
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
        >
          {loading ? "Updating..." : "Update Account"}
        </button>
      </form>
    </section>
  );
}
