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

  return (
    <section className="py-6 md:py-10 bg-[#f6ecdf]">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
        <Slider {...settings}>
          {products.map((product) => (
            <Link href={`/Cloth/${product.id}`} key={product.id} className="block h-full">
              <ProductCard product={product} />
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoruselClient;
