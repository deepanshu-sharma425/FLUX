"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { updateCartItemQuantity, removeCartItem, updateCartItemSize } from "@/actions/cart";
import { useRouter } from "next/navigation";

export default function CartClient({ initialItems, total }) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    setLoading(itemId);
    const res = await updateCartItemQuantity(itemId, newQty);
    if (res.success) {
      setItems(items.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
    }
    setLoading(null);
  };

  const handleRemove = async (itemId) => {
    setLoading(itemId);
    const res = await removeCartItem(itemId);
    if (res.success) {
      setItems(items.filter(item => item.id !== itemId));
      router.refresh();
    }
    setLoading(null);
  };

  const handleSizeChange = async (itemId, newSize) => {
    setLoading(itemId);
    const res = await updateCartItemSize(itemId, newSize);
    if (res.success) {
      setItems(items.map(item => item.id === itemId ? { ...item, size: newSize } : item));
    }
    setLoading(null);
  };

  const currentTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.cloth.finalPrice,
    0
  );

  if (items.length === 0) {
    return (
      <div className="bg-[#f2efe9] rounded-2xl p-8 text-center">
        <p className="text-gray-700 mb-4">
          You don&apos;t have any items in your cart yet.
        </p>
        <Link
          href="/AllCloth"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#FF8A00] transition"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 bg-[#f2efe9] rounded-xl p-4 relative group"
          >
            <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-lg overflow-hidden bg-white shrink-0">
              <Image
                src={item.cloth.image}
                alt={item.cloth.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide">
                    {item.cloth.name}
                  </h2>
                  <p className="text-xs text-gray-500">{item.cloth.category}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={loading === item.id}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {loading === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">SIZE:</span>
                  <select
                    value={item.size}
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    disabled={loading === item.id}
                    className="bg-transparent text-xs font-bold focus:outline-none border-b border-black/20"
                  >
                    {item.cloth.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">QTY:</span>
                  <div className="flex items-center gap-2 bg-white/50 rounded-full px-2 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={loading === item.id || item.quantity <= 1}
                      className="p-1 hover:bg-black hover:text-white rounded-full transition disabled:opacity-30"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={loading === item.id}
                      className="p-1 hover:bg-black hover:text-white rounded-full transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-sm font-bold text-black mt-2">
                ₹{item.cloth.finalPrice.toLocaleString()} each
              </p>
            </div>

            <div className="flex flex-col items-end justify-center sm:border-l border-black/5 sm:pl-4 min-w-[100px]">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total</p>
              <p className="text-lg font-black text-orange-600">
                ₹{(item.quantity * item.cloth.finalPrice).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#f2efe9] rounded-2xl p-6 h-fit sticky top-24">
        <h2 className="text-lg font-bold mb-6 border-b border-black/10 pb-2 uppercase tracking-tighter">
          Order Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold">₹{currentTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-bold">FREE</span>
          </div>
          <div className="border-t border-black/10 pt-4" />
          <div className="flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="text-orange-600">₹{currentTotal.toLocaleString()}</span>
          </div>
        </div>
        <Link
          href="/Checkout"
          className="block w-full mt-8 py-4 rounded-full bg-black text-white text-center text-sm font-bold hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-orange-200"
        >
          PROCEED TO CHECKOUT
        </Link>
        <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest">
          Secure payment • 7-day returns • Flux Original
        </p>
      </div>
    </div>
  );
}
