"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }


      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f6ecdf] px-4">
      <div className="w-full max-w-md bg-[#f2efe9] rounded-2xl p-6 sm:p-8 shadow-sm">


        <h1 className="text-3xl font-black tracking-widest text-center mb-2">
          FLUX
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Create your account and join the movement.
        </p>


        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}


        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:border-orange-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-orange-400 text-black font-semibold hover:bg-black hover:text-white transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

     
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/Components/login" className="font-semibold text-black hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
