'use client';
import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';

const Homepage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden font-[SF_Pro_Display]">
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
      <div
        className="
          relative z-20 flex flex-col items-center justify-center
          min-h-screen
          pt-24 sm:pt-28 md:pt-32
          px-4
        "
      >
        <Image
          src="/Asset/hero.png"
          alt="Flux Collection"
          width={1100}
          height={900}
          className="
            w-full
            max-w-[320px]
            sm:max-w-[420px]
            md:max-w-[650px]
            lg:max-w-[900px]
            xl:max-w-[1100px]
            object-contain
          "
          priority
        />
        <div className="mt-6 flex flex-col gap-2 sm:mt-8 md:mt-10 text-center px-2">
          <h2
            className="text-lg sm:text-xl md:text-3xl font-extrabold  tracking-wide font-stretch-50%
            "
          >
            WINTER COLLECTION DROP
          </h2>
          <p
            className="
              mt-2 text-[0.65rem] sm:text-xs md:text-sm
              tracking-[0.25em] opacity-70 font-medium"
          >
            UNITED IN URBAN
          </p>
        <div
  className="
    group flex items-center justify-center gap-2
    px-6 py-3 rounded-full
    bg-orange-400
    hover:bg-zinc-900
    transition-all duration-300
    cursor-pointer
  "
>
  <button className="text-black group-hover:text-white font-medium tracking-wide transition-colors duration-300">
    Shop the Winter Collection
  </button>
  <ArrowBigRight className="text-black group-hover:text-white w-5 h-5 mt-[2px] transition-colors duration-300" />
</div>

      
        </div>
      </div>
      

    </section>
  );
};


export default Homepage;
