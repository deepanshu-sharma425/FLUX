"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(
    searchParams.get("error") ? "Google sign-in failed. Please try again." : ""
  );

  const mergeGuestCart = async () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("flux_cart");
    if (!raw) return;

    try {
      const items = JSON.parse(raw);
      if (!Array.isArray(items)) return;

      await Promise.all(
        items.map((item) =>
          fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }).catch(() => {})
        )
      );
      window.localStorage.removeItem("flux_cart");
    } catch {
      // ignore merge errors
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      await mergeGuestCart();

      if (data.isAdmin) {
        router.push("/admin/dashboard");
        return;
      }

      router.push("/Account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="w-full max-w-md bg-[#f2efe9] rounded-2xl p-6 sm:p-8 shadow-sm">
      <h1 className="text-3xl font-black tracking-widest text-center mb-2">
        FLUX
      </h1>
      <p className="text-center text-sm text-gray-600 mb-8">
        Welcome back. Sign in to continue.
      </p>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-orange-400 text-black font-semibold hover:bg-black hover:text-white transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Separator */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-full bg-white hover:border-black hover:shadow-md transition-all duration-300 group"
      >
        <Image src="/Asset/google.png" width={20} height={20} alt="Google" />
        <span className="font-semibold text-sm text-gray-700 group-hover:text-black transition-colors">
          Continue with Google
        </span>
      </button>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/Components/Signup"
          className="font-semibold text-black hover:underline"
        >
          Sign up
        </Link>
      </div>

      <div className="mt-3 text-center">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f6ecdf] px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-[#f2efe9] rounded-2xl p-6 sm:p-8 shadow-sm text-center">
            <h1 className="text-3xl font-black tracking-widest mb-2">FLUX</h1>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </section>
  );
}
