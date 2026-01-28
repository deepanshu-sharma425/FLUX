// "use client";
import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
// import products from "@/Components/Asset";

export default  async function AllCloth() {
  const products = await prisma.cloth.findMany();
  

  return (
    <>

      <Navbar />
      <div className="h-24" />


      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-20">
        <div className="max-w-7xl mx-auto">


          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-wide">
              ALL PRODUCTS
            </h1>
            <p className="text-gray-600 mt-2">
              Explore our full streetwear collection
            </p>
          </div>


          <div className="flex gap-3 mb-12 flex-wrap">
            {["All", "Hoodies", "Shirts", "Cargos", "Caps"].map((item) => (
              <button
                key={item}
                className="border px-5 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                href={`/Cloth/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="relative bg-[#f2efe9] rounded-xl p-5 hover:shadow-xl transition">

       
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <Heart className="w-4 h-4" />
                  </button>


                  <div className="relative w-full h-[260px] mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition duration-500"
                    />
                  </div>


                  <h3 className="text-sm font-bold uppercase tracking-wide">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>


                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-bold text-sm">
                      ₹{product.finalPrice}
                    </span>
                    {product.discount && (
                      <span className="text-xs line-through text-gray-400">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
