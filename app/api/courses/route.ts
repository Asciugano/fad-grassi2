import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const userID = await getUserIDFromToken()

  if (!userID)
    return NextResponse.json({ error: true, message: "Devi essere loggato per vedere i tuo corsi" }, { status: 401 });

  const createdCourses = await prisma.course.findMany({
    where: { teacherId: userID }
  });

  const enrollments = await prisma.course.findMany({
    where: {
      enrollments: {
        some: { userId: userID },
      },
    },
  });

  const allCourses = [...createdCourses, ...enrollments];
  return NextResponse.json({ createdCourses, enrollments, allCourses });
}
