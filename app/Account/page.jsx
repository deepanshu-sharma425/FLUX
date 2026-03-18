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
        <div className="h-24" />
        <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
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

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="h-24" />
        <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
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
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-wide mb-6">
            Your account
          </h1>

          <div className="bg-[#f2efe9] rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500">NAME</p>
              <p className="text-lg font-bold">
                {user.name || "No name set"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500">EMAIL</p>
              <p className="text-sm">{user.email}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500">ROLE</p>
              <p className="text-sm">
                {payload.isAdmin ? "Admin" : "Customer"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Link
              href="/Account/Orders"
              className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group border border-transparent hover:border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-[#f6ecdf] transition-colors">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">My Orders</h3>
                  <p className="text-sm text-gray-500">
                    Track and view your order history
                  </p>
                </div>
              </div>
              <div className="text-gray-300 group-hover:text-black transition-all translate-x-0 group-hover:translate-x-1">
                →
              </div>
            </Link>

            <Link
              href="/Account/Address"
              className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group border border-transparent hover:border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-[#f6ecdf] transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">My Addresses</h3>
                  <p className="text-sm text-gray-500">
                    Manage your shipping addresses
                  </p>
                </div>
              </div>
              <div className="text-gray-300 group-hover:text-black transition-all translate-x-0 group-hover:translate-x-1">
                →
              </div>
            </Link>

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex items-center justify-between p-6 bg-black text-white rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Admin Dashboard</h3>
                    <p className="text-sm text-gray-400">
                      Manage products and customer orders
                    </p>
                  </div>
                </div>
                <div className="text-white/50 group-hover:text-white transition-all translate-x-0 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            )}

            <LogoutButton />
          </div>
        </div>
      </section>
    </>
  );
}

