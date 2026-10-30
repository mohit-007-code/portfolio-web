"use client";

import { ISLAND_STATIONS } from "@/components/world/IslandGenerator";

interface FastTravelProps {
  onTravel: (islandId: string) => void;
}

export function FastTravel({ onTravel }: FastTravelProps) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/60 shadow-xl">
      <span className="hidden md:inline-block text-[11px] font-mono text-slate-400 font-semibold px-2">
        TELEPORT:
      </span>
      {ISLAND_STATIONS.map((station) => (
        <button
          key={station.id}
          onClick={() => onTravel(station.id)}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-1.5 group"
          title={`Teleport to ${station.name}`}
        >
          <span
            className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
            style={{ backgroundColor: station.color }}
          />
          <span>{station.name.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  );
}
