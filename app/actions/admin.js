'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

// In a real app, you'd check for an admin role. 
// For now, we'll just check if the user is logged in.
async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    throw new Error("Unauthorized");
  }
  
  // Here you would check if payload.email is an admin email
  // if (payload.email !== 'admin@gmail.com') throw new Error("Forbidden");

  return payload;
}

export async function getAllOrders() {
  await checkAdmin();

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            cloth: true,
          },
        },
        address: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

export async function updateOrderStatus(orderId, status) {
  await checkAdmin();

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/Account/Orders");
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { error: "Failed to update status" };
  }
}
