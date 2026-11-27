import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "yb_cabinet_session";
function sessionToken() {
  const secret = process.env.CABINET_SESSION_SECRET || process.env.CABINET_PASSCODE;
  if (!secret) return null;
  return createHmac("sha256", secret).update("yb-performing-arts-cabinet").digest("hex");
}

export function verifyPasscode(candidate: string) {
  const expected = process.env.CABINET_PASSCODE;
  if (!expected || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function setCabinetSession() {
  const token = sessionToken();
  if (!token) throw new Error("Cabinet session secret is not configured.");
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearCabinetSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isCabinetAuthenticated() {
  const expected = sessionToken();
  if (!expected) return false;
  const jar = await cookies();
  const actual = jar.get(COOKIE_NAME)?.value;
  if (!actual) return false;
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
