"use client";

import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, LogIn, PencilRuler } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseForm({ create }: { create: boolean }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (create) {
      try {
        await axios.post('/api/courses/new', { name, password });
      } catch (e) {
        const err = e as AxiosError<{ message: string }>

        if (err.response?.data.message)
          setError(err.response.data.message);
        else if (typeof err.response?.data === "string")
          setError(err.response.data);
        else
          setError("Ops... Qualcosa e'andato storto");
      } finally {
        setLoading(false);
      }
    }
    else {
      try {
        await axios.post('/api/courses/join', { code, password });
      } catch (e) {
        const err = e as AxiosError<{ message: string }>

        if (err.response?.data.message)
          setError(err.response.data.message);
        else if (typeof err.response?.data === "string")
          setError(err.response.data);
        else
          setError("Ops... Qualcosa e'andato storto");
      } finally {
        setLoading(false);
      }
    }

    if (!error || error.length <= 0)
      router.push("/courses");
  }

  return (
    <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {create ? "Crea corso" : "Unisciti al corso"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(error && error.length > 0) && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
          {create ? (
            <PencilRuler size={20} className="text-neutral-500 dark:text-neutral-400" />
          ) :
            <LogIn size={20} className="text-neutral-500 dark:text-neutral-400" />
          }
          <input
            type="text"
            placeholder={create ? "Nome del corso" : "Codice del corso"}
            value={create ? name : code}
            onChange={(e) => create ? setName(e.target.value) : setCode(e.target.value)}
            className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
            required
          />
        </div>
        <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-amber-400">
          <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            <span>{create ? "Crea" : "Unisciti"}</span>
          }
        </button>
      </form>
      <p className="text-sm text-center mt-8">
        {create ? "Devi uniri ad un corso " : "Devi creare un corso "}
        <Link
          href={`/courses/${create ? "join" : "new"}`}
          className="text-sm text-amber-400"
        >
          Clicca qui
        </Link>
      </p>
    </div>
  );
}
