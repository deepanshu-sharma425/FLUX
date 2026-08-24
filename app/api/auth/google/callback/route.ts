export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { signAuthToken, TOKEN_NAME } from "../../../../../lib/jwt";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/Components/login?error=google_auth_failed`);
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${appUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return NextResponse.redirect(`${appUrl}/Components/login?error=token_exchange_failed`);
    }

    // 2. Fetch user profile from Google
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();

    if (!profileRes.ok || !profile.email) {
      console.error("Google profile fetch failed:", profile);
      return NextResponse.redirect(`${appUrl}/Components/login?error=profile_fetch_failed`);
    }

    const { email, name, picture, id: googleId } = profile;

    // 3. Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleId },
          { email: email.toLowerCase() },
        ],
      },
    });

    if (user) {
      // Link Google account if not already linked
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId,
            avatar: picture || user.avatar,
          },
        });
      }
    } else {
      // Create new user (no password for OAuth users)
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name: name || email.split("@")[0],
          googleId,
          avatar: picture || null,
        },
      });
    }

    // 4. Sign JWT and set cookie
    const isAdmin = user.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      isAdmin,
    });

    const response = NextResponse.redirect(
      isAdmin ? `${appUrl}/admin/dashboard` : `${appUrl}/Account`
    );

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(`${appUrl}/Components/login?error=server_error`);
  }
}
