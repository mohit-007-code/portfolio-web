"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface TechItem {
  name: string;
  category?: string;
  icon?: string;
}

const ROW_ONE: TechItem[] = [
  { name: "Python", category: "Core" },
  { name: "FastAPI", category: "API" },
  { name: "Gen AI", category: "LLMs" },
  { name: "Agentic AI", category: "Multi-Agent" },
  { name: "LangChain", category: "Framework" },
  { name: "LangGraph", category: "Orchestration" },
  { name: "Machine Learning", category: "Data Science" },
  { name: "Deep Learning", category: "Neural Nets" },
];

const ROW_TWO: TechItem[] = [
  { name: "Docker", category: "Containers" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Django", category: "Backend" },
  { name: "React.js", category: "Frontend" },
  { name: "Vercel", category: "Edge Platform" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Motion" },
];

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface MarqueeRowProps {
  items: TechItem[];
  baseVelocity: number;
  reverse?: boolean;
}

function MarqueeRow({ items, baseVelocity = 25, reverse = false }: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });
  
  // Transform scroll delta into extra speed multiplier
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionRef = useRef<number>(reverse ? -1 : 1);

  useAnimationFrame((t, delta) => {
    // Ultra-smooth, elegant cruising speed (reduced base step)
    let moveBy = directionRef.current * baseVelocity * (delta / 1000) * 0.4;

    // Gentle, controlled speed-up when scrolling
    const factor = velocityFactor.get();
    if (factor !== 0) {
      moveBy += directionRef.current * (delta / 1000) * Math.min(Math.abs(factor) * 2.5, 6);
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden w-full py-3 select-none">
      <motion.div className="flex whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((loopIdx) => (
          <div key={loopIdx} className="flex shrink-0 items-center">
            {items.map((tech, itemIdx) => (
              <span
                key={`${loopIdx}-${itemIdx}`}
                className="inline-flex items-center gap-6 px-6 sm:px-10 font-sans text-[clamp(2.4rem,6vw,5.5rem)] font-medium tracking-tight text-[#141210] hover:text-[#d97134] transition-colors cursor-pointer group"
              >
                <span>{tech.name}</span>
                <span className="inline-block h-2 w-2 rounded-full bg-[#d97134] opacity-80 group-hover:scale-150 transition-transform" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function StackMarqueeSection() {
  return (
    <section id="stack" className="relative isolate pt-8 md:pt-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-[#faf8f2] text-[#141210] ring-1 ring-black/5 px-6 md:px-12 lg:px-16 py-20 md:py-28">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#6b6259]">
            <span>(05)</span>
            <span className="h-[1px] w-6 bg-[#6b6259]/60" />
            <span>AI & TECH ARSENAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#141210] leading-tight font-sans">
            A modern, AI-native stack — refined for scale.
          </h2>

          <p className="text-sm sm:text-base text-[#6b6259] leading-relaxed max-w-xl">
            Engineered with modern autonomous frameworks, low-latency microservices, and reactive interfaces that accelerate velocity.
          </p>
        </div>

        {/* Dual Opposing Direction Continuous Marquees */}
        <div className="relative space-y-4 py-4 border-y border-[#141210]/10">
          {/* Top Marquee (Moving Left, calm & readable) */}
          <MarqueeRow items={ROW_ONE} baseVelocity={5} reverse={false} />

          {/* Bottom Marquee (Moving Right, Italic Tone matching Image 3) */}
          <div className="opacity-90 italic">
            <MarqueeRow items={ROW_TWO} baseVelocity={-4.5} reverse={true} />
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[
            { tag: "01", category: "Agentic AI & ML", tools: ["Python", "FastAPI", "LangChain", "LangGraph"] },
            { tag: "02", category: "Modern Web", tools: ["Next.js", "React 19", "Tailwind CSS", "TypeScript"] },
            { tag: "03", category: "Cloud & Systems", tools: ["Docker", "PostgreSQL", "Django", "Vercel"] },
            { tag: "04", category: "Motion & Craft", tools: ["Framer Motion", "Lenis", "GSAP", "Canvas"] },
          ].map((card) => (
            <div
              key={card.category}
              className="p-6 rounded-3xl bg-[#f2eee3] border border-[#141210]/10 hover:border-[#141210]/25 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#6b6259]">
                <span>{card.tag}</span>
                <span>{card.tools.length} Tools</span>
              </div>
              <h3 className="font-semibold text-base text-[#141210] font-sans">
                {card.category}
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {card.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#faf8f2] border border-[#141210]/5 text-[11px] font-mono text-[#3a332c]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
