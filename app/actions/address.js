'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";

export async function addAddress(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return { error: "Unauthorized" };
  }

  const fullName = formData.get("fullName");
  const phone = formData.get("phone");
  const street = formData.get("street");
  const city = formData.get("city");
  const state = formData.get("state");
  const pincode = formData.get("pincode");
  const country = formData.get("country");

  if (!fullName || !phone || !street || !city || !state || !pincode || !country) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.address.create({
      data: {
        fullName,
        phone,
        street,
        city,
        state,
        pincode,
        country,
        userId: payload.userId,
      },
    });

    revalidatePath("/Account/Address");
    return { success: true };
  } catch (error) {
    console.error("Error adding address:", error);
    return { error: "Failed to add address" };
  }
}

export async function deleteAddress(addressId) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.address.delete({
      where: {
        id: parseInt(addressId),
        userId: payload.userId, // Ensure user owns the address
      },
    });

    revalidatePath("/Account/Address");
    return { success: true };
  } catch (error) {
    console.error("Error deleting address:", error);
    return { error: "Failed to delete address" };
  }
}

export async function getAddresses() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return [];
  }

  try {
    const addresses = await prisma.address.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
    });
    return addresses;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}
