"use client";

import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Story from "./Story";
import { motion } from "framer-motion";
import HomeFooter from "./Footer/HomeFotter";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const Homepage = ({ corusel, filterCorusel }) => {
  return (
    <>
      <section className="relative min-h-screen bg-[#f6ecdf] overflow-hidden flex flex-col items-center justify-center pt-24 sm:pt-32">
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <Link href="/" className="pointer-events-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-[40vw] sm:text-[30vw] font-black tracking-tighter text-black leading-none hover:opacity-10 transition-opacity cursor-pointer"
            >
              FLUX
            </motion.h1>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[350px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] aspect-[4/5] sm:aspect-[16/9] mb-8 sm:mb-12"
          >
            <Image
              src="/Asset/hero.png"
              alt="Flux Collection"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            />
            
            {/* Floating Glass Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] -left-2 sm:left-10 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl z-20"
              style={{
                backdropFilter: "blur(20px) saturate(200%)",
                WebkitBackdropFilter: "blur(20px) saturate(200%)",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">New Drop</p>
                  <p className="text-xs sm:text-sm font-bold tracking-tight text-black">Winter &apos;26</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center space-y-4 sm:space-y-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Elevate Your <br />
                <span className="text-orange-500">Street Game.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em]"
            >
              Defining Urban Excellence since 2026
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6"
            >
              <Link href="/AllCloth" className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-black text-white rounded-2xl sm:rounded-[24px] overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                <div className="relative z-10 flex items-center justify-center gap-3 font-black text-[10px] sm:text-xs uppercase tracking-widest">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              
              <Link
                href="/AllCloth"
                className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-5 text-black border-2 border-black/5 rounded-2xl sm:rounded-[24px] flex items-center justify-center gap-3 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:border-black transition-all"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.6)",
                }}
              >
                View Lookbook
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-400 rotate-90 translate-y-8">Scroll</span>
        </motion.div>
      </section>

      {/* Carousel with scroll reveal */}
      <ScrollReveal variant="fadeUp" delay={0.1}>
        {corusel}
      </ScrollReveal>

      <Story />

      <ScrollReveal variant="blurIn" delay={0.1}>
        {filterCorusel}
      </ScrollReveal>

      <HomeFooter />
    </>
  );
};

export default Homepage;
