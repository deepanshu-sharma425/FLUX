'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

export async function createOrder(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return { error: "Unauthorized" };
  }

  const addressId = formData.get("addressId");
  const paymentMode = formData.get("paymentMode");

  console.log("Creating order with addressId:", addressId, "paymentMode:", paymentMode);

  if (!addressId || !paymentMode) {
    return { error: "Address and Payment Mode are required" };
  }

  const parsedAddressId = parseInt(addressId);
  if (isNaN(parsedAddressId)) {
    return { error: "Invalid address ID" };
  }

  try {
    // 1. Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { cloth: true },
    });

    if (cartItems.length === 0) {
      return { error: "Cart is empty" };
    }

    // Check if address exists and belongs to the user
    const address = await prisma.address.findUnique({
      where: { id: parsedAddressId, userId: payload.userId },
    });

    if (!address) {
      return { error: "Invalid address" };
    }

    // 2. Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.cloth.finalPrice,
      0
    );

    // 3. Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: payload.userId,
          addressId: parsedAddressId,
          totalAmount,
          status: "PENDING",
          paymentMode: paymentMode,
          items: {
            create: cartItems.map((item) => ({
              clothId: item.clothId,
              quantity: item.quantity,
              price: item.cloth.finalPrice,
              size: item.size,
              color: item.color,
            })),
          },
        },
      });

      // 4. Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: payload.userId },
      });

      return newOrder;
    });

    revalidatePath("/Cart");
    revalidatePath("/Account/Orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order detailed:", error);
    return { error: `Failed to place order: ${error.message || 'Unknown error'}` };
  }
}

export async function getUserOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return [];
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
        items: {
          include: {
            cloth: true,
          },
        },
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
