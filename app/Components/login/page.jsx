"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // this will take us to page after login
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const [error, setError] = useState("");
  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true)
    setError("")
    try{
      const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({email,password})
        
      })
      const data=await res.json()
      if(!res.ok){
        setError(data.error )
        setLoading(false)
      }
      router.push("/")
    }
    catch(err){
      setError(err.message)
    }
    finally{
      setLoading(false)
    }

  }
  

  


  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f6ecdf] px-4">
      <div className="w-full max-w-md bg-[#f2efe9] rounded-2xl p-6 sm:p-8 shadow-sm">

        {/* Brand */}
        <h1 className="text-3xl font-black tracking-widest text-center mb-2">
          FLUX
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Welcome back. Sign in to continue.
        </p>

        {/* Form */}
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

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/Components/Signup"
            className="font-semibold text-black hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}
