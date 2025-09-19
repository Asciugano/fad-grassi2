import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, email, password, role } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser)
    return NextResponse.json({ error: true, message: "Esiste gia' un utente con questo username" }, { status: 401 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      role,
      password: hashedPassword,
    }
  });

  if (!user)
    return NextResponse.json({ error: true, message: "Errore nella creazione dell'utente" }, { status: 500 });

  const token = await generateToken(user.id);
  const res = NextResponse.json({ message: "Utente creato con successo", token });
  res.cookies.set("jwt", token, {
    httpOnly: process.env.NEXT_ENV === "dev",
    path: "/",
    maxAge: 60 * 60,
    sameSite: "strict",
    secure: process.env.NEXT_ENV !== "dev",
  });

  return res;
}
