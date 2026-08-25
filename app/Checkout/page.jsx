'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import { getAddresses } from "@/actions/address";
import { createOrder } from "@/actions/order";
import { ArrowLeft, Loader2, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingAddresses, setFetchingAddresses] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMode, setPaymentMode] = useState("COD");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAddresses() {
      const data = await getAddresses();
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddressId(data[0].id);
      }
      setFetchingAddresses(false);
    }
    fetchAddresses();
  }, []);

  async function handlePlaceOrder() {
    if (!selectedAddressId) {
      setError("Please select an address");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("addressId", selectedAddressId);
    formData.append("paymentMode", paymentMode);

    const result = await createOrder(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/Account/Orders/Success"); // Or a success page
      router.refresh();
    }
  }

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/Cart"
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-wide">
              Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
            <div className="space-y-8">
              {/* Address Selection */}
              <div className="bg-[#f2efe9] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h2>
                  <Link
                    href="/Account/Address/Add"
                    className="text-sm font-semibold text-black underline hover:text-[#FF8A00]"
                  >
                    Add New
                  </Link>
                </div>

                {fetchingAddresses ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">No addresses found.</p>
                    <Link
                      href="/Account/Address/Add"
                      className="px-6 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-[#FF8A00] transition-colors"
                    >
                      Add Address
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAddressId === addr.id
                            ? "border-black bg-white shadow-md"
                            : "border-transparent bg-white/50 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{addr.fullName}</h3>
                            <p className="text-xs text-gray-600 mb-2">{addr.phone}</p>
                            <p className="text-sm text-gray-800">
                              {addr.street}, {addr.city}, {addr.state} {addr.pincode}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedAddressId === addr.id
                                ? "border-black bg-black"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAddressId === addr.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Mode Selection */}
              <div className="bg-[#f2efe9] p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMode("COD")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMode === "COD"
                        ? "border-black bg-white shadow-md"
                        : "border-transparent bg-white/50 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold">Cash on Delivery</h3>
                          <p className="text-xs text-gray-600">Pay when you receive the package</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMode === "COD"
                            ? "border-black bg-black"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMode === "COD" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl border-2 opacity-50 cursor-not-allowed bg-white/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold">Online Payment</h3>
                          <p className="text-xs text-gray-600">Coming soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#f2efe9] p-6 rounded-2xl shadow-sm h-fit">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
                    {error}
                  </div>
                )}
                
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !selectedAddressId}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#FF8A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  By placing an order, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
