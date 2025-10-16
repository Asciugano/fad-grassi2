import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/generated/prisma";
import { getOrSetCache } from "@/lib/redis";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const userID = await getUserIDFromToken()

  // controlli sull'utente e il jwt
  if (!userID)
    return NextResponse.json({ error: true, message: "Devi essere loggato per vedere i tuo corsi" }, { status: 401 });

  // ricerca dei corsi creati dall'utente 
  // tramite redis o DB
  const createdCourses = await getOrSetCache<Course[]>(`createdCourses:${userID}`, async () => {
    const data = await prisma.course.findMany({
      where: { teacherId: userID }
    });

    return data
  });

  // ricerca delle iscrizioni dell'utente 
  // tramite redis o DB
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

  // tutti i corsi dell'utente (creati + iscritto a)
  const allCourses = [...(createdCourses || []), ...(enrollments || [])];
  return NextResponse.json({ createdCourses, enrollments, allCourses });
}
