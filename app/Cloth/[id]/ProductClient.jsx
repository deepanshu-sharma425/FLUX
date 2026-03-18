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
    <section className="bg-[#f6ecdf] min-h-screen px-4 py-16 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden">
            {product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              height={400}
              width={400}
              className="object-contain w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-wide uppercase">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">
                {product.category}
              </p>
            </div>
            <WishlistButton productId={product.id} />
          </div>

          <p className="text-2xl font-bold flex items-center gap-3">
            ₹{product.finalPrice}

            {product.price > product.finalPrice && (
              <>
                <span className="text-sm line-through text-gray-400">
                  ₹{product.price}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-orange-400 text-orange-400"
              />
            ))}
            <span className="text-sm text-gray-500">(200 reviews)</span>
          </div>

          <div>
            <p className="font-semibold mb-2">SIZE</p>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`border py-2 transition ${
                    selectedSize === s
                      ? "border-black bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-orange-600 transition disabled:opacity-60 rounded-xl"
            >
              {adding ? "ADDING..." : "ADD TO CART"}
            </button>
          </div>

          <button className="w-full border py-3 hover:bg-black hover:text-white transition">
            BUY IT NOW
          </button>

          {message && (
            <p className="text-sm text-gray-700 pt-2">{message}</p>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

