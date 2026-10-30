"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#141210] text-[#faf8f2] flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      {/* Background ambient grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,248,242,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,248,242,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg w-full bg-[#1c1a17] border border-white/10 rounded-[32px] p-8 sm:p-12 text-center shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#d97134]/15 border border-[#d97134]/30 flex items-center justify-center mx-auto text-[#d97134]">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#faf8f2]/60 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-[#d97134]" />
            <span>404 // DEPLOYMENT_OFFLINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#faf8f2] font-sans">
            Site Not Available
          </h1>
          <p className="text-sm text-[#faf8f2]/70 leading-relaxed max-w-md mx-auto font-sans">
            This project is currently undergoing production migration or private sandbox testing. The live link will be accessible soon.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#faf8f2] text-[#141210] font-bold text-xs uppercase tracking-wider hover:bg-[#d97134] hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
