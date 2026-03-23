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
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-[96px] pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
              Your <span className="text-orange-500">Cart</span>
            </h1>
            <p className="text-gray-500 mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Review your selection</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-[32px] p-12 sm:p-20 text-center border border-dashed border-gray-300">
              <p className="text-gray-400 font-black uppercase tracking-widest mb-8">
                Your cart is currently empty
              </p>
              <Link
                href="/AllCloth"
                className="inline-flex items-center justify-center px-10 py-5 rounded-[24px] bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:shadow-xl transition-all"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 sm:gap-12">
              <div className="space-y-4 sm:space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/50 backdrop-blur-sm rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border border-white/50 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-2xl overflow-hidden bg-white shrink-0 shadow-inner">
                      <Image
                        src={item.cloth.image}
                        alt={item.cloth.name}
                        fill
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                            {item.cloth.name}
                          </h2>
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest">
                          {item.cloth.category}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 bg-black/5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                            Size: {item.size}
                          </span>
                          <span className="px-3 py-1 bg-black/5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                            Color: {item.color || item.cloth.color}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center gap-4 bg-black/5 rounded-xl px-4 py-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Qty</span>
                          <span className="text-xs font-black">{item.quantity}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-black tracking-tighter">
                          ₹{(item.quantity * item.cloth.finalPrice).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[32px] p-6 sm:p-8 h-fit shadow-xl shadow-black/5 border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] sm:text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400">Total Items</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400">Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t border-gray-100 my-6" />
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                      <p className="text-3xl font-black tracking-tighter">₹{total.toLocaleString()}</p>
                    </div>
                  </div>
                  <Link
                    href="/Checkout"
                    className="w-full mt-8 py-5 flex items-center justify-center rounded-[24px] bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:shadow-xl transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

