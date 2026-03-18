"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const WishlistButton = ({ productId, initialIsWishlisted = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the item is in the wishlist on mount
    const checkWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist");
        if (res.ok) {
          const data = await res.json();
          const found = data.items.some((item) => item.clothId === productId);
          setIsWishlisted(found);
        }
      } catch (error) {
        // Just ignore errors here to avoid console noise for guests
      }
    };
    checkWishlist();
  }, [productId]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clothId: productId }),
      });

      if (res.status === 401) {
        router.push("/Components/login");
        return;
      }

      if (res.ok) {
        setIsWishlisted(!isWishlisted);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full transition-all duration-300 ${
        isWishlisted
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white text-gray-400 hover:text-red-500 hover:bg-gray-50"
      }`}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          isWishlisted ? "fill-red-500 text-red-500 scale-110" : "scale-100"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
