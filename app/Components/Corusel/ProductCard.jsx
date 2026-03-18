"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import WishlistButton from "../WishlistButton";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="px-2 h-full py-4"
    >
      <div className="group relative bg-[#f2efe9] rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 border border-gray-100/50 hover:border-black/5 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f2efe9]">
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-contain p-6 mix-blend-multiply"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-5 left-5 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-lg">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-5 right-5 z-10">
            <WishlistButton productId={product.id} />
          </div>

          {/* Quick Action Button */}
          <div className="absolute bottom-5 right-5 z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white p-3.5 rounded-2xl shadow-xl cursor-pointer hover:bg-orange-600 transition-colors duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <p className="text-[10px] font-black tracking-[0.25em] text-gray-400 uppercase mb-1.5">
              {product.category || "COLLECTION"}
            </p>
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-black transition-colors line-clamp-1 uppercase tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {product.discount > 0 && (
                <span className="text-xs line-through text-gray-400 font-medium mb-0.5">
                  ₹{product.price?.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-black text-black tracking-tighter">
                ₹{product.finalPrice?.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-black transition-colors duration-300">
              <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-orange-500 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
