import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const q = (searchParams?.q || "").toString().trim();

  let products = [];

  if (q) {
    const normalized = q.toLowerCase();
    let sexFilter = null;

    if (["male", "him", "men"].includes(normalized)) {
      sexFilter = "Male";
    } else if (["female", "her", "women"].includes(normalized)) {
      sexFilter = "Female";
    } else if (["unisex", "all"].includes(normalized)) {
      sexFilter = "Unisex";
    }

    const orFilters = [
      {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        category: {
          contains: q,
          mode: "insensitive",
        },
      },
    ];

    if (sexFilter) {
      orFilters.push({
        sex: sexFilter,
      });
    }

    products = await prisma.cloth.findMany({
      where: {
        OR: orFilters,
      },
    });
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-wide">
              Search
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Showing results for <span className="font-semibold">“{q || "All"}”</span>
            </p>
          </div>

          {!q && (
            <p className="text-sm text-gray-600 mb-6">
              Type in the search bar above to find products by name, category, or vibe.
            </p>
          )}

          {q && products.length === 0 && (
            <p className="text-sm text-gray-600">
              No products found. Try a different search term.
            </p>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {products.map((product) => (
                <Link
                  href={`/Cloth/${product.id}`}
                  key={product.id}
                  className="group"
                >
                  <div className="relative bg-[#f2efe9] rounded-xl p-5 hover:shadow-xl transition">
                    <div className="relative w-full h-[260px] mb-4 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        height={400}
                        width={400}
                        className="object-contain w-full h-full group-hover:scale-105 transition duration-500"
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
          )}
        </div>
      </section>
    </>
  );
}

