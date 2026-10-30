"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Keyboard } from "lucide-react";

export function ControlsHint() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-xl overflow-hidden transition-all max-w-[240px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white"
      >
        <span className="flex items-center gap-1.5 font-mono text-cyan-400">
          <Keyboard className="w-3.5 h-3.5" />
          FLIGHT CONTROLS
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="px-3 pb-3 pt-1 text-[11px] space-y-1.5 text-slate-300 border-t border-slate-800/80">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Steer & Glide</span>
            <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-white border border-slate-700">
              W A S D
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Thruster Boost</span>
            <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-white border border-slate-700">
              Space
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Inspect Station</span>
            <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-800/60">
              [E]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
