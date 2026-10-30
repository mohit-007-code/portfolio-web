"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations:
  // 1. Image scale: shrinks from full (1.1) to minimized/zoomed-out (0.88)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.88]);
  // 2. Image border radius: rounds gently as user scrolls
  const imageRadius = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  // 3. Image Y parallax: drifts smoothly
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // 4. Foreground text opacity & Y drift
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative isolate pt-3 md:pt-5"
    >
      {/* Outer rounded card container */}
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[44px] bg-[#141210] text-[#faf8f2] mx-3 md:mx-6 lg:mx-10 ring-1 ring-white/10 min-h-[92vh] md:min-h-[96vh] flex flex-col justify-between shadow-2xl">
        
        {/* Background Portrait Image with scroll-driven minimization effect */}
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            borderRadius: imageRadius,
          }}
          className="absolute inset-0 z-0 overflow-hidden will-change-transform origin-center"
        >
          <Image
            src="/hero-portrait.jpg"
            alt="Mohit"
            fill
            priority
            className="object-cover object-right md:object-center opacity-85 transition-opacity duration-700"
          />

          {/* Cinematic Vignette Overlays for crisp foreground text legibility */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,18,16,0.3) 0%, rgba(20,18,16,0.08) 30%, rgba(20,18,16,0.6) 75%, rgba(20,18,16,0.96) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,18,16,0.88) 0%, rgba(20,18,16,0.5) 45%, rgba(20,18,16,0.1) 75%, rgba(20,18,16,0.45) 100%)",
            }}
          />
        </motion.div>

        {/* Top-Right Floating Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { delay: 0.4, duration: 0.8 },
            scale: { delay: 0.4, duration: 0.8 },
            y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.06, y: -8 }}
          className="absolute z-20 top-8 right-6 md:top-12 md:right-12 cursor-pointer select-none"
        >
          <div className="relative flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-[#141210]/65 backdrop-blur-md px-4 py-2.5 shadow-2xl hover:border-emerald-400/50 hover:bg-[#141210]/85 transition-all duration-300">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#faf8f2]/60">
              STATUS
            </span>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-tight text-[#faf8f2]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Work
            </span>
          </div>
        </motion.div>

        {/* Center / Left Main Foreground Typography with Parallax Drift */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-14 lg:px-20 pt-36 pb-12 md:pb-16 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-2 text-base md:text-xl text-[#f4efe4]/90 font-normal mb-3 md:mb-4 tracking-tight select-none"
          >
            
            <span>Hello, I&apos;m</span>
          </motion.div>

          {/* Huge Display Name with Magnetic Scale on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { delay: 0.35, duration: 1 },
              y: { repeat: Infinity, duration: 5.5, ease: "easeInOut" },
            }}
            className="w-fit pointer-events-auto"
          >
            <motion.h1
              whileHover={{
                scale: 1.025,
                x: 8,
                textShadow: "0 10px 45px rgba(255,255,255,0.22)",
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="text-[clamp(4.8rem,15vw,14.5rem)] leading-[0.88] tracking-[-0.05em] font-extrabold text-[#faf8f2] hover:text-[#f4efe4] font-sans cursor-pointer select-none transition-colors duration-300"
            >
              Mohit
            </motion.h1>
          </motion.div>

          {/* Subtitle / Specialization Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-base sm:text-xl md:text-2xl text-[#f4efe4]/85 font-light max-w-2xl mt-4 leading-relaxed font-sans"
          >
            AI Systems Developer crafting high-performance,
            cinematic digital products.
          </motion.p>

          {/* Bottom Interactive Tags & Quick CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#f4efe4]/80 pointer-events-auto select-none"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#141210]/60 backdrop-blur-md px-3.5 py-1.5 text-[#faf8f2] hover:border-emerald-400/50 hover:bg-[#141210]/80 transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI &amp; BACKEND
            </span>
            <span className="text-white/30 hidden sm:inline">/</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[#f4efe4] hover:bg-white/10 transition-colors">
              NEXT.JS 16 · REACT 19
            </span>
            <span className="text-white/30 hidden md:inline">/</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[#f4efe4] hover:bg-white/10 transition-colors">
              PYTHON · LLMs · FASTAPI
            </span>

            <button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf8f2] text-[#141210] font-bold text-xs uppercase tracking-wider hover:bg-[#d97134] hover:text-white transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              <span>View Works</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom-Right Floating Profile Card with Hover Scaling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -7, 0],
          }}
          transition={{
            opacity: { delay: 0.85, duration: 0.8 },
            y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
          className="absolute z-20 bottom-6 right-6 md:bottom-10 md:right-12 hidden sm:flex items-center gap-3 bg-[#faf8f2] text-[#141210] rounded-2xl p-3 shadow-2xl border border-black/5 cursor-pointer transition-shadow"
        >
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#141210] shrink-0">
            <Image
              src="/hero-portrait.jpg"
              alt="Mohit"
              fill
              className="object-cover object-center hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="space-y-0.5 pr-2">
            <div className="font-semibold text-sm leading-tight">Mohit</div>
            <div className="text-[10px] font-mono text-[#6b6259] uppercase tracking-wider">
              AI &amp; Web Developer
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-1 px-2.5 py-0.5 rounded-full bg-[#141210] text-[#faf8f2] text-[9px] font-mono uppercase tracking-wider hover:bg-[#d97134] transition-colors cursor-pointer"
            >
              • Contact
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
