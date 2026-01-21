import { Search, ShoppingCartIcon, User2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full flex items-center justify-between px-12 py-6">
      
      {/* Logo */}
      <h2 className="font-extrabold text-3xl">
        FLUX
      </h2>

      {/* Menu */}
      <div className="flex gap-6">
        <p className="font-mono text-lg">BMX Rider</p>
        <p className="font-mono text-lg">Skateboarders</p>
        <p className="font-mono text-lg">Urban</p>
        <p className="font-mono text-lg">Powerups</p>
      </div>

      {/* Icons */}
      <div className="flex gap-4">
        <Search className="w-6 h-6 cursor-pointer" />
        <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
        <User2 className="w-6 h-6 cursor-pointer" />
      </div>

    </nav>
  );
};

export default Navbar;
