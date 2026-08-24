'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function FramerPage({ children }) {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    enter: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.3,
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
