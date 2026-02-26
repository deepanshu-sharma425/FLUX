import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { TOKEN_NAME, verifyAuthToken } from "../../lib/jwt";
import Link from "next/link";

export default async function AccountPage() {
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
        </div>
      </section>
    </>
  );
}

