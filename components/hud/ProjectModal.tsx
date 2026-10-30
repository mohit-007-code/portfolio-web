"use client";

import { Project } from "@/data/projects";
import { ExternalLink, X, Tag, Calendar, Briefcase, Sparkles } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-xl max-h-[90vh] bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-white overflow-y-auto"
        style={{
          boxShadow: `0 0 50px -10px ${project.accent}33`,
        }}
      >
        {/* Accent Top Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: project.accent }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Screenshot Banner */}
        {project.image && (
          <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-slate-700/60 bg-slate-800/80 shadow-inner group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span
                className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md text-white backdrop-blur-md border"
                style={{
                  backgroundColor: `${project.accent}50`,
                  borderColor: project.accent,
                }}
              >
                KIOSK #{project.index}
              </span>
              <span className="text-xs text-slate-200 font-medium bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-md border border-slate-700">
                {project.industry}
              </span>
            </div>
          </div>
        )}

        {/* Header without screenshot fallback */}
        {!project.image && (
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg border text-white"
              style={{
                backgroundColor: `${project.accent}25`,
                borderColor: project.accent,
              }}
            >
              KIOSK #{project.index}
            </span>
            <span className="text-xs text-slate-400 font-medium">{project.industry}</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
          {project.title}
        </h2>
        <p className="text-sm font-medium text-slate-300 mb-5 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          {project.tagline}
        </p>

        {/* Details Pills */}
        <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Role</div>
              <div className="font-semibold">{project.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Timeline</div>
              <div className="font-semibold">{project.year}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="mb-6">
          <div className="text-[11px] font-mono text-slate-400 uppercase mb-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Core Architecture & Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all text-white shadow-lg active:scale-95"
              style={{
                backgroundColor: project.accent,
              }}
            >
              <span>Launch Live Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
          >
            Return to Flight
          </button>
        </div>
      </div>
    </div>
  );
}
