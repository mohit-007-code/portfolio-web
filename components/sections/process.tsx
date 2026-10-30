"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process";
import { GitBranch } from "lucide-react";

export function ProcessSection() {
  return (
    <section id="process" className="relative isolate pt-8 md:pt-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[44px] bg-[#faf8f2] text-[#141210] ring-1 ring-black/5 px-6 md:px-12 lg:px-16 py-20 md:py-28 shadow-sm space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2eee3] border border-[#141210]/10 font-mono text-xs text-[#6b6259]">
            <GitBranch className="w-3.5 h-3.5 text-[#d97134]" />
            <span>(METHODOLOGY)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#141210] font-sans">
            A battle-tested delivery framework.
          </h2>
          <p className="text-[#3a332c] text-sm sm:text-base leading-relaxed">
            Refined across multiple client engagements to guarantee transparent communication, rapid iterations, and uncompromising build quality.
          </p>
        </div>

        {/* 4 Steps Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-[24px] bg-[#f2eee3] border border-[#141210]/10 space-y-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#6b6259] pb-3 border-b border-[#141210]/10">
                <span className="text-2xl font-bold font-mono text-[#141210]/30">
                  {step.step}
                </span>
                <span className="text-[#d97134] font-semibold tracking-wider uppercase">{step.title}</span>
              </div>

              <h3 className="text-xl font-semibold text-[#141210] tracking-tight">
                {step.headline}
              </h3>

              <p className="text-sm text-[#3a332c] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

