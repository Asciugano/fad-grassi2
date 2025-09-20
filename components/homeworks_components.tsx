import { HomeWork } from "@/lib/generated/prisma";
import { Calendar } from "lucide-react";

export default function HomeworksList({ homeworks }: { homeworks: HomeWork[] }) {
  return (
    <div>
      {homeworks && homeworks.length > 0 ? (
        <ul className="space-y-4">
          {homeworks.map((homework) => (
            <li
              key={homework.id}
              className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-neutral-500 dark:bg-neutral-800"
            >
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {homework.title}
              </h4>
              {homework.content && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {homework.content}
                </p>
              )}

              {homework.deadline && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-2">
                  <Calendar className="w-4 h-4" />
                  Scadenza:{" "}
                  {homework.deadline.toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 ${homework.status === "CONSEGNATO" ? "text-green-600" : homework.status === "MANCANTE" ? "text-amber-300" : "text-red-600"}`}>
                  {homework.status}
                </span>
                {homework.grade !== null && (
                  <span className={`text-sm font-medium ${homework.grade >= 6 ? "text-green-600" : "text-red-600"}`}>
                    Voto: {homework.grade}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500">Non ci sono compiti</p>
      )
      }
    </div >
  );
}
