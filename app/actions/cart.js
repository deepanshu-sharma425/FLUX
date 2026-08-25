'use server';

import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

export async function getCartCount() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return 0;
  }

  try {
    const count = await prisma.cartItem.count({
      where: { userId: payload.userId },
    });
    return count;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
}

export async function getWishlistCount() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return 0;
  }

  try {
    const count = await prisma.wishlist.count({
      where: { userId: payload.userId },
    });
    return count;
  } catch (error) {
    console.error("Error fetching wishlist count:", error);
    return 0;
  }
}
