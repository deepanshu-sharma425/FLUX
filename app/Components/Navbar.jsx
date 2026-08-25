'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCartIcon, User2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

  const categories = [
    { label: "All", href: "/AllCloth" },
    { label: "Her", href: "/Her" },
    { label: "Him", href: "/Him" },
    { label: "Unisex", href: "/Unisex" },
  ];
  
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && data.authenticated) {
          setAuthUser(data.user);
        }
      } catch {
        // ignore
      }
    };
    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`
          fixed top-0 left-0 z-50 w-full
          flex items-center justify-between
          px-4 sm:px-6 md:px-12
          py-3 sm:py-4 md:py-5
          transition-all duration-500
          ${scrolled
            ? "glass-light shadow-lg"
            : "bg-transparent"
          }
        `}
      >
        <Link href={'/'}>
          <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl">
            FLUX
          </h2>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {categories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-lg cursor-pointer hover:opacity-70 transition relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <form
          onSubmit={handleSearch}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white/60 backdrop-blur-md border-black/10"
              : "bg-[#f2efe9] border-black/5"
          }`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-sm focus:outline-none placeholder:text-gray-400 w-32 lg:w-40"
          />
          <button type="submit">
            <Search className="w-4 h-4 cursor-pointer" />
          </button>
        </form>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/Cart">
            <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-orange-500 transition-colors" />
          </Link>
          {authUser ? (
            <Link href="/Account" className="flex items-center gap-2">
              <User2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-orange-500 transition-colors" />
              <span className="hidden sm:inline text-xs font-mono">
                {authUser.name || authUser.email}
              </span>
            </Link>
          ) : (
            <Link href="/Components/login">
              <User2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-orange-500 transition-colors" />
            </Link>
          )}

          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu with glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              background: "rgba(240, 230, 217, 0.85)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="font-extrabold text-2xl">FLUX</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleSearch}
              className="px-6 pb-4"
            >
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-black/5">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products"
                  className="bg-transparent text-sm flex-1 focus:outline-none"
                />
              </div>
            </form>

            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {categories.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-mono tracking-wide cursor-pointer hover:opacity-70 transition"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;