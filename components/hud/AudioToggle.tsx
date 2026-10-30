"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-2xl border backdrop-blur-md shadow-xl transition-all active:scale-95 text-xs font-medium ${
        isMuted
          ? "bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800"
          : "bg-cyan-950/80 border-cyan-500/80 text-cyan-300 shadow-cyan-500/20"
      }`}
      title={isMuted ? "Unmute ambient music & sound FX" : "Mute audio"}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Audio Off</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Synth Audio</span>
        </>
      )}
    </button>
  );
}
