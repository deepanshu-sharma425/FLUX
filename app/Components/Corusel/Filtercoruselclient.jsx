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
    className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all hidden lg:flex"
  >
    <ArrowLeft className="w-5 h-5" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all hidden lg:flex"
  >
    <ArrowRight className="w-5 h-5" />
  </button>
);

export default function FiltercoruselClient({ products }) {
  const [selectedTab, setSelectedTab] = useState("latest");

  const filteredProducts = products.filter(
    (product) => product.about?.toLowerCase() === selectedTab.toLowerCase()
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    swipe: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 4,
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3.5, arrows: false } },
      { breakpoint: 1280, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 640, settings: { slidesToShow: 1.2, arrows: false } },
    ],
  };

  const tabs = [
    { key: "latest", label: "Latest Arrivals" },
    { key: "trending", label: "Best Sellers" },
    { key: "sale", label: "Sale" },
  ];

  return (
    <section className="bg-[#f6ecdf] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Curated <span className="text-orange-500">Selection</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-bold uppercase tracking-widest">Handpicked for the streets</p>
          </motion.div>

          <div className="flex gap-2 p-1 bg-black/5 rounded-[20px] self-start">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`px-6 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedTab === tab.key
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative -mx-2">
          <AnimatePresence mode="wait">
            {filteredProducts.length ? (
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Slider {...settings}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="px-2 h-full">
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
                className="text-center py-20 bg-black/5 rounded-[40px] border border-dashed border-gray-300 mx-2"
              >
                <p className="text-gray-400 font-bold uppercase tracking-widest">No products available in this category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
