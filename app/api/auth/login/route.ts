export const runtime = "nodejs";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signAuthToken, TOKEN_NAME } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );


    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isAdmin = email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      isAdmin,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        isAdmin,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
     }
    catch (err: any) {
      console.error("LOGIN ERROR ", err);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
