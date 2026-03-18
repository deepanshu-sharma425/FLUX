import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";
import Image from "next/image";
import Link from "next/link";

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

  const items = await prisma.cartItem.findMany({
    where: { userId: payload.userId },
    include: { cloth: true },
    orderBy: { createdAt: "desc" },
  });

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
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-[#f2efe9] rounded-xl p-4"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white shrink-0">
                      <Image
                        src={item.cloth.image}
                        alt={item.cloth.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h2 className="text-sm font-bold uppercase tracking-wide">
                        {item.cloth.name}
                      </h2>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.cloth.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        Size: <span className="font-semibold">{item.size}</span>{" "}
                        · Color:{" "}
                        <span className="font-semibold">
                          {item.color || item.cloth.color}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="text-sm font-semibold">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold">
                        ₹{item.quantity * item.cloth.finalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f2efe9] rounded-2xl p-6 h-fit">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm mb-2">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="border-t border-gray-300 my-4" />
                <div className="flex justify-between text-base font-bold mb-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <Link
                  href="/Checkout"
                  className="w-full py-3 inline-block text-center rounded-full bg-black text-white text-sm font-semibold hover:bg-[#FF8A00] transition"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

