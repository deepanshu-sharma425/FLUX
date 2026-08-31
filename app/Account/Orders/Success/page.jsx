'use client';

import React from "react";
import Navbar from "@/Components/Navbar";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-20 sm:pt-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#f2efe9] p-10 rounded-[40px] shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Order Placed!
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Thank you for your purchase. Your order has been placed successfully and will be processed soon.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/Account/Orders"
              className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-[#FF8A00] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              View Orders
            </Link>
            
            <Link
              href="/AllCloth"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black border-2 border-black rounded-full font-bold text-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
