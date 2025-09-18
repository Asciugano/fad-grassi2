import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await User.findOne({ where: { email } });
  if (!user)
    return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  const res = NextResponse.json({ message: "Login effettuato" });
  return generateToken(user.id, res);
}
