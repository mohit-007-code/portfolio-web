"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { InteractiveProjectCard } from "@/components/projects/InteractiveProjectCard";
import { Layers } from "lucide-react";

export function ProjectsBento() {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const filterTags = ["ALL", "AI & ML", "LOGISTICS", "HIGH-CONCURRENCY", "CLOUD INFRA"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedTag === "ALL") return true;
    if (selectedTag === "AI & ML") return p.stack.includes("Python") || p.stack.includes("Scikit-Learn");
    if (selectedTag === "LOGISTICS") return p.industry.includes("Mobility") || p.industry.includes("Logistics");
    if (selectedTag === "HIGH-CONCURRENCY") return p.stack.includes("Redis") || p.stack.includes("WebRTC");
    if (selectedTag === "CLOUD INFRA") return p.industry.includes("IT") || p.stack.includes("Vercel");
    return true;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto font-mono">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-900">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>Featured Deployments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            PRODUCTION ARCHITECTURES & SYSTEMS
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg border transition-all active:scale-95 text-[11px] font-semibold ${
                selectedTag === tag
                  ? "bg-white text-black border-white shadow-sm"
                  : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <InteractiveProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
