import Image from "next/image";

const Story = () => {
  return (
    <section className="relative w-full h-[70vh] mt-10">
  
  {/* Background Image */}
  <Image
    src="/storypage.png"
    alt="Flux Story"
    fill
    priority
    className="object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 " />

  {/* Text Wrapper (FIX HERE 👇) */}
  <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-20">
    
    <div className="max-w-4xl text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-widest">
        Built From the Streets
      </h1>

      <p className="mt-6 text-sm sm:text-base text-gray-200 leading-relaxed">
        Designed for movement, crafted for durability, and inspired by
        the raw energy of urban culture.
      </p>
    </div>

  </div>
</section>
  );
};

export default Story;
