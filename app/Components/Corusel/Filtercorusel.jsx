"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Heart } from "lucide-react";
import products from "../Asset";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Filtercorusel = () => {
  const [selectedTab, setSelectedTab] = useState("latest");

  /* FILTER */
  const filteredProducts = products.filter(
    (product) => product.about === selectedTab
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToScroll: 1,

    arrows: true,
    slidesToShow: 4,

    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    cssEase: "ease-out",

    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          arrows: false, 
        },
      },
    ],
  };

  return (
    <section className="bg-[#f6ecdf] py-6 md:py-10">


      <div className="flex gap-2 overflow-x-auto px-4 mb-6 md:justify-center">
        {[
          { key: "latest", label: "Latest Arrivals" },
          { key: "bestsellers", label: "Best Sellers" },
          { key: "sale", label: "Sale" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`px-4 py-2 border font-mono font-bold whitespace-nowrap transition
              ${
                selectedTab === tab.key
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">

        {filteredProducts.length > 0 ? (
          <Slider {...settings}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="px-2">
                <div className="group relative bg-[#f2efe9] rounded-xl overflow-hidden">

             
                  <button className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-1.5 rounded-full hover:bg-white">
                    <Heart className="w-4 h-4 text-black" />
                  </button>

                  {/* Image */}
                  <div className="relative h-[260px] sm:h-[300px] md:h-[340px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

           
                  <div className="px-4 pb-4 pt-2 font-mono">
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-bold">
                        ₹{product.finalPrice}
                      </span>

                      {product.discount && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500 font-mono py-10">
            No products available.
          </div>
        )}

      </div>
    </section>
  );
};

export default Filtercorusel;
