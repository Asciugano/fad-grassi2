import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // cerco l'utente nel db
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  // controllo se la password hashata del db e' la stessa dell'input
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  // creazione utilizzo del token jwt nei cookies
  const res = NextResponse.json({ message: "Login effettuato" });
  const token = await generateToken(user.id);
  res.cookies.set("jwt", token);

  return res;
}

export async function GET() {
  // controllo se esiste il token jwt
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("jwt");

  return NextResponse.json({ logged: !!token });
}
