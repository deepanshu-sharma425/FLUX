export const runtime = "nodejs";

import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signAuthToken, TOKEN_NAME } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: hashedPass,
      },
    });

    const isAdmin = user.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      isAdmin,
    });

    const response = NextResponse.json(
      { message: "User created success" },
      { status: 201 }
    );

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
