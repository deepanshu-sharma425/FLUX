import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import AllClothClient from "../AllCloth/AllClothClient";
import productsFallback from "@/Components/Asset";

export default async function Her() {
  let products = [];
  try {
    const dbProducts = await prisma.cloth.findMany({
      where: { sex: "Female" },
    });
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((product) => ({
        ...product,
        createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
        updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
      }));
    } else {
      products = productsFallback.filter(
        (p) => p.sex === "Female" || p.sex === "Unisex"
      );
    }
  } catch (error) {
    console.error("Database query failed in Her, using fallback:", error.message);
    products = productsFallback.filter(
      (p) => p.sex === "Female" || p.sex === "Unisex"
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-40">
        <AllClothClient products={products} title="FOR HER" />
      </section>
    </>
  );
}
