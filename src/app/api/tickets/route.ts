import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { readSiteData, writeSiteData } from "@/lib/site-store.js";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const body = await request.json();
  const eventId = String(body.eventId || "");
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const quantity = Number(body.quantity);
  if (!eventId || !name || !email || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return NextResponse.json({ error: "Please provide your name, a valid email, and a ticket quantity from 1 to 10." }, { status: 400 });
  }
  const data = await readSiteData();
  const event = data.events.find((item: any) => item.id === eventId);
  if (!event) return NextResponse.json({ error: "That event could not be found. Please refresh and try again." }, { status: 404 });
  const reservation = { id: randomUUID(), eventId, eventTitle: event.title, name, email, quantity, createdAt: new Date().toISOString(), status: "Request received" };
  data.reservations.push(reservation);
  await writeSiteData(data);
  return NextResponse.json({ reservation }, { status: 201 });
}
