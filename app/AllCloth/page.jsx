import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import AllClothClient from "./AllClothClient";

export default async function AllCloth() {
  const products = await prisma.cloth.findMany();
  const serializableProducts = products.map(product => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-[96px] pb-40">
        <AllClothClient products={serializableProducts} />
      </section>
    </>
  );
}
