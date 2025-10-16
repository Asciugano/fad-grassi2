import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // controlli sul token (se non c'e', e' invalido o scaduto) non sei loggato
  // quindi niente logout
  const userID = await getUserIDFromToken();
  if (!userID)
    return NextResponse.json({ error: true, message: "Devi essere loggato per poter fare il logout" }, { status: 401 });

  // controllo se esiste un utente connesso al jwt
  const user = await prisma.user.findUnique({
    where: { id: userID }
  });

  if (!user)
    return NextResponse.json({ error: true, message: "Impossibile trovare il tuo Account" }, { status: 404 });

  // rimozione del jwt dai cookies
  const cookieStore = cookies();
  (await cookieStore).delete("jwt");

  return NextResponse.json({ logged: true });
}
