"use client";

import { useState } from "react";
import { Mail, Loader2, Lock, Eye, EyeOff, User, ChevronDown, ClipboardList, ShieldCheck } from "lucide-react";
import Link from "next/link";
import RoleDropDown from "./ui/dropDownRole";

export default function SingupComponent() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassw, setShowPassw] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Registrati
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* username */}
        <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
          <User size={20} className="text-neutral-500 dark:text-neutral-400" />
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            required
          />
        </div>

        {/* email */}
        <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
          <Mail size={20} className="text-neutral-500 dark:text-neutral-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            required
          />
        </div>

        {/* role */}
        <RoleDropDown
          value={formData.role}
          onChange={(role) => setFormData({ ...formData, role })}
        />

        {/* password */}
        <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
          <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
          <input
            type={showPassw ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            required
          />
          <button onClick={() => setShowPassw(!showPassw)} type="button">
            {showPassw ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {(error && error.length > 0) && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg px-4 py-2 transition disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="text-sm text-center mt-8">Hai un&apos;Account? <Link href="/auth/login" className="text-sm text-amber-400">Accedi</Link></p>
    </div>
  );
}
