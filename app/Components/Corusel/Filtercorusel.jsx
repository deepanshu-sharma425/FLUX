import React from "react";
import { prisma } from "../../../lib/prisma";
import FiltercoruselClient from "./Filtercoruselclient";
import productsFallback from "../Asset";

export default async function Filtercorusel() {
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
    console.error("Database query failed in Filtercorusel, using fallback:", error.message);
    products = productsFallback;
  }

  return <FiltercoruselClient products={products} />;
}
