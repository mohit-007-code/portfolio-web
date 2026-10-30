"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArchipelagoEngine } from "./ArchipelagoEngine";
import { KioskItem } from "./KioskManager";
import { SkillCrystal } from "./SkillCrystals";
import { MiniMap } from "@/components/hud/MiniMap";
import { FastTravel } from "@/components/hud/FastTravel";
import { AudioToggle } from "@/components/hud/AudioToggle";
import { ControlsHint } from "@/components/hud/ControlsHint";
import { TouchJoystick } from "@/components/hud/TouchJoystick";
import { ProjectModal } from "@/components/hud/ProjectModal";
import { ContactBeaconModal } from "@/components/hud/ContactBeaconModal";
import { soundEngine } from "@/lib/audio";
import { Project } from "@/data/projects";

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ArchipelagoEngine | null>(null);

  const [activeKiosk, setActiveKiosk] = useState<KioskItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNearBeacon, setIsNearBeacon] = useState<boolean>(false);
  const [isBeaconModalOpen, setIsBeaconModalOpen] = useState<boolean>(false);

  const [dronePos, setDronePos] = useState({ x: 0, y: 4.5, z: 0, heading: 0 });
  const [collectedSkills, setCollectedSkills] = useState<{ current: number; max: number }>({
    current: 0,
    max: 18,
  });
  const [lastDiscoveredSkill, setLastDiscoveredSkill] = useState<string | null>(null);

  // Initialize Archipelago Engine
  useEffect(() => {
    if (!mountRef.current) return;

    const engine = new ArchipelagoEngine(mountRef.current, {
      onNearKioskChange: (kiosk) => {
        setActiveKiosk(kiosk);
      },
      onNearBeaconChange: (isNear) => {
        setIsNearBeacon(isNear);
      },
      onCollectSkill: (skill, count, maxCount) => {
        setCollectedSkills({ current: count, max: maxCount });
        setLastDiscoveredSkill(skill.name);
        setTimeout(() => setLastDiscoveredSkill(null), 3000);
      },
      onPositionUpdate: (pos) => {
        setDronePos(pos);
      },
    });

    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Keyboard shortcut to inspect near kiosk or beacon
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyE") {
        if (activeKiosk) {
          soundEngine.playKioskOpen();
          setSelectedProject(activeKiosk.project);
        } else if (isNearBeacon) {
          soundEngine.playKioskOpen();
          setIsBeaconModalOpen(true);
        }
      } else if (e.code === "Escape") {
        setSelectedProject(null);
        setIsBeaconModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeKiosk, isNearBeacon]);

  // Fast-travel jump handler
  const handleFastTravel = useCallback((islandId: string) => {
    engineRef.current?.fastTravelTo(islandId);
  }, []);

  // Virtual touch joystick update
  const handleJoystickMove = useCallback((forward: number, turn: number, boost: boolean) => {
    engineRef.current?.setVirtualInput(forward, turn, boost);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-sky-200">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/60 shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white">Mohit</h1>
            <p className="text-[11px] text-slate-400">Cyber Drone Active • 60 FPS</p>
          </div>
        </div>

        {/* Fast-Travel Island Selector */}
        <div className="pointer-events-auto">
          <FastTravel onTravel={handleFastTravel} />
        </div>

        {/* Audio Toggle & Skill Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/60 text-xs text-emerald-300 font-medium">
            <span>💎 Crystals:</span>
            <span className="font-bold text-white">
              {collectedSkills.current}/{collectedSkills.max}
            </span>
          </div>
          <AudioToggle />
        </div>
      </div>

      {/* Skill Discovery Toast */}
      {lastDiscoveredSkill && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
          <div className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-emerald-300/40 shadow-2xl flex items-center gap-2">
            <span>✨ Crystal Discovered:</span>
            <span className="text-emerald-100">{lastDiscoveredSkill}</span>
          </div>
        </div>
      )}

      {/* Interactive Kiosk Proximity Prompt */}
      {activeKiosk && !selectedProject && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-fade-in">
          <button
            onClick={() => {
              soundEngine.playKioskOpen();
              setSelectedProject(activeKiosk.project);
            }}
            className="flex items-center gap-3 bg-slate-950/90 hover:bg-slate-900 border border-cyan-400/80 text-cyan-300 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-200 transform hover:scale-105 active:scale-95 group"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Inspect {activeKiosk.project.title}
            </span>
            <kbd className="hidden sm:inline-block bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded border border-slate-600 font-mono">
              [E]
            </kbd>
          </button>
        </div>
      )}

      {/* Interactive Contact Beacon Proximity Prompt */}
      {isNearBeacon && !isBeaconModalOpen && !selectedProject && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-fade-in">
          <button
            onClick={() => {
              soundEngine.playKioskOpen();
              setIsBeaconModalOpen(true);
            }}
            className="flex items-center gap-3 bg-slate-950/90 hover:bg-slate-900 border border-amber-400/80 text-amber-300 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-200 transform hover:scale-105 active:scale-95 group"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Access Transmission Beacon
            </span>
            <kbd className="hidden sm:inline-block bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded border border-slate-600 font-mono">
              [E]
            </kbd>
          </button>
        </div>
      )}

      {/* Bottom Right Radar Mini-Map */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
        <MiniMap dronePos={dronePos} />
      </div>

      {/* Bottom Left Desktop Controls Hint */}
      <div className="hidden sm:block absolute bottom-4 left-4 z-20 pointer-events-auto">
        <ControlsHint />
      </div>

      {/* Mobile Virtual Joystick & Boost Button */}
      <div className="sm:hidden">
        <TouchJoystick
          onMove={handleJoystickMove}
          onInteract={() => {
            if (activeKiosk) {
              soundEngine.playKioskOpen();
              setSelectedProject(activeKiosk.project);
            } else if (isNearBeacon) {
              soundEngine.playKioskOpen();
              setIsBeaconModalOpen(true);
            }
          }}
          hasInteractTarget={Boolean(activeKiosk || isNearBeacon)}
        />
      </div>

      {/* Project Modal Dialog */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Contact Beacon Modal Dialog */}
      {isBeaconModalOpen && (
        <ContactBeaconModal onClose={() => setIsBeaconModalOpen(false)} />
      )}
    </div>
  );
}
