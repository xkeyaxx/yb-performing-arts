import { NextResponse } from "next/server";
import { setCabinetSession, verifyPasscode } from "@/lib/cabinet-auth";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const body = await request.json();
  if (!verifyPasscode(String(body.passcode || ""))) return NextResponse.json({ error: "The passcode is incorrect, or cabinet access has not been configured." }, { status: 401 });
  await setCabinetSession();
  return NextResponse.json({ authenticated: true });
}
