"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Story = () => {
  return (
    <section className="relative isolate w-full min-h-[85vh] sm:min-h-[100vh] overflow-hidden">
      
      {/* Background Image with Parallax-like effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/storypage.png"
          alt="Flux Story"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[85vh] sm:min-h-[100vh] px-6 sm:px-10 md:px-20 lg:px-40">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[10px] font-black tracking-[0.5em] text-orange-500 uppercase mb-4">Our DNA</p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Built <br /> From the <br /> <span className="text-gray-400/50">Streets</span>
            </h1>

            <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed font-medium max-w-xl">
              <p>
                FLUX was born from movement — from the noise of the city, the grind
                of concrete streets, and the people who choose momentum over comfort.
                Every piece we create reflects raw energy, resilience, and everyday utility.
              </p>

              <p>
                Designed with purpose and built for durability, our clothing is made
                to move with you. From early mornings to late nights, from quiet streets
                to crowded cities, FLUX adapts without losing form or function.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center gap-6"
            >
              <span className="text-2xl tracking-[0.5em] font-black">FLUX</span>
              <div className="w-20 h-[1px] bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">EST. 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Side Text */}
      <div className="absolute right-10 bottom-20 hidden lg:block overflow-hidden h-[400px]">
        <motion.p
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[10rem] font-black text-white/5 uppercase tracking-tighter vertical-text leading-none select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          STREETWEAR CULTURE FLUX MOVEMENT
        </motion.p>
      </div>
    </section>
  );
};

export default Story;
