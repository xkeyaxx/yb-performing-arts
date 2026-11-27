
import { NextResponse } from "next/server";
import { randomUUID, randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readSiteData, writeSiteData } from "@/lib/site-store.js";

export const runtime = "nodejs";

const COOKIE_NAME = "yb_discussion_owner";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokenMatches(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  return first.length === second.length && timingSafeEqual(first, second);
}

export async function GET() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  const data = await readSiteData();

  const posts = data.posts
    .sort((a: any, b: any) =>
      b.createdAt.localeCompare(a.createdAt)
    )
    .map((post: any) => ({
      id: post.id,
      author: post.author,
      message: post.message,
      createdAt: post.createdAt,
      canDelete: Boolean(
        token &&
        post.ownerTokenHash &&
        tokenMatches(hashToken(token), post.ownerTokenHash)
      ),
    }));

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const body = await request.json();

  const author = String(body.author || "").trim();
  const message = String(body.message || "").trim();

  if (!author || !message) {
    return NextResponse.json(
      { error: "Please enter your name and a message." },
      { status: 400 }
    );
  }

  if (author.length > 60 || message.length > 3000) {
    return NextResponse.json(
      { error: "Your name or message is too long." },
      { status: 400 }
    );
  }

  const jar = await cookies();

  let ownerToken = jar.get(COOKIE_NAME)?.value;

  if (!ownerToken) {
    ownerToken = randomBytes(32).toString("hex");

    jar.set(COOKIE_NAME, ownerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const data = await readSiteData();

  const post = {
    id: randomUUID(),
    author,
    message,
    createdAt: new Date().toISOString(),
    ownerTokenHash: hashToken(ownerToken),
  };

  data.posts.push(post);

  await writeSiteData(data);

  return NextResponse.json({
    post: {
      id: post.id,
      author: post.author,
      message: post.message,
      createdAt: post.createdAt,
      canDelete: true,
    },
  }, { status: 201 });
}

export async function DELETE(request: Request) {
  const jar = await cookies();
  const ownerToken = jar.get(COOKIE_NAME)?.value;

  if (!ownerToken) {
    return NextResponse.json(
      { error: "You are not authorized to delete this post." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const postId = String(body.id || "");

  if (!postId) {
    return NextResponse.json(
      { error: "A post ID is required." },
      { status: 400 }
    );
  }

  const data = await readSiteData();
  const post = data.posts.find((p: any) => p.id === postId);

  if (!post) {
    return NextResponse.json(
      { error: "Post not found." },
      { status: 404 }
    );
  }

  const submittedHash = hashToken(ownerToken);

  if (
    !post.ownerTokenHash ||
    !tokenMatches(submittedHash, post.ownerTokenHash)
  ) {
    return NextResponse.json(
      { error: "You can only delete your own posts." },
      { status: 403 }
    );
  }

  data.posts = data.posts.filter((p: any) => p.id !== postId);

  await writeSiteData(data);

  return NextResponse.json({ success: true });
}

