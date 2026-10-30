"use client";

import { useEffect, useState } from "react";
import { Search, Terminal, Code2, Cpu, Mail, ExternalLink, X, Copy, Check } from "lucide-react";
import { PROJECTS } from "@/data/projects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(); // toggle
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mohit.dev.contact@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1500);
  };

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-white">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800 bg-black">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search deployments, stack..."
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs">
          {/* Quick Actions */}
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
            System Commands
          </div>

          <a
            href="#terminal"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>Launch Interactive Terminal Console</span>
            </div>
            <span className="text-[10px] text-neutral-500">#terminal</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Copy Contact Email (mohit.dev.contact@gmail.com)</span>
            </div>
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                <Check className="w-3 h-3" /> Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </button>

          <a
            href="#architecture"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span>View AI & Backend Architecture Matrix</span>
            </div>
            <span className="text-[10px] text-neutral-500">#architecture</span>
          </a>

          {/* Filtered Projects */}
          <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
            Deployments ({filteredProjects.length})
          </div>

          {filteredProjects.map((p) => (
            <a
              key={p.id}
              href={`#project-${p.id}`}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-neutral-400" />
                <span className="font-semibold">{p.title}</span>
                <span className="text-neutral-500 text-[11px] truncate max-w-[200px]">
                  — {p.tagline}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-neutral-900 bg-neutral-950 text-[11px] text-neutral-500 flex justify-between items-center">
          <span>Navigate with mouse or keyboard</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800 text-[10px]">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
}
