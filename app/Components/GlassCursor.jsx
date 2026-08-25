"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlassCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return interactiveElements;
    };

    // Initial setup + MutationObserver for dynamically added elements
    let elements = addHoverListeners();

    const observer = new MutationObserver(() => {
      // Clean up old listeners
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      elements = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main glass cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y }}
        animate={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-300 ${
            isHovering
              ? "bg-white/15 backdrop-blur-xl border-2 border-white/40 shadow-[0_0_30px_rgba(255,138,0,0.2)]"
              : "bg-white/8 backdrop-blur-lg border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          }`}
          style={{
            background: isHovering
              ? "radial-gradient(circle, rgba(255,138,0,0.12) 0%, rgba(255,255,255,0.08) 100%)"
              : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: useSpring(cursorX, { damping: 35, stiffness: 500, mass: 0.3 }),
          y: useSpring(cursorY, { damping: 35, stiffness: 500, mass: 0.3 }),
        }}
        animate={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="rounded-full bg-orange-400/80"
            animate={{
              width: isHovering ? 6 : 4,
              height: isHovering ? 6 : 4,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      </motion.div>
    </>
  );
}
