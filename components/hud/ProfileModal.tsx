"use client";

import { X, Sparkles, Code2, Cpu, Rocket } from "lucide-react";
import Image from "next/image";

interface ProfileModalProps {
  onClose: () => void;
  onJumpToContact: () => void;
}

export function ProfileModal({ onClose, onJumpToContact }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden shadow-cyan-500/10">
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20 bg-slate-800">
            <Image
              src="/me2.png"
              alt="Mohit"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">Mohit</h2>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-cyan-300">
              AI & Full-Stack Systems Engineer
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Piloting Interactive WebGL & Real-World Cloud Apps
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          I build high-impact digital experiences that bridge interactive 3D web engineering, high-throughput machine learning models, and mission-critical cloud backends. From high-precision property valuation AI to distributed logistics dispatch platforms, I engineer software that performs under pressure.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <Rocket className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">5+</div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Live Systems</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">18+</div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Tech Stack</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <Code2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">60 FPS</div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">3D WebGL</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onJumpToContact();
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fly to Contact Beacon</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
