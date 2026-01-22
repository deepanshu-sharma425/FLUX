'use client';

import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';
import products from './Asset';
const Homepage = () => {
  
  return (
    <>
    <section className="relative overflow-hidden font-[SF_Pro_Display] min-h-[100svh]">


      <h1
        className="
          absolute 
          /* Updated Positioning: Moves text up behind the models' heads/torsos */
          top-[10%] sm:top-[12%] md:top-[18%]
          left-0 right-0
          flex justify-between
          px-6 sm:px-10 md:px-20
          /* Font Sizes */
          text-[5rem] sm:text-[10rem] md:text-[18rem] lg:text-[22rem]
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
          relative z-20 flex flex-col items-center
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

        {/* Text */}
        <div className="mt-6 sm:mt-8 text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-wide">
            WINTER COLLECTION DROP
          </h2>

          <p className="mt-2 text-[0.65rem] sm:text-xs md:text-sm tracking-[0.25em] opacity-70 font-medium">
            UNITED IN URBAN
          </p>
        </div>

        {/* CTA — GUARDED ZONE */}
        <div className="mt-6 sm:mt-8">
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
            <button className="text-xs sm:text-sm md:text-base text-black group-hover:text-white font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">
              Shop the Winter Collection
            </button>
            <ArrowBigRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
    {products.map((e)=>{
      return(
      <div key={e.id}>
        <h1>{e.name}</h1>
        <h1>{e.price}</h1>
        <Image src={e.image} alt={e.name} width={500} height={500}/>
        <p>{e.color}</p>
      </div>)
    }       )}
    </>
  );
};

export default Homepage;