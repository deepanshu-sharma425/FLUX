"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all hidden lg:flex"
  >
    <ArrowLeft className="w-4 h-4" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all hidden lg:flex"
  >
    <ArrowRight className="w-4 h-4" />
  </button>
);

export default function FiltercoruselClient({ products }) {
  const [selectedTab, setSelectedTab] = useState("latest");

  const filteredProducts = products.filter(
    (product) => product.about?.toLowerCase() === selectedTab.toLowerCase()
  );

  const settings = {
    dots: true,
    dotsClass: "slick-dots flux-dots",
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 4,
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3, arrows: false, dots: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false, dots: true } },
      { breakpoint: 480, settings: { slidesToShow: 1.1, arrows: false, dots: false } },
    ],
  };

  const tabs = [
    { key: "latest", label: "Latest" },
    { key: "trending", label: "Best Sellers" },
    { key: "sale", label: "Sale" },
  ];

  return (
    <section className="bg-[#f6ecdf] py-10 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
              Curated <span className="text-orange-500">Selection</span>
            </h2>
            <p className="text-gray-500 mt-1 text-[9px] sm:text-xs font-bold uppercase tracking-widest">
              Handpicked for the streets
            </p>
          </motion.div>

          {/* Tab pills */}
          <div className="flex gap-1 p-1 bg-black/5 rounded-2xl self-start shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedTab === tab.key
                    ? "bg-black text-white shadow-md"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-1 sm:-mx-2">
          <AnimatePresence mode="wait">
            {filteredProducts.length ? (
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <Slider {...settings}>
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
                      <Link href={`/Cloth/${product.id}`} className="block h-full">
                        <ProductCard product={product} />
                      </Link>
                    </div>
                  ))}
                </Slider>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 sm:py-20 bg-black/5 rounded-[32px] border border-dashed border-gray-300 mx-2"
              >
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
                  No products available in this category
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
