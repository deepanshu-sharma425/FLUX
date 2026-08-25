'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCartIcon, User2, Menu, X, Heart, LogOut } from "lucide-react";
import { getCartCount, getWishlistCount } from "@/actions/cart";

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
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    const loadUserAndCart = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && data.authenticated) {
          setAuthUser(data.user);
          const [cCount, wCount] = await Promise.all([
            getCartCount(),
            getWishlistCount()
          ]);
          setCartCount(cCount);
          setWishlistCount(wCount);
        }
      } catch {
        // ignore
      }
    };
    loadUserAndCart();

    const handleCartUpdate = async () => {
      const [cCount, wCount] = await Promise.all([
        getCartCount(),
        getWishlistCount()
      ]);
      setCartCount(cCount);
      setWishlistCount(wCount);
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      cancelled = true;
      window.removeEventListener("cart-updated", handleCartUpdate);
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setAuthUser(null);
        setCartCount(0);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          py-3 sm:py-4 md:py-6
          transition-all duration-500
          ${scrolled
            ? "bg-[#f6ecdf]/70 backdrop-blur-xl shadow-lg border-b border-black/5"
            : "bg-[#f6ecdf]/80 backdrop-blur-md border-b border-black/5"
          }
        `}
      >
        <Link href={'/'}><h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tighter">
          FLUX
        </h2></Link>

        <div className="hidden md:flex gap-8 items-center">
          {categories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-black text-xs uppercase tracking-widest cursor-pointer hover:text-orange-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 bg-black/5 px-4 py-2 rounded-2xl border border-black/5 focus-within:bg-white focus-within:border-black/20 transition-all"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH..."
            className="bg-transparent text-[10px] font-black tracking-widest focus:outline-none placeholder:text-gray-400 w-32 xl:w-48 uppercase"
          />
          <button type="submit">
            <Search className="w-3.5 h-3.5 cursor-pointer text-gray-400 hover:text-black transition-colors" />
          </button>
        </form>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link href="/wishlist" className="relative group">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full shadow-lg">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/Cart" className="relative group">
            <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 text-white text-[8px] font-black flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
          {authUser ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/Account" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <User2 className="w-4 h-4 cursor-pointer" />
                </div>
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">
                  {authUser.name?.split(' ')[0] || 'Account'}
                </span>
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/Components/login" className="hidden md:flex w-8 h-8 rounded-full bg-black/5 items-center justify-center hover:bg-black hover:text-white transition-colors">
              <User2 className="w-4 h-4 cursor-pointer" />
            </Link>
          )}

          {/* Hamburger – mobile only */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black hover:text-white transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99] bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[85vw] max-w-sm bg-[#f6ecdf] flex flex-col p-6 md:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-extrabold text-2xl tracking-tighter">FLUX</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-2">
                {categories.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-black/5 text-2xl font-black uppercase tracking-tighter hover:text-orange-500 transition-colors group"
                    >
                      <span>{item.label}</span>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-orange-400 transition-colors">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="mt-auto space-y-4">
                {/* Search */}
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-black/5"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="SEARCH..."
                    className="bg-transparent text-xs font-black w-full outline-none uppercase tracking-widest"
                  />
                  <button type="submit">
                    <Search className="w-5 h-5 text-gray-500" />
                  </button>
                </form>

                {/* Auth buttons */}
                {authUser ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/Account"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                    >
                      <User2 className="w-4 h-4" />
                      Account
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setOpen(false); }}
                      className="flex items-center justify-center gap-2 py-4 border-2 border-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/Components/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] w-full"
                  >
                    <User2 className="w-4 h-4" />
                    Sign In
                  </Link>
                )}

                {/* Social row */}
                <p className="text-[9px] text-center font-bold uppercase tracking-[0.3em] text-gray-400 pt-2">
                  © {new Date().getFullYear()} FLUX — Built for Motion.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;