import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="px-1 sm:px-2 h-full">
      <div className="group relative h-full overflow-hidden bg-[#f2efe9] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-200">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Quick Action Button (Hidden by default, shown on hover) */}
          <div className="absolute top-4 right-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-full hover:bg-white hover:text-black text-white transition-colors cursor-pointer">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-1 mb-2">
            <p className="text-xs font-medium tracking-[0.2em] text-orange-400 uppercase">
              {product.category || "Streetwear"}
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide line-clamp-1 group-hover:text-orange-100 transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
            <p className="text-sm text-gray-300 line-clamp-2 mb-3 font-light leading-relaxed">
              {product.description || "Signature FLUX design."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2">
            <span className="font-mono text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              ₹{product.finalPrice?.toLocaleString() ?? product.price?.toLocaleString()}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-0.5">
              View Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
