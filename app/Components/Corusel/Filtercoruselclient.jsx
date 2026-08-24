"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Heart } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function FiltercoruselClient({ products }) {
  const [selectedTab, setSelectedTab] = useState("latest");

  const filteredProducts = products.filter(
    (product) => product.about === selectedTab
  );
  const visibleProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    swipe: true,
    arrows: true,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2, arrows: false } },
    ],
  };

  const isEmpty = !products || products.length === 0;
  const skeletonItems = [1, 2, 3, 4];

  return (
    <section className="bg-[#f6ecdf] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 mb-6 md:justify-center overflow-x-auto">
          {[
            { key: "latest", label: "Latest Arrivals" },
            { key: "bestsellers", label: "Best Sellers" },
            { key: "sale", label: "Sale" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-4 py-2 border font-bold ${
                selectedTab === tab.key
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isEmpty ? (
          <Slider {...settings}>
            {skeletonItems.map((i) => (
              <div key={i} className="px-2">
                <div className="relative bg-[#f2efe9] rounded-xl overflow-hidden animate-pulse">
                  <div className="relative h-[300px] bg-zinc-300/60" />
                  <div className="p-4">
                    <div className="h-3 w-2/3 bg-zinc-300/80 rounded mb-2" />
                    <div className="h-3 w-full bg-zinc-300/70 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-zinc-300/70 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {visibleProducts.map((product) => (
              <Link href={`/Cloth/${product.id}`} key={product.id}>
                <div className="px-2">
                  <div className="relative bg-[#f2efe9] rounded-xl overflow-hidden">
                    <button className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full">
                      <Heart className="w-4 h-4" />
                    </button>

                    <div className="relative h-[300px]">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-contain"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-bold uppercase line-clamp-1">
                        {product.name || "FLUX PIECE"}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {product.description ||
                          "Curated from the latest FLUX collection."}
                      </p>
                      <p className="mt-2 font-bold">
                        ₹{product.finalPrice ?? product.price ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
