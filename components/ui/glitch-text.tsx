"use client";

import React, { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________01";

  const triggerGlitch = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    triggerGlitch();
    const cycle = setInterval(() => {
      triggerGlitch();
    }, 7000);
    return () => clearInterval(cycle);
  }, [text]);

  return (
    <span
      onMouseEnter={triggerGlitch}
      className={`inline-block font-mono cursor-pointer transition-all duration-200 select-none ${className}`}
      title="Hover for cyber-matrix glitch"
    >
      {displayText}
    </span>
  );
}
