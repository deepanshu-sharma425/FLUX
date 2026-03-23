"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

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

const CoruselClient = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 3.5, arrows: false },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, arrows: false },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2.2, arrows: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1.5, arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1.1, arrows: false },
      },
    ],
  };

  return (
    <section className="py-12 sm:py-20 bg-[#f6ecdf] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] text-orange-500 uppercase mb-1 sm:mb-2">Featured</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">Trending <span className="text-gray-300">Now</span></h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/AllCloth" className="group flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:text-orange-600 transition-colors">
            <span className="hidden sm:inline">View All</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <Link href={`/Cloth/${product.id}`} className="block h-full">
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoruselClient;
