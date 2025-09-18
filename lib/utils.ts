import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function generateToken(userID: string, res: NextResponse) {
  const token = await jwt.sing({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookies.set("jwt", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: process.env.NEXT_ENV !== "dev" || false,
    sameSite: "strict",
    secure: process.env.NEXT_ENV !== "dev" || false,
  });

  return res;
}

export async function getIDFromToken() {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("jwt")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userID: string };
    return decoded.userID;
  } catch (e) {
    console.error(e);
    return null;
  }
}
