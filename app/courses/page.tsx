import CourseComponent from "@/components/courseComponent";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const course = await prisma.course.findFirst();

  return (
    <div>
      {course && (
        <CourseComponent course={course} />
      )}
    </div>
  );
}
