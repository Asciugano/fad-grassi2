import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

// generazione del token jwt con l'userID (durata 1h)
export async function generateToken(userID: string) {
  const token = await jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export async function getUserIDFromToken() {
  // ricerca del jwt nei cookies
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("jwt")?.value;

  if (!token) return null;

  try {
    // verifica e estrazionde (dell'userID) dal jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userID: string }
    return decoded.userID;
  } catch (e) {
    // in caso di errore rimozione del token
    console.error(e);
    const cookiesStore = cookies();
    (await cookiesStore).delete("jwt");
    return null;
  }
}

// generazione del codice per iscriversi ad un corso
function generateCourseCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < len; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

// generazione del codice unico per iscriversi ad un corso
export async function generateUniqueCourseCode() {
  let code;
  let exsist = true;

  while (exsist) {
    code = generateCourseCode();
    const course = await prisma.course.findUnique({ where: { code } });
    exsist = !!course
  }

  return code!;
}
