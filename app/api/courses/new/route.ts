import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  const userId = await getUserIDFromToken();

  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato per creare un corso" }, { status: 401 });
  if (!name)
    return NextResponse.json({ error: true, message: "Devi dare un nome al corso" }, { status: 400 });

  const course = await prisma.course.create({
    data: {
      name,
      teacherId: userId
    },
  });

  if (!course)
    return NextResponse.json({ error: true, message: "Errore durante la creazione del corso" }, { status: 500 });

  return NextResponse.json({ course });
}
