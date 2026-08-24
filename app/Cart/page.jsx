import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";
import Image from "next/image";
import Link from "next/link";
import CartClient from "./CartClient";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  const payload = token ? verifyAuthToken(token) : null;

  if (!payload) {
    return (
      <>
        <Navbar />
        <div className="h-24" />
        <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-wide mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Sign in to view items you&apos;ve added to your cart.
            </p>
            <Link
              href="/Components/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#FF8A00] transition"
            >
              Login
            </Link>
          </div>
        </section>
      </>
    );
  }

  let items = [];
  try {
    items = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { cloth: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
  }

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.cloth.finalPrice,
    0
  );

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-wide mb-6">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-[#f2efe9] rounded-2xl p-8 text-center">
              <p className="text-gray-700 mb-4">
                You don&apos;t have any items in your cart yet.
              </p>
              <Link
                href="/AllCloth"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#FF8A00] transition"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <CartClient initialItems={items} total={total} />
          )}
        </div>
      </section>
    </>
  );
}

