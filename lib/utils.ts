import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function generateToken(userID: string) {
  const token = await jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export async function getUserIDFromToken() {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("jwt")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userID: string }
    return decoded.userID;
  } catch (e) {
    console.error(e);
    return null;
  }
}
