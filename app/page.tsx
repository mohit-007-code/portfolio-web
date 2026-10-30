"use client";

import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsSection } from "@/components/sections/projects";
import { ProcessSection } from "@/components/sections/process";
import { StackMarqueeSection } from "@/components/sections/stack-marquee";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#faf8f2] text-[#141210] selection:bg-[#141210] selection:text-[#faf8f2] antialiased overflow-x-hidden">
      {/* 1. Hero with Scroll-Driven Image Minimization & Parallax Drift */}
      <Hero />

      {/* 2. About & Metrics Strip with Interactive Hover Cards */}
      <AboutSection />

      {/* 3. Services with Tabbed Showcase & Live Preview */}
      <ServicesSection />

      {/* 4. Selected Works with Sticky Parallax Stacking Cards & Hover Glow */}
      <ProjectsSection />

      {/* 5. Battle-Tested Delivery Methodology */}
      <ProcessSection />

      {/* 6. Kinetic Marquee Infinite Tech Stack */}
      <StackMarqueeSection />

      {/* 7. Transmission / Contact Section with One-Click Copy & Confetti */}
      <ContactSection />

      {/* High-Impact Editorial Footer matching custom aesthetic */}
      <footer className="relative bg-[#141210] text-[#faf8f2] pt-16 pb-12 px-6 sm:px-10 md:px-14 overflow-hidden border-t border-white/10 select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Top Row: Brand & Links */}
          <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
            
            {/* Left: Brand Badge & Description */}
            <div className="space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 border border-white/15 text-xs font-mono font-bold text-[#faf8f2]">
                  M
                </span>
                <span className="font-mono text-sm tracking-tight font-medium text-[#faf8f2]">
                  Mohit<span className="text-[#faf8f2]/50">.dev</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#faf8f2]/60 leading-relaxed font-sans">
                An independent engineering practice building cinematic digital experiences, scalable AI backends &amp; high-performance web products.
              </p>
            </div>

            {/* Right: Sitemap & Elsewhere Links */}
            <div className="flex gap-16 sm:gap-24 text-xs font-sans">
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#faf8f2]/40 uppercase block">
                  SITEMAP
                </span>
                <ul className="space-y-2 text-[#faf8f2]/80 font-medium">
                  <li>
                    <a href="#home" className="hover:text-[#d97134] transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="hover:text-[#d97134] transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-[#d97134] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-[#d97134] transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#faf8f2]/40 uppercase block">
                  ELSEWHERE
                </span>
                <ul className="space-y-2 text-[#faf8f2]/80 font-medium">
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#d97134] transition-colors"
                    >
                      Twitter / X
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/mohitsharma-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#d97134] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/mohit-kumar-877713289"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#d97134] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:mohitinbox07@gmail.com"
                      className="hover:text-[#d97134] transition-colors"
                    >
                      Direct Mail
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Center Giant Display Typography: "mohit." */}
          <div className="pt-4 overflow-hidden">
            <h2 className="text-[clamp(4.5rem,19vw,16.5rem)] font-extrabold tracking-[-0.05em] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-[#faf8f2] via-[#faf8f2]/90 to-[#faf8f2]/10 select-none">
              mohit<span className="text-[#d97134]">.</span>
            </h2>
          </div>

          {/* Bottom Row: Metadata & Credits */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-[#faf8f2]/45 tracking-wider uppercase">
            <div>
              © 2026 MOHIT · ALL RIGHTS RESERVED
            </div>
            <div>
              BUILT WITH NEXT.JS 16 · REACT 19 · FRAMER MOTION · LENIS
            </div>
            <div>
              V.2026.02
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}


