"use client";

import { Terminal, ArrowDownRight, Sparkles, Copy, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function HeroAI() {
  const [copied, setCopied] = useState(false);

  const curlCommand = `curl -X POST https://mohit.dev/api/contact -d '{"intent":"hire"}'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 max-w-6xl mx-auto font-mono">
      {/* Top Identity & Status Tag */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-700 bg-neutral-900 shadow-md">
          <Image
            src="/me2.png"
            alt="Mohit"
            fill
            className="object-cover grayscale contrast-125"
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-bold">Mohit</span>
            <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
              <ShieldCheck className="w-3 h-3 text-white" /> Verified AI Systems Engineer
            </span>
          </div>
          <p className="text-xs text-neutral-500">Distributed Backends • Machine Learning Pipelines • Cloud APIs</p>
        </div>
      </div>

      {/* Main Structural Headline */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          ENGINEERING INTELLIGENT SYSTEMS & <br />
          <span className="text-neutral-500">HIGH-CONCURRENCY BACKENDS.</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-2xl leading-relaxed">
          I design and scale mission-critical backend architectures, low-latency LLM serving pipelines, vector databases, and fault-tolerant microservices that power enterprise products.
        </p>
      </div>

      {/* Live Architectural Telemetry Bar */}
      <div className="mb-10 p-3 sm:p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-neutral-500 uppercase tracking-wider text-[11px]">System Telemetry:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div>
            <span className="text-neutral-500">INFERENCE:</span>{" "}
            <span className="text-white font-semibold">vLLM / ONNX</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div>
            <span className="text-neutral-500">VECTOR DB:</span>{" "}
            <span className="text-white font-semibold">pgvector / Redis</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div>
            <span className="text-neutral-500">AVG p95 LATENCY:</span>{" "}
            <span className="text-white font-semibold">14ms</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div>
            <span className="text-neutral-500">AVAILABILITY:</span>{" "}
            <span className="text-white font-semibold">99.98%</span>
          </div>
        </div>
      </div>

      {/* Interactive Action Triggers */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        <a
          href="#projects"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <span>Explore Deployments</span>
          <ArrowDownRight className="w-4 h-4" />
        </a>

        <a
          href="#terminal"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-850 transition-all active:scale-95"
        >
          <Terminal className="w-4 h-4 text-neutral-400" />
          <span>Interactive Terminal</span>
        </a>

        {/* cURL Snippet Copy */}
        <button
          onClick={handleCopyCurl}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-black border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white text-xs transition-all active:scale-95"
          title="Click to copy cURL command"
        >
          <span className="text-neutral-500">$</span>
          <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-xs">{curlCommand}</span>
          {copied ? (
            <span className="text-white flex items-center gap-1 text-[11px]">
              <Check className="w-3.5 h-3.5" /> Copied
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-500" />
          )}
        </button>
      </div>

      {/* Key Metric Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-900 text-neutral-400">
        <div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white mb-1">5+</div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Live Production Systems
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white mb-1">&lt;15ms</div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Sub-Second API Response
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white mb-1">100k+</div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Requests Served / Day
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white mb-1">99.9%</div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Production SLA Target
          </div>
        </div>
      </div>
    </section>
  );
}
