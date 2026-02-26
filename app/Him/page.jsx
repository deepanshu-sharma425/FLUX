import Navbar from "@/Components/Navbar";
import { prisma } from "../../lib/prisma";
import HimGrid from "./HimGrid";
export default  async function Him() {
  const products = await prisma.cloth.findMany({
    where:{sex:"Male"}
  });
  return (
    <>

      <Navbar />
      <div className="h-24" />

      <HimGrid products={products} />
    </>
  );
}
