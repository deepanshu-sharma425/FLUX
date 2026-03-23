"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import ProductCard from "@/Components/Corusel/ProductCard";
import { Loader2, Heart } from "lucide-react";
import Link from "next/link";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist");
        if (res.ok) {
          const data = await res.json();
          setWishlistItems(data.items);
        } else {
          // Handle unauthorized or other errors
          setWishlistItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-[96px] pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
              Your <span className="text-orange-500">Wishlist</span>
            </h1>
            <p className="text-gray-500 mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Items you love, all in one place</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-40">
              <Loader2 className="w-10 h-10 animate-spin text-gray-300" />
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-24 sm:py-40 bg-white/50 backdrop-blur-sm rounded-[32px] sm:rounded-[40px] border border-dashed border-gray-300 px-6">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-gray-300" />
              <p className="text-gray-400 font-black uppercase tracking-widest mb-8 text-xs sm:text-sm">Your wishlist is currently empty</p>
              <Link
                href="/AllCloth"
                className="inline-block px-10 py-5 bg-black text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:shadow-xl transition-all"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
              {wishlistItems.map((item) => (
                <Link href={`/Cloth/${item.cloth.id}`} key={item.id} className="block h-full">
                  <ProductCard product={item.cloth} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistPage;
