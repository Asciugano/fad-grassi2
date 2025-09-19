"use client";

import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassw, setShowPassw] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post('/api/auth/login', formData);

      router.push('/');
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;

      if (err.response?.data.message)
        setError(err.response.data.message);
      else if (typeof err.response?.data === "string")
        setError(err.response.data);
      else
        setError("Ops... Qualcosa e' andato storto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <button onClick={() => setShowPassw(!showPassw)} className="absolute right-3 top-1/2 -translate-y-1/2" type="button"
          >
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
    </div>
  );
}
