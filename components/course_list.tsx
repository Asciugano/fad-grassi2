"use client";

import axios, { AxiosError } from "axios";
import { Course, User } from "@/lib/generated/prisma";
import { useEffect, useState } from "react";
import { Loader2, PencilRuler } from "lucide-react";
import Link from "next/link";

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setLoading(true);
    axios.get('/api/courses')
      .then((res) => res.data)
      .then((data) => setCourses(data.allCourses))
      .catch((e) => {
        const err = e as AxiosError<{ message: string }>

        if (err.response?.data.message)
          setError(err.response.data.message)
        else if (typeof err.response?.data === "string")
          setError(err.response.data)
        else
          setError("Ops... Qualcosa e' andato storto");
      })
      .finally(() => setLoading(false));

    axios.post("/api/auth/me")
      .then((res) => res.data)
      .then((data) => setUser(data))
      .catch((e) => {
        const err = e as AxiosError<{ message: string }>;

        if (err.response?.data.message)
          setError(err.response.data.message);
        if (typeof err.response?.data === "string")
          setError(err.response.data);
        else
          setError("Ops... Qualcosa e' andato storto");
      })
  }, []);

  if (loading || error)
    return (
      <div className="flex items-center justify-center w-full bg-neutral-200 dark:bg-neutral-900 rounded-2xl shadow-lg px-4 py-2">
        {loading && (
          <Loader2 size={50} className="text-amber-400 animate-spin" />
        )}
        {error && (
          <p className="text-lg text-red-600">{error}</p>
        )}
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-3 flex-1 w-full bg-neutral-200 dark:bg-neutral-900 rounded-2xl shadow-lg px-6 py-4">
        {courses && courses.length > 0 && (
          <div className="w-full">
            {courses.map((course) => (
              <Link
                key={course.code}
                href={`/courses/${course.name}`}
                className="text-2xl font-bold text-amber-400 bg-neutral-100 dark:bg-neutral-950 rounded-lg shadow-lg px-6 py-2 w-full"
              >
                {course.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {user && (
        <div>
          {user.role !== "STUDENTE" && (
            <div className="sticky bottom-4 flex items-center justify-center mt-8">
              <Link
                href="/courses/new"
                className="flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-white rounded-lg shadow-md px-4 py-2">
                <PencilRuler size={18} />
                Crea un Corso
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
