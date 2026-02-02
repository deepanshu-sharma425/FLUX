
import React from "react";
import { prisma } from "../../../lib/prisma";

import FiltercoruselClient from "./Filtercoruselclient";

export default async function Filtercorusel() {
  const products = await prisma.cloth.findMany();

  return <FiltercoruselClient products={products} />;
}
