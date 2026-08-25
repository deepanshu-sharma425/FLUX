"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const tabs = [
    { key: "latest", label: "Latest Arrivals" },
    { key: "bestsellers", label: "Best Sellers" },
    { key: "sale", label: "Sale" },
  ];

  return (
    <section className="bg-[#f6ecdf] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Animated Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 mb-6 md:justify-center overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`relative px-4 py-2 font-bold transition-all duration-300 ${
                selectedTab === tab.key
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black/5"
              }`}
            >
              {tab.label}
              {selectedTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-black -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

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
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Slider {...settings}>
                {visibleProducts.map((product, index) => (
                  <Link href={`/Cloth/${product.id}`} key={product.id}>
                    <motion.div
                      className="px-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                    >
                      <div className="relative bg-[#f2efe9] rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <button className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-black/60 hover:text-red-500 transition-colors"
                          style={{
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            background: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        >
                          <Heart className="w-4 h-4" />
                        </button>

                        {product.discount > 0 && (
                          <div
                            className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{
                              backdropFilter: "blur(8px)",
                              background: "rgba(255,138,0,0.75)",
                              border: "1px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            -{product.discount}%
                          </div>
                        )}

                        <div className="relative h-[300px]">
                          <img
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold uppercase line-clamp-1">
                            {product.name || "FLUX PIECE"}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                            {product.description ||
                              "Curated from the latest FLUX collection."}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <p className="font-bold">
                              ₹{product.finalPrice ?? product.price ?? "—"}
                            </p>
                            {product.price !== product.finalPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                ₹{product.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </Slider>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
