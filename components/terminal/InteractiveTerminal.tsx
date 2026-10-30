"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Play, Trash2 } from "lucide-react";

interface LogEntry {
  type: "input" | "output" | "system" | "error";
  text: string | React.ReactNode;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "system",
      text: "AI & Distributed Backend Node Initialized [v2.4.0-release]",
    },
    {
      type: "system",
      text: "Type 'help' or click any quick command below to run real-time simulations.",
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: LogEntry[] = [...logs, { type: "input", text: rawCommand }];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1 text-neutral-300">
              <div className="text-white font-bold mb-1">AVAILABLE SIMULATION COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                <div>
                  <span className="text-white font-semibold">predict</span>
                  <span className="text-neutral-500"> — Run House Price AI inference</span>
                </div>
                <div>
                  <span className="text-white font-semibold">benchmark</span>
                  <span className="text-neutral-500"> — Run concurrency stress test</span>
                </div>
                <div>
                  <span className="text-white font-semibold">stack</span>
                  <span className="text-neutral-500"> — Query backend & AI stack</span>
                </div>
                <div>
                  <span className="text-white font-semibold">metrics</span>
                  <span className="text-neutral-500"> — Telemetry & node health</span>
                </div>
                <div>
                  <span className="text-white font-semibold">curl</span>
                  <span className="text-neutral-500"> — Output API contact endpoint</span>
                </div>
                <div>
                  <span className="text-white font-semibold">clear</span>
                  <span className="text-neutral-500"> — Clear console buffer</span>
                </div>
              </div>
            </div>
          ),
        });
        break;

      case "predict":
      case "predict --model=house-ai":
        newLogs.push({
          type: "output",
          text: (
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1 text-xs">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>INFERENCE SIMULATION: HousePriceAI (RandomForestRegressor v1.4)</span>
              </div>
              <div className="text-neutral-400">Payload: {"{ bedrooms: 4, sqft: 2850, zip: '94107', quality: 'high' }"}</div>
              <div className="text-neutral-400">Loading model weights into memory... [OK - 24ms]</div>
              <div className="text-neutral-400">Running vector embedding match & valuation pipeline... [OK - 11ms]</div>
              <div className="pt-1 text-white">
                Valuation Result: <span className="font-bold underline">$1,425,000 USD</span> (Confidence: 96.8%)
              </div>
              <div className="text-[10px] text-neutral-500">TTFT: 12ms | End-to-End Latency: 18ms | Status: 200 OK</div>
            </div>
          ),
        });
        break;

      case "benchmark":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1.5 text-xs">
              <div className="text-white font-bold">K6 / WRK STRESS BENCHMARK (10,000 Concurrent HTTP/2 Requests):</div>
              <div className="font-mono text-neutral-400 bg-neutral-900 p-2.5 rounded border border-neutral-800">
                <div>Running 10s test @ https://api.mohit.dev/v1/health</div>
                <div>20 threads and 1000 connections</div>
                <div className="text-white pt-1">
                  Requests/sec: <span className="font-bold">42,850.12</span>
                </div>
                <div>Transfer/sec: 14.8MB</div>
                <div className="pt-1 text-neutral-300">
                  Latency Distribution:
                  <br />
                  &nbsp;&nbsp;50%: 2.12ms | 90%: 7.84ms | 99%: 14.20ms | max: 28.4ms
                </div>
                <div className="text-emerald-400 pt-1 font-semibold">0 socket errors, 0 timeouts (100% success rate)</div>
              </div>
            </div>
          ),
        });
        break;

      case "stack":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-2 text-xs">
              <div className="text-white font-bold">CORE ARCHITECTURE & INFRASTRUCTURE:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                  <div className="text-white font-bold">AI & Inference</div>
                  <div className="text-neutral-400 text-[11px]">Python, PyTorch, vLLM, TensorRT, Scikit-Learn, ONNX</div>
                </div>
                <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                  <div className="text-white font-bold">Backend & APIs</div>
                  <div className="text-neutral-400 text-[11px]">FastAPI, Node.js, Go, Express, gRPC, RESTful APIs</div>
                </div>
                <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                  <div className="text-white font-bold">Data & Ops</div>
                  <div className="text-neutral-400 text-[11px]">PostgreSQL, pgvector, Redis, Docker, Kafka, AWS</div>
                </div>
              </div>
            </div>
          ),
        });
        break;

      case "metrics":
        newLogs.push({
          type: "output",
          text: (
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-xs space-y-1">
              <div className="text-white font-bold">LIVE TELEMETRY SNAPSHOT:</div>
              <div>Node Cluster: us-east-1a (Active)</div>
              <div>CPU Load: 14.2% across 16 vCPUs</div>
              <div>Memory: 8.4GB / 32GB utilized</div>
              <div>Active gRPC Connections: 3,420</div>
              <div>Cache Hit Ratio: 98.6% (Redis Cluster)</div>
            </div>
          ),
        });
        break;

      case "curl":
      case "curl contact":
        newLogs.push({
          type: "output",
          text: (
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded text-xs space-y-1">
              <div className="text-neutral-400">HTTP/2 200 OK</div>
              <div className="text-neutral-500">content-type: application/json</div>
              <pre className="text-white text-[11px] overflow-x-auto pt-1 font-mono">
{JSON.stringify(
  {
    status: "available_for_hire",
    engineer: "Mohit",
    email: "mohit.dev.contact@gmail.com",
    roles: ["AI Systems Engineer", "Senior Backend Architect", "Full-Stack Lead"],
    location: "Global Remote / On-Site",
    open_to: ["Contract Architecture", "Senior Full-Time", "Consulting"]
  },
  null,
  2
)}
              </pre>
            </div>
          ),
        });
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        newLogs.push({
          type: "error",
          text: `Command not recognized: '${cmd}'. Type 'help' for command manual.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest mb-1">
            <TerminalIcon className="w-3.5 h-3.5 text-white" />
            <span>Interactive Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            RUN REAL-TIME BACKEND SIMULATIONS
          </h2>
        </div>
        <p className="text-xs text-neutral-400 max-w-md">
          Execute mock endpoints, simulate machine learning inference workloads, and inspect system telemetry directly in the browser.
        </p>
      </div>

      {/* Quick Command Action Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] text-neutral-500 mr-1 uppercase">Quick Launch:</span>
        {["help", "predict", "benchmark", "stack", "metrics", "curl"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-all active:scale-95"
          >
            <Play className="w-2.5 h-2.5 text-neutral-500" />
            <span>{cmd}</span>
          </button>
        ))}
        <button
          onClick={() => setLogs([])}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 border border-neutral-800 text-xs transition-all ml-auto"
          title="Clear console"
        >
          <Trash2 className="w-3 h-3" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Terminal Window Box */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-full bg-black border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden cursor-text"
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            </div>
            <span className="text-neutral-400 text-[11px] ml-2">bash — mohit@ai-backend-core:~</span>
          </div>
          <div className="text-[11px] text-neutral-500">TTY-01 • UTF-8</div>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 sm:p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-3 text-xs sm:text-sm">
          {logs.map((log, index) => (
            <div key={index}>
              {log.type === "input" && (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-neutral-500">mohit@ai-core:~$</span>
                  <span className="font-bold">{log.text}</span>
                </div>
              )}
              {log.type === "system" && (
                <div className="text-neutral-500 text-xs">{log.text}</div>
              )}
              {log.type === "output" && (
                <div className="pl-4 border-l border-neutral-800 my-1">{log.text}</div>
              )}
              {log.type === "error" && (
                <div className="text-red-400 pl-4 border-l border-red-900/50">{log.text}</div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Prompt Form */}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-neutral-950 border-t border-neutral-800 text-xs sm:text-sm"
        >
          <span className="text-neutral-500 select-none">mohit@ai-core:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'predict', 'benchmark', 'stack'..."
            className="w-full bg-transparent text-white font-mono placeholder-neutral-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1 rounded text-neutral-500 hover:text-white transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
