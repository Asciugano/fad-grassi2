import CourseComponent from "@/components/course_component";
import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params
}: {
  params: Promise<{ name: string }>
}) {

  const { name } = await params;
  const userId = await getUserIDFromToken();
  if (!userId)
    notFound();

  const course = await prisma.course.findFirst({
    where: {
      name,
      OR: [
        { teacherId: userId },
        { enrollments: { some: { userId } } },
      ],
    },
  });

  return (
    <div>
      {course && (
        <CourseComponent course={course} />
      )}
    </div>
  );
}
