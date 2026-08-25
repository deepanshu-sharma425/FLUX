
import React from "react";
import { prisma } from "../../../lib/prisma";

import FiltercoruselClient from "./Filtercoruselclient";

export default async function Filtercorusel() {
  const products = await prisma.cloth.findMany();
  const serializableProducts = products.map(product => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return <FiltercoruselClient products={serializableProducts} />;
}
