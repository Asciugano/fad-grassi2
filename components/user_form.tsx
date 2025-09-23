"use client";

import { User } from "@/lib/generated/prisma";
import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function UserFormComponent({ user }: { user: User }) {
  const [formData, setFormData] = useState({
    password: "",
    new: "",
    confirm: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold">
        Cambia la tua password
      </h2>


      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
            <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
            <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nuova Password"
              value={formData.new}
              onChange={(e) => setFormData({ ...formData, new: e.target.value })}
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            />
            <button
              type="button"
              onClick={() => setNewShowPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
            <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nuova Password"
              value={formData.confirm}
              onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            />
            <button
              type="button"
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg px-4 py-2 transition disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={32} className="animate-spin" />
            ) :
              <span>Cambia password</span>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
