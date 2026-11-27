import { NextResponse } from "next/server";
import { clearCabinetSession } from "@/lib/cabinet-auth";
export async function POST() { await clearCabinetSession(); return NextResponse.json({ authenticated: false }); }
