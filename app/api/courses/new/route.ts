import { prisma } from "@/lib/prisma";
import { generateUniqueCourseCode, getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  const userId = await getUserIDFromToken();

  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato per creare un corso" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi essere loggato per creare un corso" }, { status: 401 });
  if (user.role === "STUDENTE")
    return NextResponse.json({ error: true, message: "Gli studenti non possono creare corsi" }, { status: 400 });

  if (!name)
    return NextResponse.json({ error: true, message: "Devi dare un nome al corso" }, { status: 400 });

  const code = await generateUniqueCourseCode();

  const course = await prisma.course.create({
    data: {
      name,
      teacherId: userId,
      code
    },
  });

  if (!course)
    return NextResponse.json({ error: true, message: "Errore durante la creazione del corso" }, { status: 500 });

  return NextResponse.json({ course });
}
