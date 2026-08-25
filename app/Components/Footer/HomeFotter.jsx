"use client";
import Image from "next/image";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../ScrollReveal";

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
      {/* Partners Section */}
      <div className="w-full bg-[#f6ecdf] py-12">
        <ScrollReveal variant="fadeUp">
          <h2 className="text-center font-mono font-bold tracking-widest text-xl sm:text-2xl md:text-3xl">
            OUR PARTNERS
          </h2>
        </ScrollReveal>

        <StaggerContainer className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center px-6" staggerDelay={0.12}>
          <StaggerItem variant="fadeUp">
            <Image src="/Asset/image.png" alt="Adidas" width={100} height={60} />
          </StaggerItem>
          <StaggerItem variant="fadeUp">
            <Image src="/Asset/image2.png" alt="Nike" width={100} height={60} />
          </StaggerItem>
          <StaggerItem variant="fadeUp">
            <Image src="/Asset/image3.png" alt="Puma" width={140} height={60} />
          </StaggerItem>
          <StaggerItem variant="fadeUp">
            <Image src="/Asset/image4.png" alt="Sketchers" width={100} height={60} />
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white font-mono">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10" staggerDelay={0.1}>
            <StaggerItem variant="fadeUp">
              <div>
                <h2 className="text-xl font-extrabold tracking-widest mb-4">FLUX</h2>
                <p className="text-sm text-gray-400">
                  Built from the streets. Designed for movement.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="fadeUp">
              <div>
                <h3 className="text-sm font-semibold mb-4 tracking-widest">PRODUCTS</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors">Streetwear</li>
                  <li className="hover:text-white transition-colors">Hoodies</li>
                  <li className="hover:text-white transition-colors">Shirts</li>
                  <li className="hover:text-white transition-colors">Cargos</li>
                  <li className="text-orange-400 hover:text-orange-300 transition-colors">Sale</li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem variant="fadeUp">
              <div>
                <h3 className="text-sm font-semibold mb-4 tracking-widest">COLLECTIONS</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors">Winter Drop &apos;25</li>
                  <li className="hover:text-white transition-colors">United in Urban</li>
                  <li className="hover:text-white transition-colors">Adrenaline Series</li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem variant="fadeUp">
              <div>
                <h3 className="text-sm font-semibold mb-4 tracking-widest">SUPPORT</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors">Help Center</li>
                  <li className="hover:text-white transition-colors">Returns</li>
                  <li className="hover:text-white transition-colors">Shipping</li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem variant="fadeUp">
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
                  <Instagram className="hover:text-white transition-colors" />
                  <Twitter className="hover:text-white transition-colors" />
                  <Youtube className="hover:text-white transition-colors" />
                  <Facebook className="hover:text-white transition-colors" />
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="border-t border-white/10 mt-16 pt-6 flex justify-between text-xs text-gray-500">
              <span>© {new Date().getFullYear()} FLUX</span>
              <span>Built for motion.</span>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
