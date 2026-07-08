import { NextResponse } from "next/server";
import { ADMIN_COOKIE, timingSafeEqual } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json(
      { error: "Admin auth is not configured on the server." },
      { status: 500 },
    );
  }

  let passcode = "";
  try {
    const body = await request.json();
    passcode = typeof body?.passcode === "string" ? body.passcode : "";
  } catch {
    passcode = "";
  }

  // Pad to equal length before comparing so timingSafeEqual never short-circuits
  // on length alone for the common case.
  if (!passcode || !timingSafeEqual(passcode.padEnd(expected.length), expected.padEnd(passcode.length))) {
    return NextResponse.json({ error: "Invalid passcode." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
