import { NextResponse } from "next/server";
import { isCabinetAuthenticated } from "@/lib/cabinet-auth";
export async function GET() { return NextResponse.json({ authenticated: await isCabinetAuthenticated() }); }
