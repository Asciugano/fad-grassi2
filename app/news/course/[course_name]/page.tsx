import NewsListComponent from "@/components/news_list";
import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function NewsByCoursePage({
  params
}: {
  params: Promise<{ course_name: string }>
}) {
  const { course_name } = await params;

  const userId = await getUserIDFromToken();
  if (!userId)
    notFound();
  const course = await prisma.course.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              enrollments: {
                some: {
                  userId,
                },
              },
            },
            { teacherId: userId },
          ],
        },
        {
          name: course_name,
        },
      ],
    },
  });

  const news = await prisma.news.findMany({
    where: {
      courseId: course?.id,
    },
  });

  return (
    <div className="flex items-center justify-center gap-3">
      <div>
        <h2 className="text-xl font-semibold mb-8">
          Annunci del corso: {" "}
          <span className="text-amber-400">{course_name}</span>
        </h2>
        <NewsListComponent news={news} />
      </div>
    </div>
  );
}
