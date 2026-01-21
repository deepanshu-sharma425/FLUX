'use client';


import Image from 'next/image';
const Homepage = () => {
  return (
    <section className="relative h-screen  flex items-center justify-center overflow-hidden ">

  
      <h1 className="absolute z-10 text-[18rem] md:text-[22rem] font-black tracking-[0.15em] text-orange-500/90 select-none">
        FLUX
      </h1>


      <Image
      src="/Asset/hero.jpg"
      
      alt="Flux Collection"
      width={900}
      height={900}
      className="relative z-20 max-h-[80vh] w-auto object-contain"
      priority
/>



      <div className="absolute bottom-16 z-30 text-center">
        <h2 className="text-3xl font-bold tracking-wide">
          WINTER COLLECTION DROP
        </h2>
        <p className="mt-2 text-sm tracking-[0.3em] opacity-70">
          UNITED IN URBAN
        </p>
      </div>

    </section>
  );
}


export default Homepage