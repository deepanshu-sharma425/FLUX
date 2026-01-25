import Image from "next/image";

const Story = () => {
  return (
    <section className="relative isolate w-full min-h-[85vh] sm:min-h-[70vh] mt-10">
      
      {/* Background Image */}
      <Image
        src="/storypage.png"
        alt="Flux Story"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[85vh] sm:min-h-[70vh] px-6 sm:px-10 md:px-20 font-mono">
        <div className="max-w-4xl text-white">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-widest">
            Built From the Streets
          </h1>

          <p className="mt-6 text-sm sm:text-base text-gray-200 leading-relaxed">
            FLUX was born from movement — from the noise of the city, the grind
            of concrete streets, and the people who choose momentum over comfort.
            Every piece we create reflects raw energy, resilience, and everyday utility.
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Designed with purpose and built for durability, our clothing is made
            to move with you. From early mornings to late nights, from quiet streets
            to crowded cities, FLUX adapts without losing form or function.
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            This isn’t seasonal fashion or fast trends. It’s everyday wear,
            refined through motion, tested in real life, and shaped by streets
            that never slow down.
          </p>

          <span className="block mt-10 text-lg tracking-[0.4em] font-semibold">
            FLUX
          </span>

        </div>
      </div>
    </section>
  );
};

export default Story;
