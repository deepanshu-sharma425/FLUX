import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";
import Link from "next/link";
import { MapPin, ShoppingBag, LayoutDashboard, LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  const payload = token ? verifyAuthToken(token) : null;

  const isAdmin = payload?.email === "admin@gmail.com"; // Basic admin check matching current codebase style

  if (!payload) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-wide mb-4">
              Your account
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to view your account details.
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

  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-wide mb-4">
              Your account
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find your account. Try logging in again.
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

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
              Your <span className="text-orange-500">Account</span>
            </h1>
            <p className="text-gray-500 mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Manage your profile & orders</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-[32px] p-6 sm:p-10 space-y-8 border border-white/50 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</p>
                <p className="text-xl sm:text-2xl font-black tracking-tight">
                  {user.name || "User"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</p>
                <p className="text-sm sm:text-base font-bold text-gray-600 truncate">
                  {user.email}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Type</p>
                <div className="inline-flex px-3 py-1 bg-black text-white rounded-full text-[8px] font-black uppercase tracking-widest">
                  {payload.isAdmin ? "Admin" : "Customer"}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/Account/Orders"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-lg hover:border-black transition-all border border-gray-100 group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">My Orders</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">View history</p>
                </div>
              </Link>

              <Link
                href="/Account/Address"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-lg hover:border-black transition-all border border-gray-100 group"
              >
                <div className="w-10 h-10 rounded-xl bg-black/5 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Address Book</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage addresses</p>
                </div>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="sm:col-span-2 flex items-center gap-4 p-5 bg-black text-white rounded-2xl hover:shadow-xl hover:bg-orange-600 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Admin Dashboard</p>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Management portal</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="pt-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

