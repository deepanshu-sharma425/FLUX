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

  return (
    <section className="bg-[#f6ecdf] py-6 md:py-10">
      <div className="flex gap-2 px-4 mb-6 md:justify-center">
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

      <div className="max-w-7xl mx-auto px-4">
        {filteredProducts.length ? (
          <Slider {...settings}>
            {filteredProducts.map((product) => (
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
                      <h3 className="text-sm font-bold uppercase">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {product.description}
                      </p>
                      <p className="mt-2 font-bold">
                        ₹{product.finalPrice}
                      </p>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        ) : (
          <p className="text-center py-10">No products available</p>
        )}
      </div>
    </section>
  );
}
