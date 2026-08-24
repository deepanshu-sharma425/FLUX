'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

export async function updateCartItemQuantity(itemId, quantity) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId, userId: payload.userId },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: itemId, userId: payload.userId },
        data: { quantity },
      });
    }
    revalidatePath("/Cart");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update quantity" };
  }
}

export async function removeCartItem(itemId) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    await prisma.cartItem.delete({
      where: { id: itemId, userId: payload.userId },
    });
    revalidatePath("/Cart");
    return { success: true };
  } catch (error) {
    return { error: "Failed to remove item" };
  }
}

export async function updateCartItemSize(itemId, size) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  try {
    await prisma.cartItem.update({
      where: { id: itemId, userId: payload.userId },
      data: { size },
    });
    revalidatePath("/Cart");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update size" };
  }
}
