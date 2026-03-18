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
          absolute top-0 left-0 z-50 w-full
          flex items-center justify-between
          px-4 sm:px-6 md:px-12
          py-3 sm:py-4 md:py-6
        "
      >
        <Link href={'/'}><h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl">
          FLUX
        </h2></Link>

        <div className="hidden md:flex gap-6 items-center">
          {categories.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="font-mono text-lg cursor-pointer hover:opacity-70 transition"
        >
          {item.label}
        </Link>
      ))}
        </div>
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 bg-[#f2efe9] px-3 py-1.5 rounded-full border border-black/5"
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
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/Cart" className="relative">
            <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {authUser ? (
            <div className="flex items-center gap-4">
              <Link href="/Account" className="flex items-center gap-2">
                <User2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                <span className="hidden sm:inline text-xs font-mono">
                  {authUser.name || authUser.email}
                </span>
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-black transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/Components/login">
              <User2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
            </Link>
          )}

          <div className="md:hidden cursor-pointer" onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] bg-[#f6ecdf] flex flex-col p-6 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-extrabold text-2xl">FLUX</h2>
            <X
              className="w-8 h-8 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-6 text-center mt-10">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-mono hover:opacity-70 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-10 left-10 right-10 space-y-4">
            {authUser && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-red-500 text-red-500 rounded-[24px] font-black uppercase tracking-widest text-xs"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-gray-100 p-5 rounded-[24px]"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH..."
                className="bg-transparent text-sm font-black w-full outline-none"
              />
              <Search className="w-6 h-6" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;