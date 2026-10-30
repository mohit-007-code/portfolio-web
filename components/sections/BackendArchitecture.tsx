"use client";

import { Cpu, Database, Server, Zap, CheckCircle2 } from "lucide-react";

export function BackendArchitecture() {
  const pillars = [
    {
      index: "01",
      category: "MODEL SERVING & INFERENCE",
      icon: Cpu,
      title: "Low-Latency ML & LLM Pipelines",
      description:
        "Engineered for sub-20ms inference and scalable throughput using asynchronous worker pools, dynamic batching, and model quantization.",
      stack: ["Python", "FastAPI", "PyTorch", "vLLM", "Scikit-Learn", "ONNX"],
      capabilities: [
        "Continuous token streaming with zero buffer lag",
        "Quantized INT8 / FP16 model weights optimization",
        "Asynchronous task queues with Celery & Redis",
      ],
    },
    {
      index: "02",
      category: "VECTOR SEARCH & RAG SYSTEMS",
      icon: Database,
      title: "Vector Embeddings & Semantic Search",
      description:
        "High-precision knowledge retrieval pipelines combining dense neural embeddings with inverted keyword search indexes.",
      stack: ["pgvector", "PostgreSQL", "Redis Vector", "Pinecone", "LangChain"],
      capabilities: [
        "Sub-10ms similarity search indexing over millions of vectors",
        "Hybrid search balancing semantic meaning and keyword precision",
        "Multi-tenant vector namespace isolation and access control",
      ],
    },
    {
      index: "03",
      category: "DISTRIBUTED BACKEND SYSTEMS",
      icon: Server,
      title: "High-Concurrency Cloud Microservices",
      description:
        "Resilient, horizontally-scalable services designed for 99.98% uptime, zero-downtime rolling deploys, and automated fault tolerance.",
      stack: ["Go (Golang)", "Node.js", "Docker", "PostgreSQL", "Redis", "Kafka"],
      capabilities: [
        "Distributed lock management and atomic transactions with Redis",
        "Connection pooling handling 40,000+ simultaneous sockets",
        "Automated CI/CD pipelines with GitHub Actions & Docker",
      ],
    },
    {
      index: "04",
      category: "FULL-STACK EDGE & REAL-TIME",
      icon: Zap,
      title: "Real-Time Telemetry & Modern Web UI",
      description:
        "Mission-critical user interfaces delivering sub-second updates, WebRTC video streaming, and optimistic client-side synchronization.",
      stack: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "WebRTC"],
      capabilities: [
        "Server-Driven rendering with zero client runtime overhead",
        "Real-time bidirectional event streaming via WebSockets",
        "Hardware-accelerated rendering and fluid responsive layouts",
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          <Server className="w-3.5 h-3.5 text-white" />
          <span>Core Competencies</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight mb-3">
          SYSTEM ARCHITECTURE & CAPABILITIES
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed">
          How I architect scalable systems from raw algorithmic inference and vector indexing to distributed backend clusters and edge web clients.
        </p>
      </div>

      {/* 4-Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.index}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-500 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Index + Category Tag */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-neutral-500 font-bold">{pillar.index} // ARCHITECTURE</span>
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
                  {pillar.category}
                </div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Capabilities Checklist */}
                <div className="space-y-2 mb-6">
                  {pillar.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Pills */}
              <div className="pt-4 border-t border-neutral-900 flex flex-wrap gap-1.5">
                {pillar.stack.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-300 border border-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
