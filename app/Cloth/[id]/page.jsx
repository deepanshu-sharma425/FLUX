import Navbar from "@/Components/Navbar";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export default async function ProductPage({ params }) {

  const { id } = await params;  // unwrapped 
  

  const numericId = Number(id);

  if (!numericId || Number.isNaN(numericId)) {
    notFound();
  }

  const product = await prisma.cloth.findUnique({
    where: { id: numericId },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <div className="pt-20 sm:pt-24" />
      <ProductClient product={product} />
    </>
  );
}
