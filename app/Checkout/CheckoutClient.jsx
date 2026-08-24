"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/order";
import { MapPin, CreditCard, ShoppingBag, Loader2, CheckCircle2, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutClient({ addresses, cartItems, total }) {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || "");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const handleOnlinePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order on server
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to initiate payment");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay checkout modal
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "FLUX",
        description: "Streetwear for the Bold",
        order_id: data.orderId,
        handler: async function (response) {
          // 4. Verify payment on server
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                addressId: selectedAddress,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setSuccess(true);
              setTimeout(() => {
                router.push("/Account");
                router.refresh();
              }, 3000);
            } else {
              setError(verifyData.message || "Payment verification failed");
            }
          } catch {
            setError("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError("Payment was cancelled.");
          },
        },
        prefill: {},
        theme: {
          color: "#000000",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      razorpayInstance.open();
    } catch (err) {
      console.error("Online payment error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("addressId", selectedAddress);
    formData.append("paymentMode", "COD");

    const result = await createOrder(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/Account");
        router.refresh();
      }, 3000);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError("Please select or add a delivery address.");
      return;
    }

    if (paymentMode === "ONLINE") {
      await handleOnlinePayment();
    } else {
      await handleCODOrder();
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Your FLUX drop is on its way. You will be redirected to your account shortly to track your order.
        </p>
        <Link href="/Account" className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-orange-500 transition-all">
          VIEW MY ORDERS
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
      <form onSubmit={handlePlaceOrder} className="space-y-8">
        {/* Address Selection */}
        <section className="bg-[#f2efe9] rounded-2xl p-6 shadow-sm border border-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Delivery Address
            </h2>
            <Link href="/Account/Address/Add" className="text-xs font-bold underline hover:text-orange-500 transition-colors">
              + ADD NEW
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-black/10 rounded-xl">
              <p className="text-sm text-gray-500 mb-4">No addresses found.</p>
              <Link href="/Account/Address/Add" className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold">
                ADD ADDRESS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAddress === addr.id
                      ? "border-black bg-white shadow-md"
                      : "border-transparent bg-white/50 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressId"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                    className="absolute top-4 right-4 accent-black"
                  />
                  <p className="font-bold text-sm mb-1">{addr.fullName}</p>
                  <p className="text-[10px] text-gray-500 mb-2 uppercase font-bold">{addr.phone}</p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} {addr.pincode}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Payment Method */}
        <section className="bg-[#f2efe9] rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="text-lg font-black uppercase flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-orange-500" />
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMode === "COD"
                  ? "border-black bg-white shadow-md"
                  : "border-transparent bg-white/50 hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name="paymentMode"
                value="COD"
                checked={paymentMode === "COD"}
                onChange={() => setPaymentMode("COD")}
                className="accent-black"
              />
              <div>
                <p className="font-bold text-sm">Cash on Delivery (COD)</p>
                <p className="text-[10px] text-gray-500 font-bold">PAY WHEN YOU RECEIVE</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMode === "ONLINE"
                  ? "border-black bg-white shadow-md"
                  : "border-transparent bg-white/50 hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name="paymentMode"
                value="ONLINE"
                checked={paymentMode === "ONLINE"}
                onChange={() => setPaymentMode("ONLINE")}
                className="accent-black"
              />
              <div>
                <p className="font-bold text-sm">Pay Online</p>
                <p className="text-[10px] text-gray-500 font-bold">UPI • CARDS • NETBANKING</p>
              </div>
            </label>
          </div>

          {paymentMode === "ONLINE" && (
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-white/60 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-green-600 shrink-0" />
              <span>Secured by <strong className="text-black">Razorpay</strong> — your payment details are encrypted and safe.</span>
            </div>
          )}
        </section>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl text-sm font-bold border-l-4 border-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || addresses.length === 0}
          className="w-full py-5 bg-black text-white rounded-full font-black text-lg hover:bg-orange-600 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {paymentMode === "ONLINE" ? "PROCESSING PAYMENT..." : "CONFIRMING ORDER..."}
            </>
          ) : (
            <>
              {paymentMode === "ONLINE" ? "PAY NOW" : "PLACE ORDER"} • ₹{total.toLocaleString()}
            </>
          )}
        </button>
      </form>

      {/* Summary Sidebar */}
      <div className="space-y-6">
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            Your Items ({cartItems.length})
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b border-black/5 pb-4 last:border-0 last:pb-0">
                <div className="relative w-16 h-16 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                  <Image src={item.cloth.image} alt={item.cloth.name} fill className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold uppercase truncate">{item.cloth.name}</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">
                    SIZE: {item.size} • QTY: {item.quantity}
                  </p>
                  <p className="text-xs font-black text-orange-600 mt-1">
                    ₹{(item.quantity * item.cloth.finalPrice).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 pt-6 border-t border-black/10">
            <div className="flex justify-between text-sm font-bold text-gray-600">
              <span>SUBTOTAL</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-green-600">
              <span>SHIPPING</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-xl font-black pt-2 border-t border-black/10">
              <span>TOTAL</span>
              <span className="text-orange-600">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-[10px] text-orange-800 font-bold uppercase leading-relaxed text-center">
            FLUX GUARANTEE: AUTHENTIC STREETWEAR. NO BS.
          </p>
        </div>
      </div>
    </div>
  );
}
