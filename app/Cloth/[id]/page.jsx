"use client";

import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import products from "@/app/Components/Asset";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  // ✅ find product by id
  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  // ✅ fallback
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="h-32" />
        <div className="text-center font-mono text-lg">
          Product not found
        </div>
      </>
    );
  }

  // ✅ DISCOUNT LOGIC
  const discountPercentage =
    product.discount ??
    Math.round(((product.price - product.finalPrice) / product.price) * 100);

  return (
    <>
      <Navbar />
      {/* spacer to avoid navbar overlap */}
      <div className="h-24" />

      <section className="bg-[#f6ecdf] min-h-screen px-4 py-16 font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT – IMAGE */}
          {/* IMAGE */}
<div className="w-full">
  <div className="
    relative 
    w-full 
    aspect-square     /* ✅ KEY FIX */
    bg-white 
    rounded-xl 
    overflow-hidden
  ">
    
    {/* DISCOUNT BADGE */}
    {product.discount && (
      <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
        {product.discount}% OFF
      </span>
    )}

    <Image
      src={product.image}
      alt={product.name}
      width={200}
      height={200}
      priority
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
      className="object-contain"
    />
  </div>
</div>


          {/* RIGHT – DETAILS */}
          <div className="space-y-6">

            {/* TITLE */}
            <h1 className="text-3xl font-extrabold tracking-wide">
              {product.name}
            </h1>

            {/* PRICE */}
            <p className="text-2xl font-bold flex items-center gap-3">
              ₹{product.finalPrice}

              {product.price && product.finalPrice < product.price && (
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

            {/* RATING */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-orange-400 text-orange-400"
                />
              ))}
              <span className="text-sm text-gray-500">(200 reviews)</span>
            </div>

            {/* SIZE */}
            <div>
              <p className="font-semibold mb-2">SIZE</p>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className="border py-2 hover:border-black transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button className="flex-1 bg-black text-white py-3 hover:bg-[#FF8A00] transition">
                ADD TO CART
              </button>

              <button className="w-12 border flex items-center justify-center">
                <Heart />
              </button>
            </div>

            <button className="w-full border py-3 hover:bg-black hover:text-white transition">
              BUY IT NOW
            </button>

            {/* DESCRIPTION */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
