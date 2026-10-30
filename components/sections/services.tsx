"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Sparkles, Database, Server, Smartphone } from "lucide-react";

interface ServiceItem {
  index: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tools: { name: string; num: string }[];
}

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      index: "/ 01",
      title: "AI & Machine Learning Systems",
      tagline: "LLM Orchestration, Model Quantization & Neural Serving",
      description:
        "Building production-ready AI services with sub-second response times. From fine-tuned LLM agents to automated computer vision and valuation inference pipelines.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      tools: [
        { name: "Python", num: "01" },
        { name: "FastAPI", num: "02" },
        { name: "PyTorch / ONNX", num: "03" },
        { name: "LangChain / vLLM", num: "04" },
      ],
    },
    {
      index: "/ 02",
      title: "Distributed Backend Architecture",
      tagline: "High-Concurrency Microservices & Cloud Infrastructure",
      description:
        "Architecting resilient event-driven systems and high-throughput APIs. Engineered for zero downtime, strict data consistency, and high traffic volume.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      tools: [
        { name: "Go / Node.js", num: "01" },
        { name: "PostgreSQL & pgvector", num: "02" },
        { name: "Redis Cluster", num: "03" },
        { name: "Docker & AWS", num: "04" },
      ],
    },
    {
      index: "/ 03",
      title: "Cinematic Modern Web Interfaces",
      tagline: "Interactive 3D, Inertial Motion & Fluid Responsive Design",
      description:
        "Creating unforgettable digital experiences that balance bold aesthetics with technical rigor. Blazing-fast Next.js applications with buttery smooth transitions.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      tools: [
        { name: "Next.js 16", num: "01" },
        { name: "React 19", num: "02" },
        { name: "Tailwind CSS", num: "03" },
        { name: "Framer Motion & Lenis", num: "04" },
      ],
    },
  ];

  return (
    <section id="services" className="relative isolate pt-8 md:pt-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[44px] bg-[#faf8f2] text-[#141210] ring-1 ring-black/5 px-6 md:px-12 lg:px-16 py-20 md:py-28 shadow-sm">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#141210]/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#6b6259] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d97134]" />
              <span>(SOLUTIONS)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-[#141210] font-sans">
              Services &amp; Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b6259] max-w-md font-sans">
            Specialized engineering capabilities delivering tangible business impact and fluid user experiences.
          </p>
        </div>

        {/* Interactive Services Accordion / Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Service Selectors */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((service, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#141210] text-[#faf8f2] border-transparent shadow-xl scale-[1.01]"
                      : "bg-[#f4efe4] text-[#141210] border-[#141210]/5 hover:bg-white hover:border-[#141210]/10"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className={isActive ? "text-[#d97134] font-bold" : "text-[#6b6259]"}>
                      {service.index}
                    </span>
                    <span className={`text-[11px] uppercase tracking-wider ${isActive ? "text-[#faf8f2]/60" : "text-[#6b6259]"}`}>
                      {service.tagline}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2 ${isActive ? "text-white" : "text-[#141210]"}`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isActive ? "text-[#faf8f2]/80" : "text-[#6b6259]"}`}>
                    {service.description}
                  </p>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-current/10">
                    {service.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono px-3 py-1 rounded-full border ${
                          isActive
                            ? "bg-white/10 text-[#faf8f2] border-white/15"
                            : "bg-[#141210]/5 text-[#141210] border-[#141210]/10"
                        }`}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Preview */}
          <div className="lg:col-span-5 hidden lg:block sticky top-28">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#141210]/10 bg-[#141210]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={services[activeTab].image}
                    alt={services[activeTab].title}
                    fill
                    className="object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141210]/70 backdrop-blur-md border border-white/10 text-white">
                    <div className="text-[10px] font-mono text-[#d97134] uppercase tracking-wider mb-0.5">
                      FEATURED DISCIPLINE
                    </div>
                    <div className="text-base font-bold font-sans">
                      {services[activeTab].title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
