"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { News, Course } from "@/lib/generated/prisma";
import Link from "next/link";

export default function NewsListComponent({ news: initalNews }: { news?: News[] }) {
  const [news, setNews] = useState(initalNews || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/news')
      setNews(res.data.news);
      console.log(news);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;

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

  useEffect(() => {
    if (!initalNews)
      fetchNews();
  }, [initalNews]);

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
        {news && news.length > 0 && (
          <div className="w-full">
            {news.map((n) => (
              <Link
                key={n.id}
                href={!initalNews ? `/news/course/${n.course.name}` : `/news/${n.id}`}
              >
                <div className="w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-md p-6 gap-6 space-y-2">
                  <h2 className="text-xl font-bold text-amber-400">{n.title}</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{n.content}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
