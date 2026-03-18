"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "@/Components/Corusel/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";

const AllClothClient = ({ products, title = "STREETWEAR" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            FLUX <br /> <span className="text-orange-500">{title}</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm font-bold uppercase tracking-widest flex items-center gap-3">
            <span className="w-8 h-[2px] bg-black" />
            Collection {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Filter className="w-5 h-5" />
          </div>
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      {/* Categories with Hover Effects */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex gap-2 mb-16 overflow-x-auto pb-4 scrollbar-hide no-scrollbar"
      >
        {categories.map((item) => (
          <motion.button
            key={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(item)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              selectedCategory === item
                ? "bg-black text-white shadow-xl"
                : "bg-[#f2efe9] text-gray-400 hover:text-black hover:shadow-md border border-gray-100"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </motion.div>

      {/* Product Grid with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={selectedCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/Cloth/${product.id}`} className="block h-full">
                <ProductCard product={product} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-40 bg-white/50 rounded-[40px] border border-dashed border-gray-300"
        >
          <p className="text-gray-400 font-bold uppercase tracking-widest">No products found in this category</p>
        </motion.div>
      )}
    </div>
  );
};

export default AllClothClient;
