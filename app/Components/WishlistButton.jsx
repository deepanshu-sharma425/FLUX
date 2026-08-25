"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

// Singleton cache for wishlist cloth IDs to avoid N parallel requests on grid pages
let wishlistCache = null;
let fetchPromise = null;

const getWishlistIds = async () => {
  if (wishlistCache !== null) return wishlistCache;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/wishlist")
    .then((res) => {
      if (res.ok) return res.json();
      return { items: [] };
    })
    .then((data) => {
      const ids = new Set((data.items || []).map((item) => item.clothId));
      wishlistCache = ids;
      fetchPromise = null;
      return ids;
    })
    .catch(() => {
      wishlistCache = new Set();
      fetchPromise = null;
      return wishlistCache;
    });

  return fetchPromise;
};

const WishlistButton = ({ productId, initialIsWishlisted }) => {
  const [isWishlisted, setIsWishlisted] = useState(
    initialIsWishlisted !== undefined ? initialIsWishlisted : false
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialIsWishlisted !== undefined) {
      setIsWishlisted(initialIsWishlisted);
      return;
    }

    let isMounted = true;
    getWishlistIds().then((ids) => {
      if (isMounted) {
        setIsWishlisted(ids.has(productId));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [productId, initialIsWishlisted]);

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
        const nextState = !isWishlisted;
        setIsWishlisted(nextState);
        if (wishlistCache) {
          if (nextState) wishlistCache.add(productId);
          else wishlistCache.delete(productId);
        }
        window.dispatchEvent(new Event("cart-updated"));
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
