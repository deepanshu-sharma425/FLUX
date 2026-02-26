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

  const items = await prisma.cartItem.findMany({
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
  const { clothId, size, color, quantity = 1 } = body;

  if (!clothId || !size || !color) {
    return NextResponse.json(
      { message: "clothId, size and color are required" },
      { status: 400 }
    );
  }

  const item = await prisma.cartItem.upsert({
    where: {
      userId_clothId_size: {
        userId,
        clothId,
        size,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
      color,
    },
    create: {
      userId,
      clothId,
      size,
      color,
      quantity,
    },
  });

  return NextResponse.json({ item }, { status: 200 });
}

