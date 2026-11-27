import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { readSiteData, writeSiteData } from "@/lib/site-store.js";
export const runtime = "nodejs";
export async function GET() {
  const data = await readSiteData();
  return NextResponse.json({ posts: data.posts.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt)) });
}
export async function POST(request: Request) {
  const body = await request.json();
  const author = String(body.author || "").trim();
  const message = String(body.message || "").trim();
  if (!author || !message) return NextResponse.json({ error: "Please enter your name and a message." }, { status: 400 });
  if (author.length > 60 || message.length > 3000) return NextResponse.json({ error: "Your name or message is too long." }, { status: 400 });
  const data = await readSiteData();
  const post = { id: randomUUID(), author, message, createdAt: new Date().toISOString() };
  data.posts.push(post);
  await writeSiteData(data);
  return NextResponse.json({ post }, { status: 201 });
}
