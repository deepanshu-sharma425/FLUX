export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../../../lib/jwt";
import { prisma } from "../../../../lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const payload = token ? verifyAuthToken(token) : null;

    if (!payload) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      addressId,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !addressId) {
      return NextResponse.json(
        { message: "Missing required payment details" },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Payment verification failed — invalid signature" },
        { status: 400 }
      );
    }

    // Payment verified — create order in DB
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { cloth: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.cloth.finalPrice,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: payload.userId,
          addressId: parseInt(addressId),
          totalAmount,
          status: "CONFIRMED",
          paymentMode: "ONLINE",
          paymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
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

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: payload.userId },
      });

      return newOrder;
    });

    revalidatePath("/Cart");
    revalidatePath("/Account");

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
