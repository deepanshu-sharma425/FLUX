import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import AllClothClient from "./AllClothClient";
import productsFallback from "@/Components/Asset";

export default async function AllCloth() {
  let products = [];
  try {
    const dbProducts = await prisma.cloth.findMany();
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((product) => ({
        ...product,
        createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
        updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
      }));
    } else {
      products = productsFallback;
    }
  } catch (error) {
    console.error("Database query failed in AllCloth, using fallback:", error.message);
    products = productsFallback;
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-40">
        <AllClothClient products={products} />
      </section>
    </>
  );
}
