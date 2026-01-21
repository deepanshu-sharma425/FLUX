'use client';

import Image from 'next/image';

const Homepage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden font-[SF_Pro_Display]">

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

      {/* Image + Caption Wrapper */}
      <div
        className="
          relative z-20 flex flex-col items-center justify-center
          min-h-screen
          pt-24 sm:pt-28 md:pt-32
          px-4
        "
      >
        {/* Center Image */}
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

        {/* Caption BELOW image */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center px-2">
          <h2
            className="
              text-lg sm:text-xl md:text-3xl
              font-bold tracking-wide
            "
          >
            WINTER COLLECTION DROP
          </h2>
          <p
            className="
              mt-2 text-[0.65rem] sm:text-xs md:text-sm
              tracking-[0.25em] opacity-70
            "
          >
            UNITED IN URBAN
          </p>
        </div>
      </div>

    </section>
  );
};

export default Homepage;
