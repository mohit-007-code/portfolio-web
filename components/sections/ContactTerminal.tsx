"use client";

import { useState } from "react";
import { Mail, Copy, Check, Send, Terminal, Radio } from "lucide-react";
import confetti from "canvas-confetti";

export function ContactTerminal() {
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const emailAddress = "mohit.dev.contact@gmail.com";
  const curlExample = `curl -X POST https://mohit.dev/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Your Name","email":"you@domain.com","query":"AI Backend Project"}'`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlExample);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto font-mono text-white">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>Direct Channel</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight mb-3">
          INITIALIZE CONTACT PROTOCOL
        </h2>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>CURRENT STATUS: AVAILABLE FOR SENIOR AI/BACKEND ROLES & HIGH-IMPACT CONTRACTS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Quick Copy & cURL API Spec */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Direct Transmission Endpoints
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
              Whether you are scaling distributed cloud infrastructure, training and serving specialized LLM pipelines, or building a high-concurrency SaaS product, let&apos;s build together.
            </p>

            {/* Direct Copy Email Card */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">Verified Email</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{emailAddress}</div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* cURL Request Snippet Card */}
            <div className="p-4 rounded-xl bg-black border border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-500 uppercase text-[10px]">Developer cURL Command</span>
                <button
                  onClick={handleCopyCurl}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedCurl ? (
                    <span className="flex items-center gap-1 text-white">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy Snippet
                    </span>
                  )}
                </button>
              </div>
              <pre className="text-[11px] text-neutral-300 font-mono overflow-x-auto p-2 bg-neutral-950 rounded border border-neutral-900">
                {curlExample}
              </pre>
            </div>
          </div>

          {/* Socials & Profiles */}
          <div className="pt-4 border-t border-neutral-900 flex items-center gap-6 text-xs text-neutral-400">
            <span className="text-neutral-600 uppercase text-[10px]">Verified Nodes:</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X/Twitter ↗
            </a>
          </div>
        </div>

        {/* Right: Interactive Message Transmission Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 pb-3 border-b border-neutral-900">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span className="uppercase text-[11px] font-bold">SEND MESSAGE PAYLOAD</span>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h4 className="text-base font-bold text-white">Payload Received</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Your message packet has been logged. I will inspect the payload and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1.5">
                  Sender Identity / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance, Horizon AI"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1.5">
                  Sender Return Address (Email)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@horizon.ai"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1.5">
                  Message / Architecture Scope
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your backend needs, model inference requirements, or timeline..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
