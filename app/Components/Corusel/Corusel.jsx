import { prisma } from "../../../lib/prisma";
import CoruselClient from "./CoruselClient";

const Corusel = async () => {
  const products = await prisma.cloth.findMany();

  return(
    <>
     <CoruselClient products={products} />
    </>)
  
};

export default Corusel;
