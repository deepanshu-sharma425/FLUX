'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      <nav
        className="
          fixed top-0 left-0 z-50 w-full
          flex items-center justify-between
          px-4 sm:px-6 md:px-12
          py-3 sm:py-4 md:py-6
          bg-[#f6ecdf]/80 backdrop-blur-md border-b border-black/5
        "
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
        <div className="flex items-center gap-3 sm:gap-6">
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
            <div className="flex items-center gap-4">
              <Link href="/Account" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <User2 className="w-4 h-4 cursor-pointer" />
                </div>
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">
                  {authUser.name?.split(' ')[0] || 'Account'}
                </span>
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors hidden sm:block">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/Components/login" className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <User2 className="w-4 h-4 cursor-pointer" />
            </Link>
          )}

          <div className="md:hidden cursor-pointer w-8 h-8 flex items-center justify-center" onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </nav>

      {open && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#f6ecdf] flex flex-col p-6 md:hidden"
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-extrabold text-2xl tracking-tighter">FLUX</h2>
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center cursor-pointer" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </div>
          </div>

          <div className="flex flex-col gap-8 text-left mt-4">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter hover:text-orange-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-6">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-5 rounded-[24px] border border-black/5"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH..."
                className="bg-transparent text-sm font-black w-full outline-none uppercase tracking-widest"
              />
              <button type="submit">
                <Search className="w-6 h-6" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-4">
              {authUser ? (
                <>
                  <Link 
                    href="/Account" 
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-[20px] font-black uppercase tracking-widest text-[10px]"
                  >
                    <User2 className="w-4 h-4" />
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-4 border-2 border-black rounded-[20px] font-black uppercase tracking-widest text-[10px]"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/Components/login" 
                  onClick={() => setOpen(false)}
                  className="col-span-2 flex items-center justify-center gap-2 py-4 bg-black text-white rounded-[20px] font-black uppercase tracking-widest text-[10px]"
                >
                  <User2 className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;