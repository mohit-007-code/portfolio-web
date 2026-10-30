"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, ArrowUpRight, Sparkles, Code2, Rocket, Globe } from "lucide-react";

export function AboutSection() {
  const stats = [
    { value: "2+", label: "Years of Experience", index: "/ 01" },
    { value: "15+", label: "Projects Completed", index: "/ 02" },
    { value: "99%", label: "Client Satisfaction", index: "/ 03" },
    { value: "200k+", label: "Users Reached in Production", index: "/ 04" },
  ];

  const infoGrid = [
    { label: "ROLE", value: "AI & Full-Stack Engineer" },
    { label: "LOCATION", value: "India · GMT+5:30 (Remote)" },
    { label: "EXPERTISE", value: "Python, Next.js, LLMs, Cloud" },
    { label: "STATUS", value: "Available for Q1/Q2" },
  ];

  return (
    <section id="about" className="relative isolate pt-8 md:pt-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[44px] bg-[#faf8f2] text-[#141210] ring-1 ring-black/5 px-6 md:px-12 lg:px-16 py-20 md:py-28 shadow-sm">
        
        {/* Subtle dot matrix grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(20,18,16,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,18,16,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Top Header: "(WHO AM I) ---- (+) ----" + Main statement */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 md:mb-28">
          <div className="lg:col-span-4 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#6b6259]">
              (WHO AM I)
            </span>
            <div className="relative flex flex-1 items-center">
              <span className="h-[1px] w-full bg-[#141210]/15" />
              <span className="absolute left-1/2 -translate-x-1/2 grid h-6 w-6 place-items-center rounded-full bg-[#141210] text-[#faf8f2]">
                <Plus size={12} />
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-[#141210] leading-[1.12] font-sans"
            >
              I build scalable backends, intelligent machine learning platforms, and high-conversion web applications that transform complex ideas into intuitive products.
            </motion.h2>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-full bg-[#141210] text-[#faf8f2] text-xs font-mono uppercase tracking-wider hover:bg-[#d97134] transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg active:scale-95"
              >
                <span>Explore Works</span>
                <ArrowUpRight size={14} />
              </button>
              
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-full border border-[#141210]/20 bg-transparent text-[#141210] text-xs font-mono uppercase tracking-wider hover:bg-[#141210]/5 transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards with Interactive Hover Elevation */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6, backgroundColor: "#ffffff", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)" }}
              className="p-6 sm:p-8 rounded-3xl bg-[#f4efe4] border border-[#141210]/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <span className="font-mono text-xs text-[#6b6259] mb-4">{stat.index}</span>
              <div>
                <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] font-sans mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#6b6259] font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metadata Details Strip */}
        <div className="relative z-10 pt-8 border-t border-[#141210]/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          {infoGrid.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b6259]">
                {item.label}
              </div>
              <div className="font-semibold text-[#141210]">{item.value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
