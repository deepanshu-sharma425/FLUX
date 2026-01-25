"use client";

import Link from "next/link";

export default function Signup() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f6ecdf] px-4">
      <div className="w-full max-w-md bg-[#f2efe9] rounded-2xl p-6 sm:p-8 shadow-sm">

        {/* Brand */}
        <h1 className="text-3xl font-black tracking-widest text-center mb-2">
          FLUX
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Create your account and join the movement.
        </p>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-orange-400 text-black font-semibold hover:bg-black hover:text-white transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
