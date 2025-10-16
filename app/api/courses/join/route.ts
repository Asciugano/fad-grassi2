import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/generated/prisma";
import redis, { getOrSetCache } from "@/lib/redis";
import { getUserIDFromToken } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, password } = await req.json();

  if (!code)
    return NextResponse.json({ error: true, message: "Devi inserire il codice del corso per entrare" }, { status: 400 });

  // controlli sul utente e il jwt
  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato per unirti ad un corso" }, { status: 401 });

  // ricerca del corso a cui iscriversi 
  const course = await prisma.course.findUnique({
    where: { code }
  });

  if (!course)
    return NextResponse.json({ error: true, message: "Il codice non esiste o e' errato" }, { status: 400 });

  // controllo se l'utente e' gia' iscritto
  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId: course.id },
    },
  });

  if (alreadyEnrolled)
    return NextResponse.json({ error: true, message: "Sei gia' inscritto a questo corso" }, { status: 400 });

  // controllo se l'utente e' il creatore del corso
  if (userId === course.teacherId)
    return NextResponse.json({ error: true, message: "Hai creato tu questo corso" }, { status: 400 });

  // controllo se esiste una password per il corso
  if (course.password !== null) {
    if (!password || password.length < 0)
      return NextResponse.json({ error: true, message: "Questo corso richiede una password" }, { status: 400 });

    // controllo della password con quella hashata del DB
    const isPasswordCorrect = await bcrypt.compare(password, course.password);
    if (!isPasswordCorrect)
      return NextResponse.json({ error: true, message: "Credenziali invalide" }, { status: 401 });
  } else {
    // controllo se non c'e' la password e' l'utente la inserisce lo steso
    if (password && password.length > 0)
      return NextResponse.json({ error: "Credenziali non valide" }, { status: 401 });
  }

  // creazione dell'iscrizione
  await prisma.enrollment.create({
    data: {
      userId: userId,
      courseId: course.id,
    },
  });

  // eliminare la chiave per redis
  await redis.del(`enrollments:${userId}`);
  // reimpostare la chiave di redis con i nuovi dati
  await getOrSetCache<Course[]>(`enrollments:${userId}`, async () => {
    const data = await prisma.course.findMany({
      where: {
        enrollments: {
          some: { userId: userId },
        },
      },
    });

    return data;
  });
}
