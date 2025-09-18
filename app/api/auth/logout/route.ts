import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  (await cookies()).set("jwt", "");

  const token = (await cookies()).get("jwt");
  if (token || token !== '')
    return NextResponse.json({ error: true, message: "Errore nel logout " }, { status: 500 });

  return NextResponse.json({ message: "Ciao Ciao" });
}
