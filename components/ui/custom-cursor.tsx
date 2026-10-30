"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch screen devices
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("article") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.closest('[role="button"]') ||
        target?.closest(".cursor-pointer") ||
        target?.closest(".interactive-hover")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer Circle expands gracefully when hovering cards, links, and buttons */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#141210]/40 bg-[#e4ddcb]/50 backdrop-blur-xs pointer-events-none flex items-center justify-center will-change-transform"
        animate={{
          x: mousePos.x - (isHovered ? 34 : 16),
          y: mousePos.y - (isHovered ? 34 : 16),
          width: isHovered ? 68 : 32,
          height: isHovered ? 68 : 32,
          borderColor: isHovered ? "rgba(217, 113, 52, 0.85)" : "rgba(20, 18, 16, 0.4)",
          backgroundColor: isHovered ? "rgba(217, 113, 52, 0.18)" : "rgba(228, 221, 203, 0.45)",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 26, mass: 0.1 }}
      >
        {/* Inner Solid Dot in the center */}
        <motion.div
          animate={{
            scale: isHovered ? 0.6 : 1,
            backgroundColor: isHovered ? "#d97134" : "#141210",
          }}
          transition={{ duration: 0.2 }}
          className="w-1.5 h-1.5 rounded-full"
        />
      </motion.div>
    </div>
  );
}

