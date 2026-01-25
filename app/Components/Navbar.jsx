'use client';
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCartIcon, User2, Menu, X } from "lucide-react";

const Navbar = () => {

  const categories = [
    { label: "All", href: "/AllCloth" },
    { label: "Skateboarders", href: "/category/skateboarders" },
    { label: "Urban", href: "/category/urban" },
    { label: "Powerups", href: "/category/powerups" },
  ];
  
  const [open, setOpen] = useState(false);

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

        <div className="hidden md:flex gap-6">
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
        <div className="flex items-center gap-3 sm:gap-4">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          <User2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#f0e6d9] flex flex-col">
       
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="font-extrabold text-2xl">FLUX</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-8">
  {categories.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      onClick={() => setOpen(false)}
      className="text-2xl font-mono tracking-wide cursor-pointer hover:opacity-70 transition"
    >
      {item.label}
    </Link>
  ))}
</div>

        </div>
      )}
    </>
  );
};

export default Navbar;