import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";
import CheckoutClient from "./CheckoutClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CheckoutPage() {
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
              Please log in
            </h1>
            <p className="text-gray-600 mb-6">
              Log in to complete your purchase.
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

  const [addresses, cartItems] = await Promise.all([
    prisma.address.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { cloth: true },
    }),
  ]);

  if (cartItems.length === 0) {
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
              Add some items to your cart before checking out.
            </p>
            <Link
              href="/AllCloth"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#FF8A00] transition"
            >
              Go to collection
            </Link>
          </div>
        </section>
      </>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.cloth.finalPrice,
    0
  );

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Link href="/Cart" className="p-3 bg-white/50 rounded-full hover:bg-white transition shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Checkout</h1>
          </div>

          <CheckoutClient 
            addresses={addresses} 
            cartItems={cartItems} 
            total={total} 
          />
        </div>
      </section>
    </>
  );
}
