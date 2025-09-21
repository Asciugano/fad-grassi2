import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST() {
  const userId = await getUserIDFromToken();
  if (!userId)
    return NextResponse.json({ error: true, message: "Devi essere loggato" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: true, message: "Devi Avere un account con un token valido" }, { status: 401 });

  return NextResponse.json({ user });
}
