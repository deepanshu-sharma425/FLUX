import { prisma } from "../../../lib/prisma";
import React from "react";
import CoruselClient from "./CoruselClient";
import productsFallback from "../Asset";

const Corusel = async () => {
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
    console.error("Database query failed in Corusel, using fallback:", error.message);
    products = productsFallback;
  }

  return <CoruselClient products={products} />;
};

export default Corusel;
