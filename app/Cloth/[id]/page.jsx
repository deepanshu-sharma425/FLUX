import Navbar from "@/Components/Navbar";
import { prisma } from "../../../lib/prisma";

// import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {

  const { id } = await params;  // unwrapped 
  

  const numericId = Number(id);

  if (!numericId || Number.isNaN(numericId)) {
    notFound();
  }

  const product = await prisma.cloth.findUnique({
    where: { id: numericId },
  });

  if (!product) {
    notFound();
  }

  const discountPercentage =
    product.discount ??
    Math.round(
      ((product.price - product.finalPrice) / product.price) * 100
    );

  return (
    <>
      <Navbar />

      <div className="h-24" />

      <section className="bg-[#f6ecdf] min-h-screen px-4 py-16 font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">


          <div className="w-full">
            <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden">
              {product.discount && (
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                fill
                height={400}
                width={400}
                className="object-contain"
              />
            </div>
          </div>

       
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-wide">
              {product.name}
            </h1>

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
                    className="border py-2 hover:border-black transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

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
