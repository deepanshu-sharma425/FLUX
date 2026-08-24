import { prisma } from "../../../lib/prisma";
import React from "react";
import CoruselClient from "./CoruselClient";
const Corusel = async () => {
  let products = [];
  try {
    products = await prisma.cloth.findMany();
  } catch (error) {
    console.error("Database connection failed in Corusel:", error.message);
    // Return empty array to prevent 500 error
    products = [];
  }

  return(
    <>
     <CoruselClient products={products} />
    </>) 
}
export default Corusel;
