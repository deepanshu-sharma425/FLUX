import { prisma } from "../../../lib/prisma";
import React from "react";
import CoruselClient from "./CoruselClient";
const Corusel = async () => {
  const products = await prisma.cloth.findMany();
  const serializableProducts = products.map(product => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return(
    <>
     <CoruselClient products={serializableProducts} />
    </>) 
}
export default Corusel;
