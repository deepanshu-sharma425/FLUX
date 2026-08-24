'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

export async function createOrder(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) return { error: "Unauthorized" };

  const addressId = formData.get("addressId");
  const paymentMode = formData.get("paymentMode");

  if (!addressId) return { error: "Please select an address" };
  if (!paymentMode) return { error: "Please select a payment mode" };

  try {
    // 1. Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { cloth: true },
    });

    if (cartItems.length === 0) return { error: "Cart is empty" };

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.cloth.finalPrice,
      0
    );

    // 2. Create Order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: payload.userId,
          addressId: parseInt(addressId),
          totalAmount,
          status: "PENDING",
          paymentMode: paymentMode,
          items: {
            create: cartItems.map((item) => ({
              clothId: item.clothId,
              quantity: item.quantity,
              price: item.cloth.finalPrice,
              size: item.size,
              color: item.color || item.cloth.color,
            })),
          },
        },
      });

      // 3. Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: payload.userId },
      });

      return newOrder;
    });

    revalidatePath("/Cart");
    revalidatePath("/Account");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { error: "Failed to place order. Please try again." };
  }
}

export async function getAllOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload || !payload.isAdmin) return { error: "Unauthorized" };

  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        address: true,
        items: { include: { cloth: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, orders };
  } catch (error) {
    return { error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(orderId, status) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload || !payload.isAdmin) return { error: "Unauthorized" };

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update order status" };
  }
}
