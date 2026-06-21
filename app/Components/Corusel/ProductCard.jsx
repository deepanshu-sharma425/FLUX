"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import WishlistButton from "../WishlistButton";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="px-1.5 h-full py-3"
    >
      <div className="group relative bg-[#ede8e0] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition-all duration-700 border border-black/[0.03] hover:border-black/[0.06] flex flex-col h-full">

        {/* Image Container – square on mobile, portrait on larger screens */}
        <div className="relative w-full aspect-square sm:aspect-[4/5] overflow-hidden bg-[#ede8e0]">
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-contain p-4 sm:p-6 mix-blend-multiply"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-black text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full z-10 shadow-md">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10">
            <WishlistButton productId={product.id} />
          </div>

          {/* Quick-view arrow */}
          <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-10">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg cursor-pointer hover:bg-orange-600 transition-colors duration-300"
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <div className="mb-3 sm:mb-4">
            <p className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] text-gray-400 uppercase mb-1">
              {product.category || "COLLECTION"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight group-hover:text-black transition-colors line-clamp-1 uppercase tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {product.discount > 0 && (
                <span className="text-[10px] sm:text-xs line-through text-gray-400 font-medium mb-0.5">
                  ₹{product.price?.toLocaleString()}
                </span>
              )}
              <span className="text-lg sm:text-2xl font-black text-black tracking-tighter">
                ₹{product.finalPrice?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-400 group-hover:text-black transition-colors duration-300">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Details</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-orange-500 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
