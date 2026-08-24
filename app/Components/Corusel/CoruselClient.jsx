"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const CoruselClient = ({ products }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    cssEase: "ease-out",
    arrows: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, arrows: true },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  const isEmpty = !products || products.length === 0;
  const skeletonItems = [1, 2, 3];

  return (
    <section className="py-6 md:py-10 bg-[#f6ecdf]">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
        <Slider {...settings}>
          {isEmpty
            ? skeletonItems.map((i) => (
                <div key={i} className="px-1 sm:px-2">
                  <div className="group relative overflow-hidden bg-[#f2efe9] rounded-xl animate-pulse">
                    <div className="relative h-[300px] sm:h-[420px] md:h-[520px] bg-zinc-300/60" />
                    <div className="absolute bottom-6 left-5 right-5">
                      <div className="h-4 w-2/3 bg-zinc-300/80 rounded mb-2" />
                      <div className="h-3 w-full bg-zinc-300/70 rounded mb-2" />
                      <div className="h-3 w-1/2 bg-zinc-300/70 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <Link
                  href={`/Cloth/${product.id}`}
                  key={product.id}
                  className="block h-full"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoruselClient;
