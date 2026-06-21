"use client";
import Image from "next/image";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const HomeFooter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { user_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Partners strip */}
      <div className="w-full bg-[#f6ecdf] py-14 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-black tracking-tighter text-3xl sm:text-5xl md:text-6xl uppercase mb-10 sm:mb-16"
        >
          OUR <span className="text-orange-500">PARTNERS</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 items-center justify-items-center opacity-40 hover:opacity-100 transition-opacity duration-700"
        >
          {[
            { src: "/Asset/image.png", alt: "Adidas", w: 100, h: 60 },
            { src: "/Asset/image2.png", alt: "Nike", w: 100, h: 60 },
            { src: "/Asset/image3.png", alt: "Puma", w: 120, h: 60 },
            { src: "/Asset/image4.png", alt: "Skechers", w: 100, h: 60 },
          ].map(({ src, alt, w, h }) => (
            <motion.div
              key={alt}
              whileHover={{ scale: 1.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-500"
            >
              <Image src={src} alt={alt} width={w} height={h} className="object-contain w-20 sm:w-28 h-auto" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tighter mb-3 sm:mb-5">FLUX</h2>
              <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                Built from the streets.{" "}
                <span className="block">Designed for movement.</span>
              </p>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-5 tracking-[0.2em] uppercase text-gray-400">
                Products
              </h3>
              <ul className="space-y-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
                {["Streetwear", "Hoodies", "Shirts", "Cargos"].map((item) => (
                  <li key={item} className="hover:text-white transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
                <li className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">Sale</li>
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-5 tracking-[0.2em] uppercase text-gray-400">
                Collections
              </h3>
              <ul className="space-y-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
                {["Winter Drop '25", "United in Urban", "Adrenaline Series"].map((item) => (
                  <li key={item} className="hover:text-white transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-5 tracking-[0.2em] uppercase text-gray-400">
                Support
              </h3>
              <ul className="space-y-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
                {["Help Center", "Returns", "Shipping"].map((item) => (
                  <li key={item} className="hover:text-white transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter + Social */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-5 tracking-[0.2em] uppercase text-gray-400">
                Stay Connected
              </h3>

              <form onSubmit={handleSubscribe} className="flex rounded-xl overflow-hidden border border-white/10 mb-3">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-[11px] text-black bg-[#f6ecdf] outline-none placeholder:text-gray-500 min-w-0"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 py-2.5 bg-orange-500 text-white text-xs font-black hover:bg-orange-400 transition-colors shrink-0 disabled:opacity-60"
                >
                  →
                </button>
              </form>

              {status === "success" && (
                <p className="text-green-400 text-[10px] font-bold mb-3">Thanks for subscribing ⚡</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-[10px] font-bold mb-3">Something went wrong. Try again.</p>
              )}

              <div className="flex gap-4 mt-4 text-gray-500">
                {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                  <button
                    key={i}
                    className="hover:text-white transition-colors"
                    aria-label="Social link"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 sm:mt-16 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <span>© {new Date().getFullYear()} FLUX</span>
            <span>Built for motion.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
