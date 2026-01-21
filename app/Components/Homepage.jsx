'use client';

import Image from 'next/image';

const Homepage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden font-[SF_Pro_Display]">

      {/* Background FLUX text */}
      <h1 className="absolute inset-0 flex items-center justify-between px-20 
                     text-[22rem] font-black text-orange-500 
                     select-none pointer-events-none z-0">
        <span>F</span>
        <span>L</span>
        <span>U</span>
        <span>X</span>
      </h1>

      {/* Image + Caption Wrapper */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-32">

        {/* Center Image */}
        <Image
          src="/Asset/hero.png"
          alt="Flux Collection"
          width={1100}
          height={900}
          className="object-contain"
          priority
        />

        {/* Caption BELOW image */}
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold tracking-wide">
            WINTER COLLECTION DROP
          </h2>
          <p className="mt-2 text-sm tracking-[0.3em] opacity-70">
            UNITED IN URBAN
          </p>
        </div>

      </div>

    </section>
  );
};

export default Homepage;
