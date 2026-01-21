'use client';

import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';

const Homepage = () => {
  return (
    <section className="relative overflow-hidden font-[SF_Pro_Display] min-h-[100svh]">

      {/* Background FLUX text */}
      <h1
        className="
          absolute inset-0 flex items-center justify-between 
          px-6 sm:px-10 md:px-20
          text-[6rem] sm:text-[10rem] md:text-[18rem] lg:text-[22rem]
          font-black text-orange-500/90
          select-none pointer-events-none z-0
        "
      >
        <span>F</span>
        <span>L</span>
        <span>U</span>
        <span>X</span>
      </h1>

      {/* Main content */}
      <div
        className="
          relative z-20 flex flex-col items-center justify-start
          min-h-[100svh]
          pt-16 sm:pt-24 md:pt-32
          px-4
        "
      >
        {/* Image */}
        <Image
          src="/Asset/hero.png"
          alt="Flux Collection"
          width={1100}
          height={900}
          className="
            w-full
            max-w-[280px]
            sm:max-w-[420px]
            md:max-w-[650px]
            lg:max-w-[900px]
            xl:max-w-[1100px]
            object-contain
          "
          priority
        />

        {/* Text + CTA */}
        <div className="mt-5 sm:mt-8 md:mt-10 flex flex-col items-center gap-3 text-center px-2">
          <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-wide">
            WINTER COLLECTION DROP
          </h2>

          <p className="text-[0.65rem] sm:text-xs md:text-sm tracking-[0.25em] opacity-70 font-medium">
            UNITED IN URBAN
          </p>

          {/* CTA */}
          <div
            className="
              group mt-3 flex items-center justify-center gap-2
              px-5 py-2.5 sm:px-6 sm:py-3
              rounded-full
              bg-orange-400
              hover:bg-zinc-900
              transition-all duration-300
              cursor-pointer
            "
          >
            <button className="text-xs sm:text-sm md:text-base text-black group-hover:text-white font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">
              Shop the Winter Collection
            </button>
            <ArrowBigRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
