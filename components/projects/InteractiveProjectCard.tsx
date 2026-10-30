"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ExternalLink, Code2, Eye, Play, Sparkles, Check, ArrowRight } from "lucide-react";
import Image from "next/image";

interface InteractiveProjectCardProps {
  project: Project;
}

export function InteractiveProjectCard({ project }: InteractiveProjectCardProps) {
  const [viewMode, setViewMode] = useState<"showcase" | "api">("showcase");
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  // Define realistic mock API endpoints per project
  const getApiDetails = (id: string) => {
    switch (id) {
      case "house-prediction":
        return {
          method: "POST",
          endpoint: "/api/v1/valuation/predict",
          payload: {
            features: { sqft: 2850, bedrooms: 4, zip: "94107", quality_rating: 9 },
            model: "RandomForestRegressor_v1.4",
          },
          response: {
            status: "success",
            valuation_usd: 1425000,
            confidence_score: 0.968,
            p99_latency_ms: 16,
            features_analyzed: 14,
          },
        };
      case "truckmate":
        return {
          method: "POST",
          endpoint: "/api/v1/dispatch/quote",
          payload: {
            origin: "Sydney, NSW",
            destination: "Melbourne, VIC",
            weight_tons: 22.5,
            equipment: "B-Double",
          },
          response: {
            quote_aud: 3850.0,
            verified_carriers_nearby: 6,
            toll_optimization: "applied",
            instant_payout_eligible: true,
          },
        };
      case "classified":
        return {
          method: "GET",
          endpoint: "/api/v1/listings/search?q=transport&region=punjab",
          payload: null,
          response: {
            total_matches: 48,
            page: 1,
            cache_hit: true,
            redis_query_time_ms: 3.4,
            moderation_filter: "passed",
          },
        };
      case "kyntix":
        return {
          method: "POST",
          endpoint: "/api/v1/infra/cluster/health",
          payload: { cluster_id: "prod-cloud-us-east", checks: ["ingress", "pod_autoscaler"] },
          response: {
            cluster_status: "HEALTHY",
            pods_running: 24,
            cpu_utilization: "28.4%",
            network_latency_ms: 8.2,
          },
        };
      default:
        return {
          method: "POST",
          endpoint: "/api/v1/session/initialize",
          payload: { room_type: "webrtc_mesh", max_participants: 50 },
          response: {
            status: "ready",
            turn_server: "relay.global.edge",
            bitrate_cap_kbps: 4000,
            latency_ms: 12,
          },
        };
    }
  };

  const apiData = getApiDetails(project.id);

  const handleTestEndpoint = () => {
    setIsExecuting(true);
    setApiResponse(null);
    setLatency(null);

    const simulatedLatency = 12 + Math.floor(Math.random() * 8);

    setTimeout(() => {
      setIsExecuting(false);
      setLatency(simulatedLatency);
      setApiResponse(JSON.stringify(apiData.response, null, 2));
    }, 450);
  };

  return (
    <div
      id={`project-${project.id}`}
      className="group relative bg-neutral-950 border border-neutral-800 hover:border-neutral-500 rounded-2xl overflow-hidden transition-all duration-300 font-mono text-white flex flex-col justify-between"
    >
      {/* Top Bar: Index + View Mode Switcher */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-black/60">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-bold">DEPLOYMENT {project.index}</span>
          <span className="text-neutral-700">•</span>
          <span className="text-[11px] text-neutral-500">{project.industry}</span>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px]">
          <button
            onClick={() => setViewMode("showcase")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              viewMode === "showcase"
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Showcase</span>
          </button>
          <button
            onClick={() => setViewMode("api")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              viewMode === "api"
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Live API</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        {viewMode === "showcase" ? (
          <div>
            {/* Visual Screenshot Banner */}
            {project.image && (
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-5 border border-neutral-800 bg-neutral-900 shadow-inner group-hover:border-neutral-600 transition-colors">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-[11px] font-mono text-neutral-300 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-neutral-800">
                  {project.role} • {project.year}
                </div>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-1 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-400 mb-4 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
              {project.description}
            </p>
          </div>
        ) : (
          /* Live API Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                    apiData.method === "POST"
                      ? "bg-white text-black border-white"
                      : "bg-neutral-800 text-white border-neutral-700"
                  }`}
                >
                  {apiData.method}
                </span>
                <span className="font-mono text-neutral-300 text-xs truncate max-w-[240px]">
                  {apiData.endpoint}
                </span>
              </div>
              <button
                onClick={handleTestEndpoint}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isExecuting ? "Executing..." : "Test Endpoint"}</span>
              </button>
            </div>

            {/* Request Payload */}
            {apiData.payload && (
              <div>
                <div className="text-[10px] text-neutral-500 uppercase mb-1">Request Payload:</div>
                <pre className="p-3 rounded-lg bg-black border border-neutral-800 text-[11px] text-neutral-300 overflow-x-auto">
                  {JSON.stringify(apiData.payload, null, 2)}
                </pre>
              </div>
            )}

            {/* Simulated Response */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-500 uppercase mb-1">
                <span>Response Output:</span>
                {latency && <span className="text-white font-mono">Status: 200 OK ({latency}ms)</span>}
              </div>
              <pre className="p-3 rounded-lg bg-black border border-neutral-800 text-[11px] text-neutral-200 min-h-[100px] overflow-x-auto font-mono">
                {isExecuting ? (
                  <span className="text-neutral-500 animate-pulse">Running model inference & routing payload...</span>
                ) : apiResponse ? (
                  apiResponse
                ) : (
                  <span className="text-neutral-600">Click &apos;Test Endpoint&apos; to execute live simulation.</span>
                )}
              </pre>
            </div>
          </div>
        )}

        {/* Bottom Section: Tech Stack Pills & Launch Link */}
        <div className="pt-5 border-t border-neutral-900 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white hover:text-neutral-300 font-bold tracking-wide transition-colors"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
