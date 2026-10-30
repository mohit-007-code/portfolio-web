"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";

// Mapping image paths from real project assets
const imageMap: Record<string, string | undefined> = {
  "house-prediction": "/projects/house-prediction.png",
  "groq-rag-reader": "/projects/groq-doc-ai.png",
  "student-score-ai": "/projects/student-score-ai.png",
  "hospital-management": undefined,
};




export function ProjectsSection() {
  return (
    <section id="projects" className="relative isolate pt-8 md:pt-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-clip rounded-[28px] md:rounded-[44px] bg-[#faf8f2] text-[#141210] ring-1 ring-black/5 px-6 md:px-12 lg:px-16 py-20 md:py-28 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col gap-8 md:flex-row-reverse md:items-end md:justify-between md:gap-12 mb-16 md:mb-24">
          <div className="text-left md:text-right">
            <h2 className="text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.05em] font-extrabold text-[#141210] font-sans">
              Selected
            </h2>
            <h2 className="text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.05em] font-serif italic font-normal text-[#d97134]">
              Works
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6 md:flex-1 md:max-w-[640px] md:pb-4">
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.28em] text-[#6b6259]">
              (Portfolio 2024–26)
            </span>
            <span className="hidden md:block h-px flex-1 bg-[#141210]/20" />
            <span className="hidden md:grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#141210] text-[#faf8f2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#faf8f2]" />
            </span>
            <span className="hidden md:block h-px flex-1 bg-[#141210]/20" />
          </div>
        </div>

        {/* Sticky Stacking Project Cards Container */}
        <div className="relative flex flex-col gap-6 md:gap-8 pb-12">
          {PROJECTS.map((project, index) => (
            <StickyProjectCard
              key={project.id}
              project={project}
              index={index}
              total={PROJECTS.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax shift for inner background image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Subtle card scale on scroll
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const isLast = index === total - 1;
  const projectImg = imageMap[project.id];

  return (
    <motion.article
      ref={cardRef}
      style={{
        scale: cardScale,
        top: `calc(70px + ${index * 22}px)`,
        zIndex: index + 1,
        marginBottom: isLast ? 0 : "2.5rem",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group sticky aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/10] w-full overflow-hidden rounded-[28px] md:rounded-[36px] border border-white/10 bg-[#141210] text-[#faf8f2] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] will-change-transform cursor-pointer transition-shadow duration-500 hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]"
      onClick={() => {
        if (project.href) window.open(project.href, "_blank");
      }}
    >
      {/* Blurred background image layer creating cinematic mood */}
      {projectImg ? (
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-[-12%] will-change-transform"
        >
          <Image
            src={projectImg}
            alt=""
            fill
            className="object-cover scale-110 filter blur-[38px] saturate-[1.2] opacity-70 group-hover:opacity-85 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-[#141210]/40" />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background: project.gradient || "radial-gradient(circle at 70% 50%, rgba(16,185,129,0.25), transparent 70%)",
          }}
        />
      )}

      {/* Sharp Project Screenshot Window floating in the center-right (if image exists) */}
      {projectImg && (
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-[48%] md:w-[44%] h-[68%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl hidden sm:block pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
          <Image
            src={projectImg}
            alt={project.title}
            fill
            className="object-cover object-top filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}


      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.18), transparent 65%)`,
        }}
      />

      {/* Dark Vignettes for typography protection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 via-black/15 to-transparent" />

      {/* Top Bar: "/01" & Tagline */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-6 p-6 sm:p-8 md:p-10 font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-[#faf8f2]/80">
        <span className="font-bold">/{project.index}</span>
        <span className="truncate text-[11px] sm:text-xs text-[#faf8f2]/60">{project.tagline}</span>
      </div>

      {/* Bottom Bar: Title, Description, Tech Stack & Launch Icon */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf8f2] font-sans group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#faf8f2]/75 line-clamp-2 leading-relaxed font-sans max-w-md">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[#faf8f2] border border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Launch Trigger Button (Bottom Right) */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 flex items-center gap-2">
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 45 : 0,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-[#faf8f2] text-[#141210] shadow-xl group-hover:bg-[#d97134] group-hover:text-white transition-colors duration-300"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
