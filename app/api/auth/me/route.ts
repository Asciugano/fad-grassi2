import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// per prendere i dati del utente loggato
export async function POST() {
  // controlli sul jwt
  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi Avere un account con un token valido" }, { status: 401 });

  return NextResponse.json({ user });
}

// modifica della password
export async function PUT(req: Request) {
  const { password, newPassword, confirm } = await req.json();

  if (password === newPassword)
    return NextResponse.json({ errot: true, message: "Impossibile cambiare la password" }, { status: 400 });

  // controllo se l'utente e' loggato e esistente
  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi Avere un account con un token valido" }, { status: 401 });

  // controllo se la password inserita e' la stessa del DB
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return NextResponse.json({ errot: true, message: "Impossibile cambiare la password" }, { status: 400 });

  if (newPassword !== confirm)
    return NextResponse.json({ error: true, message: "Impossibile cambiare la password" }, { status: 400 });

  const hashPassword = await bcrypt.hash(newPassword, 10)

  // aggiornamento dell'utente nel DB
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashPassword,
    },
  });

  if (!updatedUser)
    return NextResponse.json({ error: true, message: "Errore nel cambiare la password" }, { status: 500 });

  return NextResponse.json({ message: "Password Cambiata con successo" });
}
