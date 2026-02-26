export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { TOKEN_NAME } from "../../../../lib/jwt";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  response.cookies.set(TOKEN_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

