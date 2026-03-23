"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import WishlistButton from "@/Components/WishlistButton";

export default function ProductClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] ?? ""
  );
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const discountPercentage =
    product.discount ??
    Math.round(
      ((product.price - product.finalPrice) / product.price) * 100
    );

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setMessage("Please select a size");
      return;
    }

    setAdding(true);
    setMessage("");

    const payload = {
      clothId: product.id,
      size: selectedSize,
      color: product.color,
      quantity: 1,
    };

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        if (typeof window !== "undefined") {
          const raw = window.localStorage.getItem("flux_cart");
          let items = [];
          try {
            items = JSON.parse(raw || "[]");
            if (!Array.isArray(items)) items = [];
          } catch {
            items = [];
          }

          const existingIndex = items.findIndex(
            (item) =>
              item.clothId === payload.clothId &&
              item.size === payload.size &&
              item.color === payload.color
          );

          if (existingIndex >= 0) {
            items[existingIndex].quantity += payload.quantity;
          } else {
            items.push(payload);
          }

          window.localStorage.setItem("flux_cart", JSON.stringify(items));
        }
        setMessage("Added to cart (guest)");
        return;
      }

      if (!res.ok) {
        setMessage("Could not add to cart");
        return;
      }

      setMessage("Added to cart");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
        router.refresh();
      }
    } catch {
      setMessage("Could not add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <section className="bg-[#f6ecdf] min-h-screen px-4 py-8 sm:py-16 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <div className="relative w-full aspect-square bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            {product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                {product.discount}% OFF
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full p-4 sm:p-8"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6 sm:gap-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-none">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-2 sm:mt-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {product.category}
              </p>
            </div>
            <div className="shrink-0">
              <WishlistButton productId={product.id} />
            </div>
          </div>

          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="text-3xl sm:text-4xl font-black text-black tracking-tighter">
              ₹{product.finalPrice?.toLocaleString()}
            </span>

            {product.price > product.finalPrice && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm sm:text-base line-through text-gray-400 font-bold">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-md">
                  SAVE {discountPercentage}%
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-400 text-orange-400"
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">(200 verified reviews)</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Select Size</p>
              <button className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 underline underline-offset-4 hover:text-black">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedSize === s
                      ? "bg-black text-white shadow-xl ring-2 ring-black ring-offset-2"
                      : "bg-white border border-gray-100 text-gray-400 hover:border-black hover:text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 bg-black text-white py-4 sm:py-5 rounded-2xl sm:rounded-[24px] font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-orange-600 hover:shadow-xl transition-all disabled:opacity-60"
            >
              {adding ? "ADDING TO CART..." : "ADD TO CART"}
            </button>
            <button className="flex-1 border-2 border-black py-4 sm:py-5 rounded-2xl sm:rounded-[24px] font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-black hover:text-white transition-all">
              BUY IT NOW
            </button>
          </div>

          {message && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-widest text-orange-600 text-center"
            >
              {message}
            </motion.p>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

