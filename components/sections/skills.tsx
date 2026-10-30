"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Terminal, Zap, ShieldCheck } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/skills";

export function SkillsSection() {
  const colorMap: Record<string, { badge: string; text: string; glow: string }> = {
    cyan: {
      badge: "border-cyan-500/30 bg-cyan-950/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]",
      text: "text-cyan-300",
      glow: "text-cyan-400",
    },
    purple: {
      badge: "border-purple-500/30 bg-purple-950/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(176,38,255,0.4)]",
      text: "text-purple-300",
      glow: "text-purple-400",
    },
    pink: {
      badge: "border-pink-500/30 bg-pink-950/30 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,127,0.4)]",
      text: "text-pink-300",
      glow: "text-pink-400",
    },
  };

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Arsenal & Protocols</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
          TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MATRIX</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl">
          Core toolchains, frameworks, and architecture patterns mastered to execute scalable digital systems.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {SKILL_CATEGORIES.map((category, catIndex) => {
          const styling = colorMap[category.color] || colorMap.cyan;

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              className="rounded-2xl p-6 sm:p-7 bg-gray-950/60 border border-white/10 backdrop-blur-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-mono font-bold text-lg text-white flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${styling.glow}`} />
                    {category.category}
                  </h3>
                  <span className="text-[11px] font-mono text-gray-500">
                    // 0{catIndex + 1}
                  </span>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-300 cursor-default ${styling.badge}`}
                    >
                      <span className="text-[10px] text-gray-400 group-hover:text-white font-bold transition-colors">
                        [{skill.iconTag}]
                      </span>
                      <span className={`${styling.text} font-medium`}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer bar */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1.5 text-teal-400/90">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Production-Grade
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
