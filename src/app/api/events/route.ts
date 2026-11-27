import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isCabinetAuthenticated } from "@/lib/cabinet-auth";
import { readSiteData, writeSiteData } from "@/lib/site-store.js";

export const runtime = "nodejs";
export async function GET() {
  const data = await readSiteData();
  return NextResponse.json({ events: data.events.sort((a: any, b: any) => a.date.localeCompare(b.date)) });
}
export async function POST(request: Request) {
  if (!(await isCabinetAuthenticated())) return NextResponse.json({ error: "Cabinet access is required to publish events." }, { status: 401 });
  const body = await request.json();
  const title = String(body.title || "").trim();
  const date = String(body.date || "").trim();
  const description = String(body.description || "").trim();
  if (!title || !date || !description) return NextResponse.json({ error: "Please provide an event title, date, and description." }, { status: 400 });
  const data = await readSiteData();
  const event = {
    id: randomUUID(), title, date, description,
    category: String(body.category || "Performance").trim(),
    time: String(body.time || "").trim(), location: String(body.location || "").trim(),
    price: String(body.price || "Free").trim() || "Free",
    createdAt: new Date().toISOString(),
  };
  data.events.push(event);
  await writeSiteData(data);
  return NextResponse.json({ event }, { status: 201 });
}
