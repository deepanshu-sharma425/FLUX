import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import AllClothClient from "../AllCloth/AllClothClient";
import productsFallback from "@/Components/Asset";

export default async function Unisex() {
  let products = [];
  try {
    const dbProducts = await prisma.cloth.findMany({
      where: { sex: "Unisex" },
    });
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((product) => ({
        ...product,
        createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
        updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
      }));
    } else {
      products = productsFallback.filter((p) => p.sex === "Unisex");
    }
  } catch (error) {
    console.error("Database query failed in Unisex, using fallback:", error.message);
    products = productsFallback.filter((p) => p.sex === "Unisex");
  }

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-40">
        <AllClothClient products={products} title="UNISEX" />
      </section>
    </>
  );
}
