"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Zap, Eye } from "lucide-react";

interface TouchJoystickProps {
  onMove: (forward: number, turn: number, boost: boolean) => void;
  onInteract?: () => void;
  hasInteractTarget?: boolean;
}

export function TouchJoystick({ onMove, onInteract, hasInteractTarget }: TouchJoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isBoosting, setIsBoosting] = useState(false);
  const activeTouchId = useRef<number | null>(null);

  const maxRadius = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTouchId.current !== null) return;
    const touch = e.changedTouches[0];
    activeTouchId.current = touch.identifier;
    updateKnob(touch.clientX, touch.clientY);
  };

  const updateKnob = useCallback((clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxRadius);

    const nx = Math.cos(angle) * clampedDist;
    const ny = Math.sin(angle) * clampedDist;

    setKnobPos({ x: nx, y: ny });

    // Invert Y so up is forward, X is turn
    const forward = -ny / maxRadius;
    const turn = nx / maxRadius;

    onMove(forward, turn, isBoosting);
  }, [isBoosting, onMove]);

  const handleTouchMove = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === activeTouchId.current) {
        updateKnob(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchId.current) {
        activeTouchId.current = null;
        setKnobPos({ x: 0, y: 0 });
        onMove(0, 0, isBoosting);
        break;
      }
    }
  };

  useEffect(() => {
    onMove(0, 0, isBoosting);
  }, [isBoosting, onMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none">
      {/* Virtual Analog Joystick (Bottom Left) */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <div
          ref={baseRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="relative w-28 h-28 rounded-full bg-slate-900/60 backdrop-blur-md border border-cyan-500/40 shadow-2xl flex items-center justify-center touch-none"
        >
          {/* Inner Joystick Knob */}
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-sky-400 border border-white/80 shadow-lg pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate3d(${knobPos.x}px, ${knobPos.y}px, 0)`,
            }}
          />
        </div>
      </div>

      {/* Action Buttons (Bottom Right) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 pointer-events-auto">
        {/* Interact button when near kiosk or beacon */}
        {hasInteractTarget && (
          <button
            onClick={onInteract}
            className="w-16 h-16 rounded-full bg-cyan-500/90 text-white flex flex-col items-center justify-center border-2 border-white/80 shadow-2xl active:scale-90 transition-transform animate-bounce"
          >
            <Eye className="w-6 h-6" />
            <span className="text-[10px] font-bold">VIEW</span>
          </button>
        )}

        {/* Boost Button */}
        <button
          onTouchStart={() => setIsBoosting(true)}
          onTouchEnd={() => setIsBoosting(false)}
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border transition-all active:scale-90 ${
            isBoosting
              ? "bg-amber-500 border-white text-white shadow-amber-500/50 shadow-lg"
              : "bg-slate-900/70 border-slate-700 text-amber-400 backdrop-blur-md"
          }`}
        >
          <Zap className="w-5 h-5 fill-current" />
          <span className="text-[9px] font-bold">BOOST</span>
        </button>
      </div>
    </div>
  );
}
