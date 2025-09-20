import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code)
    return NextResponse.json({ error: true, message: "Devi inserire il codice del corso per entrare" }, { status: 400 });

  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato per unirti ad un corso" }, { status: 401 });

  const course = await prisma.course.findUnique({
    where: { code }
  });

  if (!course)
    return NextResponse.json({ error: true, message: "Il codice non esiste o e' errato" }, { status: 400 });

  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId: course.id },
    },
  });

  if (alreadyEnrolled)
    return NextResponse.json({ error: true, message: "Sei gia' inscritto a questo corso" }, { status: 400 });

  await prisma.enrollment.create({
    data: {
      userId: userId,
      courseId: course.id,
    },
  });
}
