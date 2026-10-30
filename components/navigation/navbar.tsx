"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home", num: "01" },
    { href: "#about", label: "About", num: "02" },
    { href: "#services", label: "Services", num: "03" },
    { href: "#projects", label: "Projects", num: "04" },
    { href: "#process", label: "Process", num: "05" },
    { href: "#contact", label: "Contact", num: "06" },
  ];

  const handleScroll = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Container motion variants for staggered child pop-up
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.18,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  // Item pop-up variants: rising from below with a bouncy spring
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 340,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -25,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };


  return (
    <>
      {/* Floating Center Hamburger / Close Button */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.button
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            y: -7,
            boxShadow: "0 14px 35px rgba(0,0,0,0.18)",
          }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto flex items-center justify-center w-14 h-9 rounded-2xl bg-[#faf8f2] border border-[#141210]/15 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer group"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? (
            <X className="w-4 h-4 text-[#141210]" />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="w-4 h-[1.5px] bg-[#141210] group-hover:w-5 transition-all" />
              <span className="w-4 h-[1.5px] bg-[#141210] group-hover:w-3 transition-all" />
            </div>
          )}
        </motion.button>
      </header>

      {/* Full-Screen Minimalist Overlay Menu with Pop-up & Floating Elements */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#faf8f2] flex flex-col items-center justify-center px-6 overflow-hidden select-none"
          >
            {/* Subtle atmospheric dot matrix */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(#141210 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Staggered Navigation Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 flex flex-col items-center gap-3 sm:gap-5 text-center my-auto"
            >
              {navLinks.map((link, idx) => {
                // Alternating float patterns: even indices drift gently vertical, odd horizontal
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    animate={{
                      y: isEven ? [0, -6, 0] : [0, 5, 0],
                      x: !isEven ? [0, -4, 0] : [0, 4, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5 + idx * 0.4,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.12,
                      x: 10,
                      transition: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                    className="relative group cursor-pointer"
                  >
                    <button
                      onClick={() => handleScroll(link.href)}
                      className="font-sans text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-[#141210] group-hover:text-[#d97134] transition-colors duration-300 flex items-baseline gap-3 sm:gap-5 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-mono text-[#6b6259]/60 group-hover:text-[#d97134] transition-colors">
                        {link.num}
                      </span>
                      <span>{link.label}</span>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Social Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="relative z-10 pb-8 flex items-center gap-8 text-xs font-mono text-[#6b6259]"
            >
              <a
                href="https://github.com/mohitsharma-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#141210] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mohit-kumar-877713289"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#141210] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#141210] transition-colors"
              >
                Twitter
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

