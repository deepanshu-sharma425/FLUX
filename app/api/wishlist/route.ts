export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { TOKEN_NAME, verifyAuthToken } from "../../../lib/jwt";

async function getUserIdFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) return null;

  const payload = verifyAuthToken(token);
  if (!payload) return null;

  return payload.userId;
}

export async function GET() {
  const userId = await getUserIdFromRequest();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      cloth: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: Request) {
  const userId = await getUserIdFromRequest();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { clothId } = body;

  if (!clothId) {
    return NextResponse.json(
      { message: "clothId is required" },
      { status: 400 }
    );
  }

  try {
    const existingItem = await prisma.wishlist.findFirst({
      where: { userId, clothId },
    });

    if (existingItem) {
      await prisma.wishlist.delete({
        where: { id: existingItem.id },
      });
      return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });
    } else {
      const item = await prisma.wishlist.create({
        data: {
          userId,
          clothId,
        },
      });
      return NextResponse.json({ item }, { status: 200 });
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
