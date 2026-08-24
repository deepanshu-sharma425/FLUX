
import React from "react";
import { prisma } from "../../../lib/prisma";

import FiltercoruselClient from "./Filtercoruselclient";

export default async function Filtercorusel() {
  let products = [];
  try {
    products = await prisma.cloth.findMany();
  } catch (error) {
    console.error("Database connection failed in Filtercorusel:", error.message);
    products = [];
  }

  return <FiltercoruselClient products={products} />;
}
