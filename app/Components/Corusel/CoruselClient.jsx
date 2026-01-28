"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <Link href={`/Cloth/${product.id}`} key={product.id}>
              <div className="px-1 sm:px-2">
                <div className="group relative overflow-hidden bg-[#f2efe9] rounded-xl">
                  <div className="relative h-[300px] sm:h-[420px] md:h-[520px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="absolute bottom-6 left-5 right-5 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                      {product.name.toUpperCase()}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-200 mt-1">
                      {product.description}
                    </p>

                    <button className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-[#FF8A00] transition">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoruselClient;
