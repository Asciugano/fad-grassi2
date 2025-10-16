import { UserRole } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content, files, courseId } = await req.json();

  if (!title || title.length <= 0)
    return NextResponse.json({ error: true, message: "Devi dare un titolo a questo annuncio" }, { status: 400 });

  // controllo sull'utente e il jwt
  if (!courseId)
    return NextResponse.json({ error: true, message: "Impossibile creare questo accuncio per il corso specificato" }, { status: 400 });

  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato per creare un annuncio" }, { status: 401 });

  // ricerca del corso
  // TODO: implementare **REDIS**
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course)
    return NextResponse.json({ error: true, message: "Impossibile trovare il corso specificato" }, { status: 400 });

  // ricerca dell'utente
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi avere un account valido o un token valido" }, { status: 401 });

  // controllo sul ruolo dell'utente
  // (studenti non posso creare nulla)
  if (user.role === UserRole.STUDENTE)
    return NextResponse.json({ error: true, message: "Gli studenti non possono creare un'annuncio" }, { status: 400 });

  // creazione dell'annuncio
  const news = await prisma.news.create({
    data: {
      title,
      content,
      files,
      courseId,
    },
  });

  if (!news)
    return NextResponse.json({ error: true, message: "Errore nella creazione dell'annuncio" }, { status: 500 });

  return NextResponse.json({ news });
}

export async function GET() {
  const userId = await getUserIDFromToken();

  // controllo sull'utente e jwt
  if (!userId)
    return NextResponse.json({ error: true, message: "Impossibile trovare gli annunci di questo utente" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi avere un account valido o un token valido" }, { status: 401 });

  // ricerca del corso
  // TODO: implementare **REDIS**
  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { teacherId: userId },
        {
          enrollments: {
            some: { userId },
          },
        },
      ],
    },
  });

  // controllo sulla quantita dei corsi a cui l'utente e' iscritto
  if (!courses || courses.length <= 0)
    return NextResponse.json({ error: true, message: "Non sei inscritto a nessun corso" }, { status: 400 });

  // ricerca degli annunci per corsi
  // TODO: implementare **REDIS**
  const news = await prisma.news.findMany({
    where: {
      courseId: {
        in: courses.map((c) => c.id),
      },
    },
    include: {
      course: true,
    },
  });

  if (!news)
    return NextResponse.json({ error: true, message: "Errore nella ricerca degli annunci" }, { status: 500 });

  return NextResponse.json({ news });
}
