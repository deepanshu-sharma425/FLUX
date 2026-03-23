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
        {
          user_email: email, 
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>

      <div className="w-full bg-[#f6ecdf] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-black tracking-tighter text-3xl sm:text-5xl md:text-6xl uppercase mb-12 sm:mb-16"
        >
          OUR <span className="text-orange-500">PARTNERS</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-20 items-center justify-items-center opacity-40 hover:opacity-100 transition-opacity duration-700"
        >
          <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0%)" }} className="grayscale transition-all duration-500">
            <Image src="/Asset/image.png" alt="Adidas" width={100} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0%)" }} className="grayscale transition-all duration-500">
            <Image src="/Asset/image2.png" alt="Nike" width={100} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0%)" }} className="grayscale transition-all duration-500">
            <Image src="/Asset/image3.png" alt="Puma" width={120} height={60} className="object-contain sm:w-[160px] sm:h-[80px]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0%)" }} className="grayscale transition-all duration-500">
            <Image src="/Asset/image4.png" alt="sketchers" width={100} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
          </motion.div>
        </motion.div>
      </div>


      <footer className="bg-black text-white font-mono">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 sm:gap-12">
            <div className="sm:col-span-2 md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tighter mb-4 sm:mb-6">FLUX</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                Built from the streets. Designed for movement.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-6 tracking-[0.2em] uppercase text-gray-400">Products</h3>
              <ul className="space-y-2 sm:space-y-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
                <li className="hover:text-white transition-colors cursor-pointer">Streetwear</li>
                <li className="hover:text-white transition-colors cursor-pointer">Hoodies</li>
                <li className="hover:text-white transition-colors cursor-pointer">Shirts</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cargos</li>
                <li className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">Sale</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-black mb-4 sm:mb-6 tracking-[0.2em] uppercase text-gray-400">Collections</h3>
              <ul className="space-y-2 sm:space-y-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
                <li className="hover:text-white transition-colors cursor-pointer">Winter Drop ’25</li>
                <li className="hover:text-white transition-colors cursor-pointer">United in Urban</li>
                <li className="hover:text-white transition-colors cursor-pointer">Adrenaline Series</li>
              </ul>
            </div>


            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-widest">SUPPORT</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Returns</li>
                <li>Shipping</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-widest">
                STAY CONNECTED
              </h3>

              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-black bg-[#f6ecdf] outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 bg-orange-400 text-black font-semibold hover:bg-white transition"
                >
                  →
                </button>
              </form>

              {status === "success" && (
                <p className="text-green-500 text-xs mt-2">
                  Thanks for subscribing ⚡
                </p>
              )}

              {status === "error" && (
                <p className="text-red-500 text-xs mt-2">
                  Something went wrong.
                </p>
              )}

              <div className="flex gap-4 mt-6 text-gray-400">
                <Instagram />
                <Twitter />
                <Youtube />
                <Facebook />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-6 flex justify-between text-xs text-gray-500">
            <span>© {new Date().getFullYear()} FLUX</span>
            <span>Built for motion.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
