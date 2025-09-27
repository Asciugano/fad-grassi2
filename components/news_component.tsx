import { News } from "@/lib/generated/prisma";

export default function NewsComponent({ news }: { news: News }) {
  return (
    <div className="w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-md p-6 gap-6 space-y-2">
      <h2 className="text-xl font-bold text-amber-400">{news.title}</h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{news.content}</p>
    </div>
  );
}
