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
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-40">
        <AllClothClient products={products} />
      </section>
    </>
  );
}
