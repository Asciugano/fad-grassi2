"use client";

import axios, { AxiosError } from "axios";
import { Course } from "@/lib/generated/prisma";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="flex items-start w-full bg-neutral-200 dark:bg-neutral-900 rounded-2xl shadow-lg px-6 py-2">
      {courses && courses.length > 0 && (
        <div className="w-full">
          {courses.map((course) => (
            <Link
              key={course.code}
              href={`/courses/${course.name}`}
              className="text-2xl font-bold text-amber-400"
            >
              {course.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
