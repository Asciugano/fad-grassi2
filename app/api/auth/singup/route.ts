import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { generateToken } = await import("@/lib/utils");
  const { default: User } = await import("@/models/user.model")
  const bcrypt = await import("bcryptjs");

  const { username, email, password, role } = await req.json();

  if (!username || !email || !password || !role)
    return NextResponse.json({ error: true, message: "Tutti i campi richiesti" });

  const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    return NextResponse.json({ error: true, message: "Utente gia' registrato con questa email" }, { status: 401 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  if (!user)
    return NextResponse.json({ error: true, message: "Errore nella creazione dell'utente" }, { status: 500 });

  const res = NextResponse.json({ message: "Singup riuscito" });
  return generateToken(user.id, res);
}
