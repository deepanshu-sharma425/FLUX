// "use client";

import { ArrowBigRight } from "lucide-react";
// import { useState } from "react";
import Image from "next/image";
import Corusel from "./Corusel/Corusel";
import Filtercorusel from "./Corusel/Filtercorusel";
import Story from "./Story";

import HomeFooter from "./Footer/HomeFotter";

const Homepage = () => {
  

  return (
    <>

      <section
        className="
          relative overflow-hidden font-[SF_Pro_Display]
          bg-[#f6ecdf]
          sm:min-h-[100svh]
        "
      >

        <h1
          className="
            hidden sm:flex
            absolute
            top-[12%] md:top-[18%]
            left-0 right-0
            justify-between
            px-10 md:px-20
            text-[10rem] md:text-[18rem] lg:text-[22rem]
            font-black text-orange-500/90
            select-none pointer-events-none z-0
          "
        >
          <span>F</span>
          <span>L</span>
          <span>U</span>
          <span>X</span>
        </h1>

      
        <div
          className="
            relative z-20
            flex flex-col items-center
            pt-10 sm:pt-24 md:pt-32
            px-4
          "
        >
   
          <Image
            src="/Asset/hero.png"
            alt="Flux Collection"
            width={1100}
            height={900}
            priority
            className="
              w-full
              max-w-[240px]
              sm:max-w-[420px]
              md:max-w-[650px]
              lg:max-w-[900px]
              xl:max-w-[1100px]
              object-contain
            "
          />


          <div className="mt-5 sm:mt-8 text-center">
            <h2 className="text-base sm:text-xl md:text-3xl font-extrabold tracking-wide">
              WINTER COLLECTION DROP
            </h2>

            <p className="mt-2 text-[0.6rem] sm:text-xs md:text-sm tracking-[0.25em] opacity-70 font-medium">
              UNITED IN URBAN
            </p>
          </div>


          <div className="mt-5 sm:mt-8">
            <div
              className="
                group flex items-center justify-center gap-2
                px-5 py-2.5 sm:px-6 sm:py-3
                rounded-full
                bg-orange-400
                hover:bg-zinc-900
                transition-all duration-300
                cursor-pointer
              "
            >
              <span className="text-xs sm:text-sm md:text-base text-black group-hover:text-white font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">
                Shop the Winter Collection
              </span>

              <ArrowBigRight
                className="
                  w-4 h-4 sm:w-5 sm:h-5
                  text-black group-hover:text-white
                  transition-all duration-300
                  group-hover:translate-x-1
                "
              />
            </div>
          </div>
        </div>
      </section>
      {/* <Corusel /> */}
      <Filtercorusel/>
      <Story/>
      <HomeFooter/>
    </>
  );
};

export default Homepage;
