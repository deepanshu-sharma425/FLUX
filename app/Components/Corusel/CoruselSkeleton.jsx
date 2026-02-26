import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CoruselSkeleton = () => {
  return (
    <section className="py-6 md:py-10 bg-[#f6ecdf]">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-1 sm:px-2">
              <div className="group relative overflow-hidden bg-[#f2efe9] rounded-xl">
                <div className="relative h-[300px] sm:h-[420px] md:h-[520px]">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="absolute bottom-6 left-5 right-5">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
                  <Skeleton className="h-4 w-full mb-1 bg-gray-300" />
                  <Skeleton className="h-4 w-1/2 bg-gray-300" />
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-5 w-16 bg-gray-300" />
                    <Skeleton className="h-5 w-20 bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoruselSkeleton;
