import { Course } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import HomeworksList from "./homeworks_components";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";

export default async function CourseComponent({ course }: { course: Course }) {
  const teacher = await prisma.user.findUnique({ where: { id: course.teacherId } })
  const homeworks = await prisma.homeWork.findMany({ where: { courseId: course.id } });

  return (
    <div className="w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-md p-6 gap-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-amber-400 text-start">{course.name}</h2>

        <div className="flex gap-4">
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm text-white bg-amber-400 hover:bg-amber-300 rounded-lg px-2 py-1 shadow-md"
          >
            <BookOpen size={18} />
            Annunci
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-white bg-amber-400 hover:bg-amber-300 rounded-lg px-2 py-1 shadow-md"
          >
            <Users size={18} />
            Persone
          </Link>
        </div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Creato da:{" "}
        <a
          href={`mailto: ${teacher?.email}`}
          className="font-medium text-amber-400 hover:underline"
        >
          {teacher?.email}
        </a>
      </p>

      {/* homework */}
      <div className="flex items-start gap-3 mt-8">
        {(homeworks && homeworks.length > 0) ? (
          <HomeworksList homeworks={homeworks} />
        ) : (
          <p className="text-sm text-neutral-500">Non ci sono Compiti</p>
        )}
      </div>

    </div>
  );
}
