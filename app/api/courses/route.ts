import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/generated/prisma";
import { getOrSetCache } from "@/lib/redis";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const userID = await getUserIDFromToken()

  if (!userID)
    return NextResponse.json({ error: true, message: "Devi essere loggato per vedere i tuo corsi" }, { status: 401 });

  const createdCourses = await getOrSetCache<Course[]>(`createdCourses:${userID}`, async () => {
    const data = await prisma.course.findMany({
      where: { teacherId: userID }
    });

    return data
  });


  const enrollments = await getOrSetCache<Course[]>(`enrollments:${userID}`, async () => {
    const data = await prisma.course.findMany({
      where: {
        enrollments: {
          some: { userId: userID },
        },
      },
    });

    return data;
  });

  const allCourses = [...(createdCourses || []), ...(enrollments || [])];
  return NextResponse.json({ createdCourses, enrollments, allCourses });
}
