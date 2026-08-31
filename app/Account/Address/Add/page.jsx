'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addAddress } from "@/actions/address";
import Navbar from "@/Components/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddAddressPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const result = await addAddress(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/Account/Address");
      router.refresh();
    }
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/Account/Address"
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-wide">
              Add New Address
            </h1>
          </div>

          <div className="bg-[#f2efe9] p-8 rounded-2xl shadow-sm">
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  name="street"
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    name="state"
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    name="pincode"
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    name="country"
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="USA"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#FF8A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Address"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
