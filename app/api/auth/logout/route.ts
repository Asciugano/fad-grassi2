import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userID = await getUserIDFromToken();
  if (!userID)
    return NextResponse.json({ error: true, message: "Devi essere loggato per poter fare il logout" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userID }
  });

  if (!user)
    return NextResponse.json({ error: true, message: "Impossibile trovare il tuo Account" }, { status: 404 });

  const cookieStore = cookies();
  (await cookieStore).set("jwt", "");
  return NextResponse.json({ message: "Logout effettuato" });
}
