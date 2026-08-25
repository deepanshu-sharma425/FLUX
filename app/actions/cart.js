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

export async function updateCartItemQuantity(itemId, quantity) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { error: "Failed to update item" };
  }
}

export async function removeCartItem(itemId) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    await prisma.cartItem.delete({ where: { id: itemId } });
    return { success: true };
  } catch (error) {
    console.error("Error removing cart item:", error);
    return { error: "Failed to remove item" };
  }
}

export async function updateCartItemSize(itemId, newSize) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { size: newSize },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item size:", error);
    return { error: "Failed to update size" };
  }
}

