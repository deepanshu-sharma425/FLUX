"use client";

import React from "react";
import dynamic from "next/dynamic";
import products from "../Asset";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const Corusel = () => {
  const settings = {
  dots: false,
  arrows: true,         
  infinite: false,
  speed: 600,
  slidesToShow: 3,      
  slidesToScroll: 1,

  swipe: true,
  swipeToSlide: true,
  touchMove: true,
  draggable: true,
  cssEase: "ease-out",

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, 
      settings: {
        slidesToShow: 2,   
        arrows: false,     
      },
    },
  ],
};


  return (
    <section className="px-4 py-3 sm:py-6 md:py-10">


      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <div className="group relative overflow-hidden bg-[#f2efe9] rounded-xl">
                

                <div className="relative h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
                  <Image
                  width={100}
                  height={100}
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

                  <button
                    className="
                      mt-4
                      text-sm font-semibold
                      underline underline-offset-4
                      hover:text-[#FF8A00]
                      transition
                    "
                  >
                    SHOP NOW
                  </button>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Corusel;
