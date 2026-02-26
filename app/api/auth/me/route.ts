export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../../../lib/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
        isAdmin: payload.isAdmin,
      },
    },
    { status: 200 }
  );
}

