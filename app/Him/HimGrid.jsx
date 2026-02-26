"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function HimGrid({ products }) {
  const [addingId, setAddingId] = useState(null);

  const handleAddToCart = async (product) => {
    const defaultSize = product.sizes?.[0];
    if (!defaultSize) return;

    const payload = {
      clothId: product.id,
      size: defaultSize,
      color: product.color,
      quantity: 1,
    };

    setAddingId(product.id);

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
      }
    } catch {
      // ignore for now
    } finally {
      setAddingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide">
            ALL PRODUCTS
          </h1>
          <p className="text-gray-600 mt-2">
            Explore our full streetwear collection
          </p>
        </div>

        <div className="flex gap-3 mb-12 flex-wrap">
          {["All", "Hoodies", "Shirts", "Cargos", "Caps"].map((item) => (
            <button
              key={item}
              className="border px-5 py-2 text-sm hover:bg-black hover:text-white transition"
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link
                href={`/Cloth/${product.id}`}
                className="group block h-full"
              >
                <div className="relative bg-[#f2efe9] rounded-xl p-5 hover:shadow-xl transition h-full">
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <Heart className="w-4 h-4" />
                  </button>

                  <div className="relative w-full h-[260px] mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      height={400}
                      width={400}
                      className="object-contain w-full h-full group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wide">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-bold text-sm">
                      ₹{product.finalPrice}
                    </span>
                    {product.discount && (
                      <span className="text-xs line-through text-gray-400">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="mt-3 w-full text-sm font-semibold border bg-black text-white py-2 rounded-full hover:bg-[#FF8A00] transition disabled:opacity-60"
                disabled={addingId === product.id}
              >
                {addingId === product.id ? "ADDING..." : "ADD TO CART"}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

