import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Corusel from "./Components/Corusel/Corusel";
import Filtercorusel from "./Components/Corusel/Filtercorusel";
import CoruselSkeleton from "./Components/Corusel/CoruselSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Homepage 
        corusel={
          <Suspense fallback={<CoruselSkeleton />}>
            <Corusel />
          </Suspense>
        }
        filterCorusel={
          <Suspense fallback={<CoruselSkeleton />}>
            <Filtercorusel />
          </Suspense>
        }
      />
    </>
  );
}
