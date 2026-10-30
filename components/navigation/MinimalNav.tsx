"use client";

import { useState, useEffect } from "react";
import { Terminal, Search, Command } from "lucide-react";

interface MinimalNavProps {
  onOpenCommandPalette: () => void;
}

export function MinimalNav({ onOpenCommandPalette }: MinimalNavProps) {
  const [latency, setLatency] = useState(14);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Subtle latency jitter to feel like a live backend telemetry ping
    const interval = setInterval(() => {
      setLatency(12 + Math.floor(Math.random() * 6));
    }, 3500);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-neutral-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Node Status */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="font-mono text-sm font-bold tracking-widest text-white hover:text-neutral-300 transition-colors flex items-center gap-2"
          >
            <span className="text-white">MOHIT</span>
            <span className="text-neutral-500 text-xs font-normal">/ AI_BACKEND</span>
          </a>

          {/* Live Node Heartbeat Ticker */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-neutral-400">NODE:</span>
            <span className="text-white font-semibold">ACTIVE</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">{latency}ms</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <a href="#projects" className="hover:text-white transition-colors">
            Deployments
          </a>
          <a href="#terminal" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            Terminal
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Command Palette Trigger & Terminal Link */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700 text-xs font-mono transition-all active:scale-95"
            title="Open Command Launcher"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-neutral-950 text-neutral-400 rounded border border-neutral-800">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-mono font-bold tracking-wide hover:bg-neutral-200 transition-all active:scale-95"
          >
            Connect
          </a>
        </div>
      </div>
    </header>
  );
}
