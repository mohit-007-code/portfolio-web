"use client";

import { useEffect, useRef } from "react";
import { ISLAND_STATIONS } from "@/components/world/IslandGenerator";

interface MiniMapProps {
  dronePos: { x: number; y: number; z: number; heading: number };
}

export function MiniMap({ dronePos }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    // World space is roughly -160 to +160, map scale maps world units to pixels
    const scale = size / 320;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // 1. Radar Circular Border & Background
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, center - 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.stroke();

    // Subtle radar sweep circle grid
    ctx.beginPath();
    ctx.arc(center, center, (center - 2) * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center, 4);
    ctx.lineTo(center, size - 4);
    ctx.moveTo(4, center);
    ctx.lineTo(size - 4, center);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
    ctx.stroke();

    // 2. Draw Islands
    ISLAND_STATIONS.forEach((island) => {
      const ix = center + island.position.x * scale;
      const iz = center + island.position.z * scale;

      ctx.beginPath();
      ctx.arc(ix, iz, 8, 0, Math.PI * 2);
      ctx.fillStyle = island.color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // Island initial label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 8px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(island.name.charAt(0), ix, iz);
    });

    // 3. Draw Player Drone Position & Heading
    const px = center + dronePos.x * scale;
    const pz = center + dronePos.z * scale;

    ctx.save();
    ctx.translate(px, pz);
    ctx.rotate(dronePos.heading);

    // Drone Triangle Icon
    ctx.beginPath();
    ctx.moveTo(0, 7); // forward
    ctx.lineTo(-4.5, -5);
    ctx.lineTo(0, -2);
    ctx.lineTo(4.5, -5);
    ctx.closePath();
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  }, [dronePos]);

  return (
    <div className="flex flex-col items-center bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700/60 shadow-xl">
      <div className="flex items-center justify-between w-full px-1 pb-1">
        <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">RADAR</span>
        <span className="text-[10px] font-mono text-slate-400">
          {Math.round(dronePos.x)}, {Math.round(dronePos.z)}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={110}
        height={110}
        className="rounded-full shadow-inner"
      />
    </div>
  );
}
