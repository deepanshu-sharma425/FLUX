import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import AllClothClient from "../AllCloth/AllClothClient";

export default async function Him() {
  const products = await prisma.cloth.findMany({
    where: { sex: "Male" }
  });

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
        <AllClothClient products={serializableProducts} title="FOR HIM" />
      </section>
    </>
  );
}
