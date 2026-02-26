import React from "react";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-800/80 ${className}`}
      {...props}
    />
  );
};

export { Skeleton };
