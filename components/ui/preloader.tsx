"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_LETTERS = ["M", "O", "H", "I", "T"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [displayLetters, setDisplayLetters] = useState<string[]>(["A", "A", "A", "A", "A"]);
  const [isLocked, setIsLocked] = useState<boolean[]>([false, false, false, false, false]);
  const [allSettled, setAllSettled] = useState(false);

  useEffect(() => {
    // Timings for locking each letter in sequence:
    // Slot 0 (M): ~0.7s
    // Slot 1 (O): ~1.3s
    // Slot 2 (H): ~1.9s
    // Slot 3 (I): ~2.5s
    // Slot 4 (T): ~3.1s
    const lockTimes = [700, 1300, 1900, 2500, 3100];
    const startTime = Date.now();

    // 1. Rapid Alphabet Scrambler Interval
    const scramblerTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;

      setDisplayLetters((prev) => {
        return prev.map((char, index) => {
          if (elapsed >= lockTimes[index]) {
            return TARGET_LETTERS[index];
          }
          // Rapid random letter cycle
          return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        });
      });

      setIsLocked((prev) => {
        return prev.map((locked, index) => elapsed >= lockTimes[index]);
      });

      if (elapsed >= lockTimes[4]) {
        clearInterval(scramblerTimer);
        setDisplayLetters([...TARGET_LETTERS]);
        setIsLocked([true, true, true, true, true]);
        setAllSettled(true);
      }
    }, 45); // rapid scramble every 45ms

    // 2. Smooth 1 to 100 Counter across ~4.8 seconds
    const totalCountDuration = 4800;
    const intervalTime = 35;
    const totalSteps = totalCountDuration / intervalTime;
    let currentStep = 0;

    const countTimer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(countTimer);
        // Hold smoothly at 100% and float before lifting shutter at ~5.5s
        setTimeout(() => {
          setLoading(false);
        }, 650);
      }
    }, intervalTime);

    return () => {
      clearInterval(scramblerTimer);
      clearInterval(countTimer);
    };
  }, []);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.15,
              ease: [0.77, 0, 0.175, 1], // Smooth shutter roll-up ease
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#141210] text-[#faf8f2] px-6 sm:px-12 py-10 select-none overflow-hidden"
        >
          {/* Subtle noise/grid ambient layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(250,248,242,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,248,242,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Top Row: Boutique Telemetry */}
          <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#faf8f2]/60 uppercase">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#d97134] animate-pulse" />
              <span>MOHIT STUDIOS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:block"
            >
              <span>SYS.2026 // PORTFOLIO INTRO</span>
            </motion.div>
          </div>

          {/* Center: Rapid Alphabet Scrambler into Settled Floating "M O H I T" */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            
            {/* The whole name container floats gently once all letters settle */}
            <motion.div
              animate={
                allSettled
                  ? {
                      y: [0, -12, 0],
                      rotate: [0, 0.5, -0.5, 0],
                    }
                  : { y: 0 }
              }
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center gap-3 sm:gap-7 md:gap-11 py-4 select-none"
            >
              {displayLetters.map((char, index) => {
                const locked = isLocked[index];

                return (
                  <motion.div
                    key={index}
                    animate={
                      locked
                        ? {
                            scale: [1.2, 1],
                            color: ["#d97134", "#faf8f2"],
                          }
                        : {}
                    }
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative flex items-center justify-center min-w-[1.2ch]"
                  >
                    <span
                      className={`inline-block text-6xl sm:text-8xl md:text-[10.5rem] font-extrabold tracking-[-0.04em] font-sans drop-shadow-2xl transition-colors ${
                        locked ? "text-[#faf8f2]" : "text-[#faf8f2]/40"
                      }`}
                    >
                      {char}
                    </span>

                    {/* Subtle glow dot underneath each character once settled */}
                    {locked && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-2 sm:-bottom-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#d97134]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Sub-label reveal after all characters lock */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={allSettled ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-xs sm:text-sm font-mono tracking-[0.35em] sm:tracking-[0.5em] uppercase text-[#d97134] mt-6 font-medium"
            >
              AI &amp; FULL-STACK DEVELOPER
            </motion.p>
          </div>

          {/* Bottom Row: 1 to 100 Counter & Precision Progress Line */}
          <div className="relative z-10 flex flex-col gap-3 max-w-sm sm:max-w-md w-full mx-auto pb-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#faf8f2]/60 tracking-wider">
              <span>INITIALIZING ARCHIVE</span>
              <span className="font-semibold text-lg text-[#faf8f2] font-mono tabular-nums">
                {count}%
              </span>
            </div>

            <div className="h-[2px] w-full bg-[#faf8f2]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d97134] to-[#faf8f2] transition-all duration-75 ease-out"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



