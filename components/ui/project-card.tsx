"use client";

import React, { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="editorial-card rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
    >
      {/* Dynamic Background Ambient Gradient */}
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.gradient }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top meta strip */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">// {project.index}</span>
            <span className="text-gray-500">·</span>
            <span>{project.industry}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
            {project.year}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <div className="text-sm font-medium text-gray-400 font-mono">
            {project.tagline}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Role & Stack */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono text-gray-400">
            <span className="text-gray-500">Role:</span> {project.role}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300 group-hover:border-purple-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="relative z-10 flex items-center justify-between pt-8 mt-6 border-t border-white/10">
        <span className="text-xs font-mono text-gray-500">
          PRODUCTION VERIFIED
        </span>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-purple-300 transition-colors group/link"
        >
          <span>Visit Production Deployment</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
