import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, password } = await req.json();

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

  if (course.password !== null) {
    if (!password || password.length < 0)
      return NextResponse.json({ error: true, message: "Questo corso richiede una password" }, { status: 400 });

    const isPasswordCorrect = await bcrypt.compare(password, course.password);
    if (!isPasswordCorrect)
      return NextResponse.json({ error: true, message: "Credenziali invalide" }, { status: 401 });
  } else {
    if (password && password.length > 0)
      return NextResponse.json({ error: "Credenziali non valide" }, { status: 401 });
  }

  await prisma.enrollment.create({
    data: {
      userId: userId,
      courseId: course.id,
    },
  });
}
